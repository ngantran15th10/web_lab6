const amqp = require('amqplib');
require('dotenv').config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const QUEUE_NAME = 'lab6_queue';

module.exports = {
    RABBITMQ_URL,
    QUEUE_NAME
};
