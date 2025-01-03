require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { connectToMongo } = require('./connection');
const typeDefs = require('./typeDefs');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
'ze'
const resolvers = {
    Query: {
        _empty: () => '',
    },
    Mutation: {
        updateProduct: async (_, { id, name, price, category_id, img, colors, sizes }) => {
            const db = await connectToMongo();
            const collectionName = process.env.MONGODB_COLLECTION;
            const productsCollection = db.collection(collectionName);

            const product = await productsCollection.findOne({ _id: new ObjectId(id) });
            if (!product) {
                throw new Error('Product not found');
            }

            const updateFields = {};
            if (name && name !== product.name) updateFields.name = name;
            if (price && price !== product.price) updateFields.price = price;
            if (category_id && category_id !== product.category_id) updateFields.category_id = category_id;
            if (img && img !== product.img) updateFields.img = img;
            if (colors) updateFields.colors = colors;
            if (sizes) updateFields.sizes = sizes;

            if (Object.keys(updateFields).length === 0) {
                throw new Error('No changes made');
            }

            const result = await productsCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updateFields }
            );

            if (result.modifiedCount === 0) {
                throw new Error('Product not updated');
            }

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
