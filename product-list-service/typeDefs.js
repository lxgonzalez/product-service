const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Product {
        _id: ID!
        name: String!
        price: Float!
    }

    type Query {
        findAllproducts: [Product]!
        findProductById(id: ID!): Product
    }
`;

module.exports = typeDefs