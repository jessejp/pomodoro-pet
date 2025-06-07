declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DATABASE_URL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      FRONTEND_URL: string;
    }
  }
}

export {}
