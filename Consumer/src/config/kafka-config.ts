import { Kafka, logLevel, Consumer } from "kafkajs";

class KafkaConfig {
  private kafka: Kafka;
  private consumer: Consumer;
  private brokers: string;

  constructor() {
    this.brokers = process.env.KAFKA_BROKERS||"localhost:9092";
    this.kafka = new Kafka({
      clientId: "producer",
      brokers: [this.brokers],
      logLevel: logLevel.ERROR,
    });

    this.consumer = this.kafka.consumer({
      groupId: "consumer",
    });
  }

  async connect(): Promise<void> {
    try {
      await this.consumer.connect();
      console.log("Kafka consumer connected.");
    } catch (error) {
      console.error("Error connecting with Kafka", error);
      throw new Error("Failed to connect Kafka");
    }
  }

  async subscribeToTopic(topic: string): Promise<void> {
    try {
      await this.consumer.subscribe({
        topic,
        fromBeginning: true,
      });
      console.log("Subscribed to topic:", topic);
    } catch (error) {
      console.log("Error subscribing to topic:", error);
    }
  }

  async consume(callback: (message: string | undefined) => void): Promise<void> {
    try {
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log("Message received:", {
              topic,
              partition,
              value: message?.value?.toString(),
            });
            callback(JSON.parse(message?.value?.toString()!));
        },
      });
    } catch (error) {
      console.log("Error receiving message:", error);
    }
  }
  

  async disconnect(): Promise<void> {
    try {
      await this.consumer.disconnect();
      console.log("Kafka producer and admin disconnected.");
    } catch (error) {
      console.error("Error disconnecting Kafka producer:", error);
    }
  }
}

export default new KafkaConfig();
