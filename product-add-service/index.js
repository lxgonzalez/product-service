const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { connectToMongo } = require('./connection');
require('dotenv').config();
const typeDefs = require('./typeDefs');

const resolvers = {
    Mutation: {
        addProduct: async (_, { name, price, category_id, img, colors, sizes }) => {
            const db = await connectToMongo();
            const collectionName = process.env.MONGODB_COLLECTION;

            const newProduct = {
                name,
                price,
                category_id,
                img,
                colors,
                sizes,
            };

            const result = await db.collection(collectionName).insertOne(newProduct);

            return { _id: result.insertedId, ...newProduct };
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
