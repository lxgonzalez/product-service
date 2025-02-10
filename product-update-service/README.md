# 🛠️ Product Update Service

The **Product Update Service** is a microservice built using Node.js, Express, Apollo Server, GraphQL, and MongoDB. Its primary functionality is to allow the updating of product details in an inventory via a GraphQL API.

---

## 🐳 **Deployment Docker Image**

Visit the repository on Docker Hub [here](https://hub.docker.com/r/lxgonzalez/product-update-service)

1. **Check if port 4000 is free**.
2. **Run the following command in your terminal**, replace the environment variables with your actual MongoDB credentials:

```bash
> docker pull lxgonzalez/product-update-service
> docker pull lxgonzalez/product-update-service:latest
```

## 🚀 **Deployment Locally**

Follow these steps to run the API on your local machine:

1. **Clone the Repository**  

   Clone this repository to your local machine:
```bash
git clone https://github.com/lxgonzalez/product-service
```

2. **Install Dependencies**
```bash
npm install
```
3. **Run the application**
   
 ```bash
 npm start
  ```
4. **Connecting to the Service**

Once the application is running, you can access the service by opening your browser and navigating to: http://localhost:4000

5. **Example Mutation to Update a Product**
Use the following mutation to update a product:
```bash
mutation {
  updateProduct(
    id: "product_id",
    name: "Updated T-shirt",
    price: 24.99,
    category_id: "clothing",
    img: "https://example.com/updated_tshirt.jpg",
    sizes: [{ name: "m", available: true }, { name: "l", available: false }]
  ) {
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
Example using curl to update a product:
```bash
curl --location --request POST 'http://localhost:4000/' \
--header 'Content-Type: application/json' \
--data-raw '{
   "query": "mutation { updateProduct(id: \"product_id\", name: \"Updated T-shirt\", price: 24.99, category_id: \"clothing\", img: \"https://example.com/updated_tshirt.jpg\", sizes: [{ name: \"m\", available: true }, { name: \"l\", available: false }]) { _id name price category_id img sizes { name available } } }"
}'
```

---
## 📽️ Evidence
