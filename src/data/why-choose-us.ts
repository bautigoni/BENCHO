export interface ValueProp {
  title: string;
  description: string;
  icon: 'award' | 'users' | 'handshake' | 'shield-check';
}

export const VALUE_PROPS: ValueProp[] = [
  {
    title: 'Más de 18 años de trayectoria',
    description:
      'Desde 2007 acompañamos a familias, arquitectos y desarrolladores en cada etapa de sus proyectos, con una experiencia que se nota en cada detalle.',
    icon: 'award'
  },
  {
    title: 'Empresa familiar',
    description:
      'Somos una empresa familiar y eso se traduce en compromiso real: cada obra lleva nuestro nombre y la tratamos como si fuera propia.',
    icon: 'users'
  },
  {
    title: 'Transparencia de principio a fin',
    description:
      'Presupuestos claros, sin sorpresas ni letra chica. Comunicamos cada etapa del proyecto para que siempre sepas en qué está tu obra.',
    icon: 'handshake'
  },
  {
    title: 'Calidad que se sostiene en el tiempo',
    description:
      'Trabajamos con materiales de primera línea y procesos probados para que el resultado se mantenga impecable durante años, no meses.',
    icon: 'shield-check'
  }
];
