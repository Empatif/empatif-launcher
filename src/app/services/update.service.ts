import { inject, Injectable, isDevMode } from '@angular/core';
import { SwUpdate, VersionDetectedEvent } from '@angular/service-worker';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private readonly COUNTDOWN_SECONDS = 10;
  private countdown = this.COUNTDOWN_SECONDS;

  private toast?: HTMLIonToastElement;
  private intervalId?: any;

  private updateTriggered = false;
  private isUpdating = false;
  private versionReady = false;

  private swUpdate = inject(SwUpdate);
  private toastController = inject(ToastController);
  private translate = inject(TranslateService);

  private lastDetectedVersionId?: string;

  init(): void {
    if (!this.swUpdate.isEnabled) return;

    this.swUpdate.versionUpdates.subscribe((event) => {
      if (event.type === 'VERSION_DETECTED') {
        this.onVersionDetected(event);
      }

      if (event.type === 'VERSION_READY') {
        this.onVersionReady();
      }
    });

    this.swUpdate.checkForUpdate().catch(() => {});

    if (isDevMode()) {
      setInterval(() => this.swUpdate.checkForUpdate(), 10000);
    }
  }

  private onVersionDetected(event: VersionDetectedEvent): void {
    const versionId = event.version.hash;

    if (versionId && this.lastDetectedVersionId === versionId) return;

    this.lastDetectedVersionId = versionId;
    this.startUpdateFlow();
  }

  private onVersionReady(): void {
    this.versionReady = true;
    if (this.isUpdating) {
      this.activateAndReload();
    }
  }

  private async startUpdateFlow(): Promise<void> {
    if (this.updateTriggered) return;
    this.updateTriggered = true;

    await this.presentToast('detected');
    this.startCountdown();
  }

  private async presentToast(state: 'detected' | 'updating'): Promise<void> {
    const isUpdating = state === 'updating';

    this.toast = await this.toastController.create({
      message: this.getToastMessage(isUpdating),
      position: 'bottom',
      buttons: isUpdating
        ? [
            {
              side: 'end',
              icon: 'sync-outline',
            },
          ]
        : [
            {
              text: this.translate.instant('UPDATE.BUTTON'),
              handler: () => this.startUpdating(),
            },
          ],
      duration: 0,
      cssClass: isUpdating ? 'toast-updating' : '',
    });

    await this.toast.present();
  }

  private startCountdown(): void {
    this.intervalId = setInterval(() => {
      this.countdown = Math.max(0, this.countdown - 1);

      if (this.toast) {
        this.toast.message = this.getToastMessage(this.isUpdating);
      }

      if (this.countdown <= 0) {
        this.startUpdating();
      }
    }, 1000);
  }

  private async startUpdating(): Promise<void> {
    if (this.isUpdating) return;
    this.isUpdating = true;

    if (this.intervalId) clearInterval(this.intervalId);

    if (this.toast) {
      await this.toast.dismiss();
    }

    await this.presentToast('updating');

    // Si ya está ready, activamos directamente
    if (this.versionReady) {
      this.activateAndReload();
    }
    // Si no está ready, onVersionReady() lo activará
  }

  private async activateAndReload(): Promise<void> {
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.toast) await this.toast.dismiss();

    await this.swUpdate.activateUpdate();
    location.reload();
  }

  private getToastMessage(isUpdating: boolean): string {
    if (isUpdating) {
      return this.translate.instant('UPDATE.UPDATING_MESSAGE');
    }
    return this.translate.instant('UPDATE.MESSAGE', { seconds: this.countdown });
  }
}
