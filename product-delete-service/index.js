require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { connectToMongo } = require('./connection');
const typeDefs = require('./typeDefs');
const { ObjectId } = require('mongodb');

const app = express();

const resolvers = {
    Query: {
        _empty: () => '',
    },
    Mutation: {
        deleteProduct: async (_, { id }) => {
            const db = await connectToMongo();
            
            // Convierte el id a ObjectId
            const productId = new ObjectId(id);

            const collectionName = process.env.MONGODB_COLLECTION;

            const product = await db.collection(collectionName).findOne({ _id: productId });

            if (!product) {
                throw new Error('Product not found');
            }

            await db.collection('products').deleteOne({ _id: productId });

            return product;
        },
    },
};

async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    server.applyMiddleware({ app });

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}${server.graphqlPath}`);
    });
}

startServer();
