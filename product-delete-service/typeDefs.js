const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        _empty: String
    }
    type Product {
        _id: ID!
        name: String!
        price: Float!
    }
    type Mutation {
        deleteProduct(id: ID!): Product!
    }
`;

module.exports = typeDefs;
