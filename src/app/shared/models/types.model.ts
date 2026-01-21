export interface HomeLink {
  id: string;
  tituloKey: string;
  descripcionKey?: string;
  icono: string;
  url: string;
}

export type RecursoTipo = 'pdf' | 'link' | 'text';

export interface RecursoInfo {
  id: string;
  tituloKey: string;
  tipo: RecursoTipo;
  seccion: 'recursos' | 'guias';
  url?: string;
  contenidoKey?: string;
}

export interface Delegacion {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  horario: string;
  imagenUrl: string;
  mapsUrl?: string;
  mapsPlaceId?: string;
  coordenadas: [number, number];
}
