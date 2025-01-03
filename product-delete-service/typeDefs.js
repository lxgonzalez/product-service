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
        sizes: Size!
    }

    type Mutation {
        deleteProduct(id: ID!): Product!
    }
`;

module.exports = typeDefs;
