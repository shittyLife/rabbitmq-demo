const ampq = require('amqplib')

const msg = {number: process.argv[2]}

async function connect() {
  try {
    // 1. create a TCP connection
    const connection = await ampq.connect('amqp://localhost:5672')
    // 2. create a channel for communication
    const channel = await connection.createChannel()
    // 3. create a queue
    const result = await channel.assertQueue('jobs')
    channel.sendToQueue('jobs', Buffer.from(JSON.stringify(msg)))
    console.log('Job sent successfully')
  }catch (err){
    console.error(err);
  }
}

connect()

