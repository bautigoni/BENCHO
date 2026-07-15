import type { ImageMetadata } from 'astro';
import elCanton from '../assets/images/proyectos/el-canton.jpeg';
import elNautico from '../assets/images/proyectos/el-nautico.png';
import fincasDelLago1 from '../assets/images/proyectos/fincas-del-lago-1.jpeg';
import fincasDelLago2 from '../assets/images/proyectos/fincas-del-lago-2.png';
import garage2 from '../assets/images/proyectos/garage-2.jpeg';
import garage3 from '../assets/images/proyectos/garage-3.jpeg';
import garage4 from '../assets/images/proyectos/garage-4.jpeg';
import nordelta from '../assets/images/proyectos/nordelta.jpeg';
import antesDespues2 from '../assets/images/proyectos/antes-despues-2.jpeg';
import antesDespues3 from '../assets/images/proyectos/antes-despues-3.jpeg';
import impermeabilizaciones from '../assets/images/servicios/impermeabilizaciones.jpeg';

export interface GalleryImage {
  image: ImageMetadata;
  alt: string;
  project: string;
  category: string;
}

/** Easily replaceable — swap the imports above and the entries below with new project photos. */
export const GALLERY_IMAGES: GalleryImage[] = [
  {
    image: nordelta,
    alt: 'Fachada moderna en Nordelta con revestimiento en madera',
    project: 'Nordelta',
    category: 'Fachadas'
  },
  {
    image: elCanton,
    alt: 'Vivienda con pileta y terminación en estuco en El Cantón',
    project: 'El Cantón',
    category: 'Estuco'
  },
  {
    image: fincasDelLago1,
    alt: 'Vivienda de dos plantas en Fincas del Lago',
    project: 'Fincas del Lago',
    category: 'Fachadas'
  },
  {
    image: garage3,
    alt: 'Interior de garage remodelado con piso de microcemento',
    project: 'Remodelación de Garage',
    category: 'Remodelaciones'
  },
  {
    image: elNautico,
    alt: 'Fachada de ladrillo visto en el proyecto El Náutico',
    project: 'El Náutico',
    category: 'Fachadas'
  },
  {
    image: antesDespues2,
    alt: 'Renovación de fachada, comparación antes y después',
    project: 'Renovación Residencial',
    category: 'Renovaciones'
  },
  {
    image: fincasDelLago2,
    alt: 'Detalle de terminación exterior en Fincas del Lago',
    project: 'Fincas del Lago',
    category: 'Revestimientos'
  },
  {
    image: impermeabilizaciones,
    alt: 'Terraza impermeabilizada con vista al lago',
    project: 'Terraza Impermeabilizada',
    category: 'Renovaciones'
  },
  {
    image: garage4,
    alt: 'Detalle de garage remodelado con terminación de alta gama',
    project: 'Remodelación de Garage',
    category: 'Remodelaciones'
  },
  {
    image: antesDespues3,
    alt: 'Renovación completa de vivienda familiar',
    project: 'Renovación Residencial',
    category: 'Renovaciones'
  },
  {
    image: garage2,
    alt: 'Vista general de garage remodelado',
    project: 'Remodelación de Garage',
    category: 'Remodelaciones'
  }
];
