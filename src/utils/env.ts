/// <reference types="vite/client" />

type EnvVar = keyof ImportMetaEnv;

class EnvironmentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EnvironmentError';
    }
}

export const getEnvVar = (key: EnvVar): string => {
    const value = import.meta.env[key];
    if (!value)
        throw new EnvironmentError(
            `Missing required environment variable: ${key}`,
        );

    return value;
};

export const validateEnv = (): void => {
    const requiredVars: EnvVar[] = [
        'VITE_PROJECT_ID',
        'VITE_DATABASE_ID',
        'VITE_FIELDS_COLLECTION_ID',
        'VITE_MEMBERS_COLLECTION_ID',
        'VITE_NEWS_COLLECTION_ID',
        'VITE_NEWSLETTER_COLLECTION_ID',
        'VITE_WELCOME_MESSAGE_COLLECTION_ID',
        'VITE_EMAIL_SERVICE_ID',
        'VITE_EMAIL_TEMPLATE_ID',
        'VITE_EMAIL_USER_ID',
    ];

    const missingVars = requiredVars.filter((key) => !import.meta.env[key]);

    if (missingVars.length > 0) {
        throw new EnvironmentError(
            `Missing required environment variables: ${missingVars.join(', ')}`,
        );
    }
};
