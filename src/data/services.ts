import pinturaImg from '../assets/images/servicios/pintura.jpeg';
import revestimientoImg from '../assets/images/servicios/revestimiento.jpeg';
import estucoImg from '../assets/images/proyectos/el-canton.jpeg';
import microcementoImg from '../assets/images/servicios/microcemento.jpeg';
import renovacionesImg from '../assets/images/proyectos/antes-despues-1.jpeg';
import remodelacionesImg from '../assets/images/proyectos/garage-1.jpeg';
import type { ImageMetadata } from 'astro';

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  whatsappMessage: string;
  icon: 'paint-roller' | 'layers' | 'building-2' | 'square-stack' | 'refresh-ccw' | 'hammer';
  image: ImageMetadata;
  imageAlt: string;
  description: string[];
  benefits: string[];
  applications: string[];
}

export const SERVICES: Service[] = [
  {
    slug: 'pintura',
    title: 'Pintura',
    tagline: 'Color, protección y una terminación impecable en cada superficie.',
    whatsappMessage:
      'Hola Grupo CGR. Quisiera consultar el precio de un trabajo de pintura. ¿Qué información necesitan para preparar el presupuesto?',
    icon: 'paint-roller',
    image: pinturaImg,
    imageAlt: 'Fachadas de viviendas recién pintadas en un barrio residencial',
    description: [
      'La pintura es la primera impresión de cualquier propiedad, y en Grupo CGR la tratamos con esa exigencia. Trabajamos con marcas premium y sistemas de pintura pensados para el clima de Buenos Aires, logrando terminaciones parejas, duraderas y con un acabado que se nota a simple vista.',
      'Aplicamos protocolos de preparación de superficie —lijado, sellado de fisuras, imprimación— antes de cada mano de pintura, porque un buen resultado empieza mucho antes de abrir el primer tacho.'
    ],
    benefits: [
      'Terminación pareja y de alta cobertura, sin marcas de rodillo ni empalmes visibles',
      'Pinturas y esmaltes de calidad superior con mayor resistencia a la intemperie',
      'Preparación profesional de superficie: lijado, sellado y corrección de imperfecciones',
      'Aumenta el valor de reventa y la percepción de cuidado de la propiedad'
    ],
    applications: [
      'Fachadas exteriores e interiores de viviendas',
      'Oficinas y locales comerciales',
      'Countries, barrios cerrados y desarrollos inmobiliarios',
      'Obra nueva y repintado de propiedades existentes'
    ]
  },
  {
    slug: 'revestimientos-texturados',
    title: 'Revestimientos Texturados',
    tagline: 'Textura, carácter y una protección superior para tus fachadas.',
    whatsappMessage:
      'Hola Grupo CGR. Quisiera consultar el precio de un revestimiento texturado. ¿Qué información necesitan para preparar el presupuesto?',
    icon: 'layers',
    image: revestimientoImg,
    imageAlt: 'Fachada con revestimiento texturado gris en construcción frente al agua',
    description: [
      'Los revestimientos texturados combinan estética y resistencia: aportan profundidad visual a la fachada mientras protegen la construcción de la humedad, las fisuras y el desgaste propio de la intemperie.',
      'En Grupo CGR seleccionamos el tipo de textura, grano y color según el estilo arquitectónico del proyecto, trabajando codo a codo con arquitectos y desarrolladores para lograr el resultado que tienen en mente.'
    ],
    benefits: [
      'Mayor resistencia a fisuras, humedad y agentes climáticos',
      'Amplia variedad de texturas, granulometrías y colores',
      'Aporta identidad y valor arquitectónico a la fachada',
      'Terminación duradera que reduce el mantenimiento a largo plazo'
    ],
    applications: [
      'Fachadas de viviendas unifamiliares y dúplex',
      'Frentes de edificios y desarrollos residenciales',
      'Proyectos de arquitectos y estudios de diseño',
      'Espacios comerciales que buscan un frente distintivo'
    ]
  },
  {
    slug: 'estuco',
    title: 'Estuco',
    tagline: 'La elegancia serena de una superficie perfectamente lisa.',
    whatsappMessage:
      'Hola Grupo CGR. Quisiera consultar el precio de un trabajo de estuco. ¿Qué información necesitan para preparar el presupuesto?',
    icon: 'building-2',
    image: estucoImg,
    imageAlt: 'Vivienda de dos plantas con terminación en estuco blanco liso',
    description: [
      'El estuco es sinónimo de líneas limpias y una superficie continua sin imperfecciones. Es la terminación elegida por quienes buscan una estética minimalista y atemporal, muy en línea con la arquitectura contemporánea.',
      'Nuestro equipo domina la aplicación en múltiples capas y el pulido final que distingue a un estuco bien logrado de uno improvisado: sin ondulaciones, sin fisuras y con una uniformidad de color impecable.'
    ],
    benefits: [
      'Superficie lisa, continua y de estética minimalista',
      'Aplicación en capas con pulido profesional para un resultado uniforme',
      'Compatible con paletas de color contemporáneas y atemporales',
      'Excelente base para climas y estilos arquitectónicos modernos'
    ],
    applications: [
      'Viviendas de arquitectura moderna y minimalista',
      'Proyectos de arquitectos que buscan superficies continuas',
      'Interiores de alta gama: livings, recepciones y espacios de diseño',
      'Renovaciones que buscan modernizar una fachada existente'
    ]
  },
  {
    slug: 'microcemento',
    title: 'Microcemento',
    tagline: 'El acabado continuo y sofisticado que redefine cualquier espacio.',
    whatsappMessage:
      'Hola Grupo CGR. Quisiera consultar el precio de un trabajo de microcemento. ¿Qué información necesitan para preparar el presupuesto?',
    icon: 'square-stack',
    image: microcementoImg,
    imageAlt: 'Fachada moderna revestida en microcemento oscuro con grandes ventanales',
    description: [
      'El microcemento es hoy el revestimiento más elegido en la arquitectura de alta gama: continuo, sin juntas, y con un espesor mínimo que se adapta a pisos, paredes, baños y piletas sin perder altura ni generar escombros.',
      'Trabajamos con sistemas de microcemento certificados, aplicados en múltiples manos con sellado final, logrando una superficie resistente al agua, al tránsito y al paso del tiempo, con un resultado estético que no tiene comparación con los revestimientos tradicionales.'
    ],
    benefits: [
      'Superficie continua sin juntas, ideal para espacios de líneas limpias',
      'Espesor mínimo: se aplica sobre pisos y paredes existentes sin obra pesada',
      'Alta resistencia al agua, apto para baños, cocinas y piletas',
      'Amplia paleta de colores y terminaciones (mate, satinada o pulida)'
    ],
    applications: [
      'Pisos y paredes de viviendas de diseño contemporáneo',
      'Baños, cocinas y espacios húmedos',
      'Piletas, solariums y espacios exteriores',
      'Locales comerciales y oficinas que buscan una imagen premium'
    ]
  },
  {
    slug: 'renovaciones',
    title: 'Renovaciones',
    tagline: 'Le devolvemos a tu propiedad la vida que se merece.',
    whatsappMessage:
      'Hola Grupo CGR. Quisiera consultar el precio de una renovación. ¿Qué información necesitan para preparar el presupuesto?',
    icon: 'refresh-ccw',
    image: renovacionesImg,
    imageAlt: 'Comparación antes y después de la renovación de fachada de una vivienda',
    description: [
      'Toda propiedad, por más cuidada que esté, necesita en algún momento una puesta a punto. Nuestro servicio de renovaciones está pensado para recuperar y actualizar espacios existentes: fachadas desgastadas, revestimientos deteriorados o terminaciones que quedaron en el tiempo.',
      'Evaluamos el estado real de la construcción, priorizamos las intervenciones que más impacto generan y ejecutamos con el mismo estándar de calidad que aplicamos en una obra nueva, cuidando siempre el presupuesto y los tiempos del cliente.'
    ],
    benefits: [
      'Diagnóstico previo del estado de la construcción antes de cotizar',
      'Recupera el valor y la estética de propiedades con años de uso',
      'Optimización de recursos: intervenimos donde realmente se necesita',
      'Resultados que se ven reflejados en fotos de "antes y después"'
    ],
    applications: [
      'Viviendas familiares con fachadas o revestimientos deteriorados',
      'Propiedades en preparación para la venta o alquiler',
      'Espacios comerciales que necesitan renovar su imagen',
      'Countries y barrios que exigen mantenimiento periódico de fachadas'
    ]
  },
  {
    slug: 'remodelaciones',
    title: 'Remodelaciones',
    tagline: 'Transformamos espacios completos, de punta a punta.',
    whatsappMessage:
      'Hola Grupo CGR. Quisiera consultar el precio de una remodelación. ¿Qué información necesitan para preparar el presupuesto?',
    icon: 'hammer',
    image: remodelacionesImg,
    imageAlt: 'Garage remodelado con piso de microcemento pulido',
    description: [
      'Cuando el proyecto va más allá de una terminación puntual, nuestro equipo de remodelaciones toma el espacio completo: demolición selectiva, nueva distribución, instalaciones y terminaciones finales, coordinando cada gremio bajo una sola dirección de obra.',
      'Ya sea un garage, una cocina, un baño o una ampliación completa, gestionamos el proyecto de principio a fin para que el cliente tenga un solo interlocutor responsable de todo el proceso.'
    ],
    benefits: [
      'Un solo responsable de obra para todos los gremios involucrados',
      'Planificación de tiempos y presupuesto antes de iniciar los trabajos',
      'Transformación integral del espacio: no solo terminaciones superficiales',
      'Seguimiento fotográfico y comunicación constante durante la obra'
    ],
    applications: [
      'Remodelación integral de cocinas y baños',
      'Ampliaciones y refuncionalización de espacios existentes',
      'Garages, quinchos y espacios de uso especial',
      'Oficinas y locales comerciales que necesitan un rediseño completo'
    ]
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
