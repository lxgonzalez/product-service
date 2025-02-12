require('dotenv').config();

const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_DB_NAME;

const client = new MongoClient(url);

async function connectToMongo() {
    try {
        await client.connect();
        console.log('Successfully connected to MongoDB');
        const db = client.db(dbName);
        return db;
    } catch (error) {
        console.error('Connection error:', error);
        throw new Error('Could not connect to the database');
    }
}

module.exports = { connectToMongo };
