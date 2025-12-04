import { Client, Account, Databases, Storage } from 'react-native-appwrite';

const client = new Client();

client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM);

export const account = new Account(client);
export const databases = new Databases(client);

export const DATBASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID
export const HABITS_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_HABITS_TABLE_ID

export default client;