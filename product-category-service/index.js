require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { connectToMongo } = require('./connection');
const typeDefs = require('./typeDefs');
const { ObjectId } = require('mongodb');

const app = express();

function handleError(message, code = 'INTERNAL_SERVER_ERROR') {
    return new Error(JSON.stringify({ message, code }));
}

const resolvers = {
    Query: {
        _empty: () => '',
    },
    Mutation: {
        deleteProductsByCategory: async (_, { category_id }) => {
            try {
                const db = await connectToMongo();
                const collectionName = process.env.MONGODB_COLLECTION;

                if (typeof category_id !== 'string' || category_id.trim() === '') {
                    throw handleError('Invalid category_id format: must be a non-empty string', 'BAD_USER_INPUT');
                }

                const products = await db.collection(collectionName).find({ category_id }).toArray();

                if (products.length === 0) {
                    throw handleError(`No products found for category_id: ${category_id}`, 'NOT_FOUND');
                }

                const result = await db.collection(collectionName).deleteMany({ category_id });

                if (result.deletedCount === 0) {
                    throw handleError('Failed to delete products', 'DELETE_FAILED');
                }

                return products;
            } catch (error) {
                console.error('Error in deleteProductsByCategory:', error);
                if (error.message && error.message.startsWith('{')) {
                    throw new Error(error.message);
                }
                throw handleError('Unexpected error occurred', 'INTERNAL_SERVER_ERROR');
            }
        },

    },
};

async function startServer() {
    try {
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            formatError: (err) => {
                try {
                    const parsedError = JSON.parse(err.message);
                    return { message: parsedError.message, code: parsedError.code };
                } catch (e) {
                    return { message: 'Internal server error', code: 'INTERNAL_SERVER_ERROR' };
                }
            },
        });

        await server.start();

        server.applyMiddleware({ app });

        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}${server.graphqlPath}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
