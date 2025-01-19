# 🛠 **Product Delete Microservice**

The **Product Delete Service** is a microservice developed using Node.js, Express, Apollo Server, GraphQL, and MongoDB. Its primary functionality is to allow the deletion of product records from a database via a GraphQL API.

---

## 🐳 **Deployment Docker Image**

Visit the repository on Docker Hub: [here](https://hub.docker.com/r/lxgonzalez/product-delete-service)

1. **Check if port 4000 is free**.
2. **Run the following command in your terminal**, replace the environment variables with your actual MongoDB connection credentials:
   
    ```bash
    > docker pull lxgonzalez/product-delete-service
    > docker pull lxgonzalez/product-delete-service:latest
    ```
3. **Start the container:**
    ```bash
   > docker run -d --name product-delete-service -p 4000:4000 lxgonzalez/product-delete-service:latest
    ```

## 🚀 **Deployment Locally**

Follow these steps to run the API on your local machine:

1. **Clone the Repository**  

   Clone this repository to your local machine:
  ```bash
   https://github.com/lxgonzalez/product-service
   ``` 
2. Install Dependencies
  ```bash
   npm install
  ```
3. Configure Environment Variables

In the root directory, create a .env file and add your MongoDB connection details:
  ```bash
 > MONGODB_URL=mongodb://localhost:27017
 > MONGODB_DB_NAME=your_database_name
  ```
4. Run the application
   
 ```bash
   npm start
  ```
5. Connecting to the Service

Once the application is running, you can access the service by opening your browser and navigating to: http://localhost:4000

6. Sending GraphQL Request

To delete a product, send a mutation request via GraphQL to the following endpoint: http://localhost:4000/graphql

**GraphQL Request Example:**
 ```bash
   mutation {
  deleteProduct(id: "your_product_id") {
    success
    message
  }
}
  ```
**Example using curl:**
 ```bash
curl --location --request POST 'http://localhost:4000/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{
  "query": "mutation { deleteProduct(id: \"your_product_id\") { success message } }"
}'
  ```
Note: In the id field, replace "your_product_id" with the ID of the product you wish to delete.


---

## 📽️ Evidence

