import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.DB_URL; // Replace with your MongoDB URI

export async function ConnDB() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Successfully connected to Database');
    } catch (error) {
        console.log('Error occurred while connecting to Database');
        console.error(error);
    } finally {
        await client.close();
    }
}
