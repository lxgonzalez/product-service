# 🛠️ Product Add Service

The **Product Add Service** is a microservice developed using Node.js, Express, Apollo Server, GraphQL, and MongoDB. Its primary functionality is to allow the addition of new products to an inventory via a GraphQL API.

---

## 🐳 **Deployment Docker Image**

Visit the repository on Docker Hub [here](https://hub.docker.com/r/lxgonzalez/product-add-service) 🐳

1. **Check if port 4000 is free**.
2. **Run the following command in your terminal**, replace the environment variables with your actual MongoDB credentials:

   ```bash
   > docker pull lxgonzalez/product-add-service
   > docker pull lxgonzalez/product-add-service:latest
   ```


## 🚀**Deployment Locally**
Follow these steps to run the API on your local machine:

1. **Clone the Repository**  

Clone this repository to your local machine:
  ```bash
  git clone https://github.com/lxgonzalez/product-service/
  ```

  2. **Install Dependencies**
   
   ```bash
   npm install
   ```
  3. Run the Application
     
Start the server using the following command:

   ```bash
    npm start
   ```

4. Connecting to the Service
   
Once the application is running, you can access the service by opening your browser and navigating to:      http://localhost:4000

5. Example mutation to add a product:
   
**- Mutation**: Request to add a product.

**- Response**: Returns _id, name, price, category_id, img, colors, sizes to confirm the product has been added.
``` bash
 mutation {
  addProduct(
    name: "T-shirt",
    price: 19.99,
    category_id: "clothing",
    img: "https://example.com/tshirt.jpg",
    colors: [
      { name: "red", img: "https://example.com/red.jpg" },
      { name: "blue", img: "https://example.com/blue.jpg" }
    ],
    sizes: { s: true, m: true, l: true, xl: false }
  ) {
    _id
    name
    price
    category_id
    img
    colors {
      name
      img
    }
    sizes {
      s
      m
      l
      xl
    }
  }
}
```
Example using curl to add a product:
``` bash
curl --location --request POST 'http://localhost:4000/' \
--header 'Content-Type: application/json' \
--data-raw '{
   "query": "mutation { addProduct(name: \"T-shirt\", price: 19.99, category_id: \"clothing\", img: \"https://example.com/tshirt.jpg\", colors: [{ name: \"red\", img: \"https://example.com/red.jpg\" }, { name: \"blue\", img: \"https://example.com/blue.jpg\" }], sizes: { s: true, m: true, l: true, xl: false }) { _id name price category_id img colors { name img } sizes { s m l xl } } }"
}'
```



