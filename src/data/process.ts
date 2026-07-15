export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: 'message-circle' | 'clipboard-check' | 'file-text' | 'hard-hat' | 'check-circle-2';
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: 'Contacto Inicial',
    description:
      'Nos escribís por WhatsApp y contás qué necesitás. Respondemos rápido para entender el alcance de tu proyecto.',
    icon: 'message-circle'
  },
  {
    step: 2,
    title: 'Relevamiento en Obra',
    description:
      'Coordinamos una visita al lugar para relevar superficies, condiciones y particularidades técnicas del proyecto.',
    icon: 'clipboard-check'
  },
  {
    step: 3,
    title: 'Presupuesto',
    description:
      'Preparamos una cotización detallada y transparente, sin letra chica, con materiales, plazos y forma de pago.',
    icon: 'file-text'
  },
  {
    step: 4,
    title: 'Ejecución',
    description:
      'Nuestro equipo ejecuta la obra con supervisión constante, cuidando materiales, tiempos y la limpieza del lugar.',
    icon: 'hard-hat'
  },
  {
    step: 5,
    title: 'Entrega',
    description:
      'Hacemos una revisión final junto al cliente y entregamos el trabajo terminado, cumpliendo lo acordado.',
    icon: 'check-circle-2'
  }
];
