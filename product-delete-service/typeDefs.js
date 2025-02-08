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
        deleteProduct(id: ID!): Product!
    }
`;

module.exports = typeDefs;
