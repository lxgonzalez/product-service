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
        name: String!
        available: Boolean!
    }

    type Product {
        _id: ID
        name: String
        price: Float
        category_id: String
        img: String
        colors: [Color]
        sizes: [Size]
    }

    type Mutation {
        deleteProductsByCategory(category_id: String!): [Product]!
    }
`;

module.exports = typeDefs;
