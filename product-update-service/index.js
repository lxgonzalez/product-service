require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { connectToMongo } = require('./connection');
const typeDefs = require('./typeDefs');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();

const resolvers = {
    Query: {
        _empty: () => '',
    },
    Mutation: {
        updateProduct: async (_, { id, name, price }) => {
            const db = await connectToMongo();
            const collectionName = process.env.MONGODB_COLLECTION;
            const productsCollection = db.collection(collectionName);
            
            // Verificar si el producto existe
            const product = await productsCollection.findOne({ _id: new ObjectId(id) });
            if (!product) {
                throw new Error('Product not found');
            }

            // Preparar los campos para la actualización
            const updateFields = {};
            if (name && name !== product.name) updateFields.name = name;
            if (price && price !== product.price) updateFields.price = price;

            // Si no se han proporcionado cambios, lanzar un error
            if (Object.keys(updateFields).length === 0) {
                throw new Error('No changes made');
            }

            // Realizar la actualización
            const result = await productsCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updateFields }
            );

            if (result.modifiedCount === 0) {
                throw new Error('Product not updated');
            }

            // Obtener el producto actualizado
            const updatedProduct = await productsCollection.findOne({ _id: new ObjectId(id) });
            return updatedProduct;
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
