# 🛠️ Product List Service

The **Product List Service** is a microservice developed using Node.js, Express, Apollo Server, GraphQL, and MongoDB. Its primary functionality is to allow listing and retrieving product details from an inventory via a GraphQL API.

---

## 🐳 **Deployment Docker Image**

Visit the repository on Docker Hub [here](https://hub.docker.com/r/lxgonzalez/product-list-service) 🐳

1. **Check if port 4000 is free**.
2. **Run the following command in your terminal**, replace the environment variables with your actual MongoDB credentials:

```bash
> docker pull lxgonzalez/product-list-service
> docker pull lxgonzalez/product-list-service:latest
```

## 🚀 **Deployment Locally**

Follow these steps to run the API on your local machine:

1. **Clone the Repository**  

   Clone this repository to your local machine:
```bash
git clone https://github.com/lxgonzalez/product-service
```

2. Run the application
   
 ```bash
 npm start
 ```
3. Connecting to the Service

Once the application is running, you can access the service by opening your browser and navigating to: http://localhost:4000

4. Example Queries

- Query to list all products:
```bash
query {
  findAllproducts {
    _id
    name
    price
    category_id
    img
    sizes {
      name
      available
    }
  }
}
```
- Query to list a product by ID:
```bash
query {
  findProductById(id: "your-product-id") {
    _id
    name
    price
    category_id
    img
    sizes {
      name
      available
    }
  }
}
```
- Example using curl to list products:

```bash
curl --location --request POST 'http://localhost:4000/' \
--header 'Content-Type: application/json' \
--data-raw '{
  "query": "query { findAllproducts { _id name price category_id img sizes { name available } } }"
}'
```
