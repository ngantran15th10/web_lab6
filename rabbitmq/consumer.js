const amqp = require('amqplib');
const { RABBITMQ_URL, QUEUE_NAME } = require('../config/rabbitmq');

async function consumeMessages() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE_NAME, { durable: true });

        console.log('[Consumer] Waiting for messages...');
        console.log('[Consumer] Press Ctrl+C to exit');

        channel.consume(QUEUE_NAME, (msg) => {
            if (msg !== null) {
                const content = msg.content.toString();
                console.log(`[Consumer] Received: ${content}`);
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('[Consumer] Error:', error.message);
        process.exit(1);
    }
}

consumeMessages();
