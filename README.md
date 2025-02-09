# 🛒 **Product Service Module**

This module provides comprehensive microservices for product management including: **Add**, **List**, **Delete**, **Update**, and **Delete by Category**. Built with event-driven architecture for real-time operations.

---

## 📚 **Technologies Used**

- **Node.js 18** : Runtime environment
- **Express**: Web framework for REST APIs
- **WebSocket**: For real-time communication with the broker to delete products by category.
- **MongoDB**: NoSQL database for product storage
- **Docker**: Containerization and deployment
- **Apollo Server**: GraphQL integration (optional)
- **GraphQL**: A query language for APIs, used to interact with product data.
- **Docker**: For containerizing the application for easier deployment and scaling.

---

## 🛠️ Microservices Overview
➕ Add Product: A microservice to add new products to the database.

📋 List Products: A microservice to list all available products.

🗑️ Delete Product: A microservice to remove a product from the database.

🧹 Delete Product by Category: A microservice that listens for messages via WebSocket and deletes all products associated with a particular category.

🔄 Update Product: A microservice to update the details of an existing product.

---
