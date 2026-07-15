export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

/**
 * PLACEHOLDER CONTENT — replace with real client testimonials before launch.
 * Keep the same shape (name, role, quote, rating) so the component needs no changes.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Marcela Ibáñez',
    role: 'Propietaria, Nordelta',
    quote:
      'Contratamos a Grupo CGR para renovar toda la fachada de casa y el resultado superó lo que imaginábamos. Cumplieron los tiempos, cuidaron cada detalle y la comunicación fue clara de principio a fin.',
    rating: 5
  },
  {
    name: 'Arq. Federico Lamas',
    role: 'Estudio de Arquitectura',
    quote:
      'Trabajo con Grupo CGR en varios proyectos residenciales y siempre respondieron con la seriedad que un estudio necesita: presupuestos claros, buena ejecución y respeto por los plazos de obra.',
    rating: 5
  },
  {
    name: 'Diego Peralta',
    role: 'Desarrollador Inmobiliario',
    quote:
      'La calidad del microcemento y los revestimientos que aplicaron en nuestro desarrollo en Fincas del Lago fue determinante para la venta de las unidades. Un equipo prolijo y confiable.',
    rating: 5
  },
  {
    name: 'Sabrina Guzmán',
    role: 'Propietaria, El Cantón',
    quote:
      'Desde el primer contacto por WhatsApp hasta la entrega final, todo fue transparente. Nos explicaron cada etapa y el presupuesto se respetó tal cual se había acordado.',
    rating: 5
  }
];
