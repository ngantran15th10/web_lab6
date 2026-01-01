const amqp = require('amqplib');
const { RABBITMQ_URL, QUEUE_NAME } = require('../config/rabbitmq');

async function sendMessage() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE_NAME, { durable: true });

        const message = `Message from Producer 1 at ${new Date().toISOString()}`;
        channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true });

        console.log(`[Producer 1] Sent: ${message}`);

        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);
    } catch (error) {
        console.error('[Producer 1] Error:', error.message);
        process.exit(1);
    }
}

sendMessage();
