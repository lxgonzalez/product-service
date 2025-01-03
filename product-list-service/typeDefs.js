const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
        sizes: [Size!]!
    }

    type Query {
        findAllproducts: [Product]!
        findProductById(id: ID!): Product
    }
`;

module.exports = typeDefs;
