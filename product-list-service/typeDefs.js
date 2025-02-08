const { gql } = require('apollo-server-express');

const typeDefs = gql`

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

    type Query {
        findAllproducts: [Product]!
        findProductById(id: ID!): Product
    }
`;

module.exports = typeDefs;
