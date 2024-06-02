import { Client, Databases } from 'appwrite';

const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject(import.meta.env.VITE_PROJECT_ID);

export const databases = new Databases(client);

export default client;
