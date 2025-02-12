const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        _empty: String
    }

    type Size {
        name: String!
        available: Boolean!
    }

    type Product {
        _id: ID!
        name: String!
        price: Float!
        category_id: String!
        img: String!
        sizes: [Size]!
    }

    type Mutation {
        updateProduct(
            id: ID!, 
            name: String, 
            price: Float, 
            category_id: String, 
            img: String, 
            sizes: [InputSize]
        ): Product!
    }

    input InputSize {
        name: String!
        available: Boolean!
    }
`;

module.exports = typeDefs;
