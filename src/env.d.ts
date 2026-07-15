/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** GA4 Measurement ID, e.g. G-XXXXXXXXXX. Leave unset to disable analytics. */
  readonly PUBLIC_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
