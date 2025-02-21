import { getEnvVar } from '@utils/env';

const env = {
    project: {
        id: getEnvVar('VITE_PROJECT_ID'),
        databaseId: getEnvVar('VITE_DATABASE_ID'),
    },
    collections: {
        fields: getEnvVar('VITE_FIELDS_COLLECTION_ID'),
        members: getEnvVar('VITE_MEMBERS_COLLECTION_ID'),
        news: getEnvVar('VITE_NEWS_COLLECTION_ID'),
        newsletter: getEnvVar('VITE_NEWSLETTER_COLLECTION_ID'),
        welcomeMessage: getEnvVar('VITE_WELCOME_MESSAGE_COLLECTION_ID'),
    },
    email: {
        serviceId: getEnvVar('VITE_EMAIL_SERVICE_ID'),
        templateId: getEnvVar('VITE_EMAIL_TEMPLATE_ID'),
        userId: getEnvVar('VITE_EMAIL_USER_ID'),
    },
} as const;

export default env;
