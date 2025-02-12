const WebSocket = require('ws');
const { connectToMongo } = require('./connection');
const express = require('express');
require('dotenv').config();

const brokerUrl = process.env.BROKER_URL;
const topic = 'categories_products';
let ws;

const app = express();

app.get('/', (req, res) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        res.status(200).send('WebSocket client for delete product by category is connected ...');
    } else {
        res.status(500).send('WebSocket connection is not healthy.');
    }
});

app.listen(1029, () => {
});

function connectWebSocket() {
    ws = new WebSocket(brokerUrl);

    ws.on('open', () => {
        console.log('Connection to broker established.');

        const subscribeMessage = {
            event: 'subscribe',
            topic: topic,
        };
        ws.send(JSON.stringify(subscribeMessage));
        console.log(`Subscribed to topic: ${topic}`);
    });

    ws.on('message', async (message) => {
        console.log("Message received from broker:", message);
        try {
            const event = JSON.parse(message);
            console.log("Parsed message:", event);

            if (event.topic === topic && event.event === 'delete_category') {
                const categoryId = event.category_id;
                console.log(`Delete products associated with category: ${categoryId}`);

                const db = await connectToMongo();
                const collectionName = process.env.MONGODB_COLLECTION;

                const result = await db.collection(collectionName).deleteMany({ category_id: categoryId });
                console.log(`Products deleted: ${result.deletedCount}`);
            }
        } catch (error) {
            console.error('Error processing the message:', error);
        }
    });

    ws.on('error', (error) => {
        console.error('Error in WebSocket connection:', error);
    });

    ws.on('close', () => {
        console.log('Connection to broker closed.');
        setTimeout(connectWebSocket, 5000);
    });
}

connectWebSocket();
