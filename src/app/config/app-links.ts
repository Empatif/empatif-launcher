import { HomeLink, RecursoInfo } from '../shared/models/types.model';

export const FEATURED_LINK: HomeLink = {
  id: 'registro-horario',
  titulo: 'Registro horario',
  descripcion: 'Registra tu jornada laboral fácilmente.',
  icono: 'time-outline',
  url: 'https://example.com'
};

export const HOME_LINKS: HomeLink[] = [
  {
    id: 'portal-trabajador',
    titulo: 'Portal Trabajador',
    descripcion: 'Accede al portal de empleados.',
    icono: 'person-outline',
    url: 'https://example.com'
  },
  {
    id: 'ofertas-empleo',
    titulo: 'Ofertas de Empleo',
    descripcion: 'Consulta las vacantes disponibles.',
    icono: 'briefcase-outline',
    url: 'https://example.com'
  },
  {
    id: 'formacion',
    titulo: 'Formación',
    descripcion: 'Plataforma de cursos y capacitaciones.',
    icono: 'school-outline',
    url: 'https://example.com'
  },
  {
    id: 'manual',
    titulo: 'Manual de Uso',
    descripcion: 'Guía rápida para empleados.',
    icono: 'help-circle-outline',
    url: 'https://example.com'
  }
];

export const INFO_RECURSOS: RecursoInfo[] = [
  {
    id: 'manual-usuario',
    titulo: 'Manual de usuario (PDF)',
    tipo: 'pdf',
    seccion: 'recursos',
    url: 'https://example.com/manual-usuario.pdf'
  },
  {
    id: 'portal-empleado',
    titulo: 'Portal del empleado',
    tipo: 'link',
    seccion: 'recursos',
    url: 'https://example.com/portal'
  },
  {
    id: 'faq',
    titulo: 'Preguntas frecuentes',
    tipo: 'text',
    seccion: 'guias',
    contenido: 'Consulta las dudas más habituales sobre procesos internos.'
  },
  {
    id: 'contacto-soporte',
    titulo: 'Soporte rápido',
    tipo: 'text',
    seccion: 'guias',
    contenido: 'Escríbenos a soporte@empatif.com para incidencias urgentes.'
  }
];
