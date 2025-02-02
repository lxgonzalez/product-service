const WebSocket = require('ws');
const { connectToMongo } = require('./connection');

const brokerUrl = process.env.BROKER_URL;
let ws;

function connectWebSocket() {
    ws = new WebSocket(brokerUrl);

    ws.on('open', () => {
        console.log('Connection to broker established.');
    });

    ws.on('message', async (message) => {
        console.log("Message received from broker:", message); 
        try {
            const event = JSON.parse(message);
            console.log("Parsed message:", event);

            if (event.event === 'delete_category') {
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
