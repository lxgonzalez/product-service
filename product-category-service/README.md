# 🛠️ Delete Products by Category Microservice

The **Delete Products by Category Service** is a microservice built using Node.js, Express, WebSockets, and MongoDB. Its primary function is to listen for category delete events via a WebSocket connection and remove all products associated with the deleted category from the database.

---

## 🐳 **Deploying the Docker Image**

You can deploy this microservice using Docker by following these steps:

1. **Ensure port 1029 is available.**
2. **Run the following commands to pull the image from Docker Hub:**

```bash
> docker pull lxgonzalez/product-category-service
> docker pull lxgonzalez/product-category-service:latest
```

## 🚀 **Deployment Locally**

Follow these steps to run the API on your local machine:

1. **Clone the Repository**  

   Clone this repository to your local machine:
  ```bash
   https://github.com/lxgonzalez/product-service.git
   ```
   
2. Install Dependencies
  ```bash
   npm install
  ```
3. Configure Environment Variables

In the root directory, create a .env file and add your MongoDB connection details:
  ```bash
MONGODB_URL=mongodb://your-mongodb-url
MONGODB_DB_NAME=your-database-name
MONGODB_COLLECTION=products
BROKER_URL=ws://your-broker-url
  ```
4. Run the application
   
 ```bash
   npm start
  ```
## **Webscoket Subscription**
This service listens for WebSocket messages with the following structure:
 ```json
 {
  "event": "delete_category",
  "topic": "categories_products",
  "category_id": "clothing"
}
 ```
Upon receiving a message, the service deletes all products associated with the specified category_id in the MongoDB database.
