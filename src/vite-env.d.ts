/// <reference types="vite/client" />

interface ImportMetaEnv {
  // No frontend environment variables needed anymore
  // API keys are now securely stored on the backend
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

