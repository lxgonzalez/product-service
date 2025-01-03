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
        updateProduct(id: ID!, name: String, price: Float): Product!
    }
`;

module.exports = typeDefs