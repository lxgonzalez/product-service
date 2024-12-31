const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { connectToMongo } = require('./connection');
require('dotenv').config();
const typeDefs = require('./typeDefs');
const { ObjectId } = require('mongodb');

const resolvers = {
    Query: {
        findAllproducts: async () => {
            const db = await connectToMongo();
            const collectionName = process.env.MONGODB_COLLECTION; 
            const productsCollection = db.collection(collectionName);
            const products = await productsCollection.find().toArray();
            return products;
        },
        findProductById: async (_, { id }) => {
            const db = await connectToMongo();
            const collectionName = process.env.MONGODB_COLLECTION;
            const productsCollection = db.collection(collectionName);
            const product = await productsCollection.findOne({ _id: new ObjectId(id) }); // Corrected line
            return product;
        },
    },
};

const app = express();

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    server.applyMiddleware({ app });

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}${server.graphqlPath}`);
    });
}

startServer();
