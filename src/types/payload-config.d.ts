import type { Config as GeneratedConfig } from 'payload/generated-types';

declare module 'payload/config' {
  // Define the shape of our custom auth configuration
  interface AuthConfig {
    tokenExpiration?: number;
    maxLoginAttempts?: number;
    lockTime?: number;
    useAPIKey?: boolean;
    cookies?: {
      secure?: boolean;
      sameSite?: 'lax' | 'strict' | 'none';
      domain?: string;
    };
    authenticate: (email: string, password: string) => Promise<{ id: string; email: string }>;
    verify: (args: { req: any }) => Promise<{ id: string; email: string }>;
  }

  // Extend the Payload config to include our auth config
  export interface Config extends Omit<GeneratedConfig, 'auth'> {
    auth?: AuthConfig;
  }

  // This helps TypeScript understand our custom auth property
  export interface PayloadConfig<T = any> {
    (payload: any): Promise<Config> | Config;
  }
}

// This makes our custom types available throughout the app
declare module 'payload' {
  export interface Config extends GeneratedConfig {
    auth?: {
      tokenExpiration?: number;
      maxLoginAttempts?: number;
      lockTime?: number;
      useAPIKey?: boolean;
      cookies?: {
        secure?: boolean;
        sameSite?: 'lax' | 'strict' | 'none';
        domain?: string;
      };
      authenticate: (email: string, password: string) => Promise<{ id: string; email: string }>;
      verify: (args: { req: any }) => Promise<{ id: string; email: string }>;
    };
  }
}
