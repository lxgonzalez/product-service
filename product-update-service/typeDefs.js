const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        _empty: String
    }

    type Color {
        name: String!
        img: String!
    }

    type Size {
        s: Boolean!
        m: Boolean!
        l: Boolean!
        xl: Boolean!
    }

    type Product {
        _id: ID!
        name: String!
        price: Float!
        category_id: String!
        img: String!
        colors: [Color!]!
        sizes: [Size]!
    }

    type Mutation {
        updateProduct(
            id: ID!, 
            name: String, 
            price: Float, 
            category_id: String, 
            img: String, 
            colors: [InputColor], 
            sizes: [InputSize]
        ): Product!
    }

    input InputColor {
        name: String!
        img: String!
    }

    input InputSize {
        s: Boolean!
        m: Boolean!
        l: Boolean!
        xl: Boolean!
    }
`;

module.exports = typeDefs;
