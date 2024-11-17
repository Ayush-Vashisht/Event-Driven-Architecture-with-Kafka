import { Admin, Kafka, logLevel, Producer } from "kafkajs";

class KafkaConfig {
  private kafka: Kafka;
  private producer: Producer;
  private admin: Admin;
  private brokers: string;

  constructor() {
    this.brokers = process.env.KAFKA_BROKERS || '10.10.52.25:9092';
    this.kafka = new Kafka({
      clientId: 'producer', 
      brokers: [this.brokers],
      logLevel: logLevel.ERROR, 
    });

    this.producer = this.kafka.producer();
    this.admin = this.kafka.admin();
  }

  async connect(): Promise<void> {
    try {
      await this.producer.connect();
      await this.admin.connect();
      console.log('Kafka producer and admin connected.');
    } catch (error) {
      console.error("Error connecting with Kafka", error);
      throw new Error('Failed to connect Kafka');
    }
  }

  async createTopic(topic: string): Promise<void> {
    try {
      const topics = await this.admin.listTopics();
      if (!topics.includes(topic)) {
        await this.admin.createTopics({
          topics: [{ topic, numPartitions: 1 }],
        });
        console.log(`Topic created: ${topic}`);
      } else {
        console.log(`Topic ${topic} already exists.`);
      }
    } catch (error) {
      console.error("Error creating topic:", error);
      throw new Error('Failed to create topic');
    }
  }

  async sentToTopic(topic: string, message: string): Promise<void> {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: message }],
      });
      console.log(`Message sent to topic: ${topic}`);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;  
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.producer.disconnect();
      await this.admin.disconnect();
      console.log('Kafka producer and admin disconnected.');
    } catch (error) {
      console.error('Error disconnecting Kafka producer:', error);
    }
  }
}

export default new KafkaConfig();
