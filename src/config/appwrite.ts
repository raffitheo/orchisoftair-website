import env from '@config/env';
import { Client, Databases } from 'appwrite';

const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject(env.project.id);

const databases = new Databases(client);

export { client, databases };
