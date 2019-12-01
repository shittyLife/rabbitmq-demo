const ampq = require('amqplib')

async function connect() {
  try {
    // 1. create a TCP connection
    const connection = await ampq.connect('amqp://localhost:5672')
    // 2. create a channel for communication
    const channel = await connection.createChannel()
    // 3. create a queue
    const result = await channel.assertQueue('jobs')
    
    channel.consume('jobs', message => {
      const input = JSON.parse(message.content.toString())
      console.log(`Received number ${input.number}`);
      if(input.number == 3) {
        // after you have used the message, tell the server its safe to remove it from the queue
        channel.ack(message)
      }
    })

    console.log('waiting for messages...')
  }catch (err){
    console.error(err);
  }
}

connect()

