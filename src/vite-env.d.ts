/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PROJECT_ID: string;
    readonly VITE_DATABASE_ID: string;
    readonly VITE_FIELDS_COLLECTION_ID: string;
    readonly VITE_MEMBERS_COLLECTION_ID: string;
    readonly VITE_NEWS_COLLECTION_ID: string;
    readonly VITE_NEWSLETTER_COLLECTION_ID: string;
    readonly VITE_WELCOME_MESSAGE_COLLECTION_ID: string;
    readonly VITE_EMAIL_SERVICE_ID: string;
    readonly VITE_EMAIL_TEMPLATE_ID: string;
    readonly VITE_EMAIL_USER_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
