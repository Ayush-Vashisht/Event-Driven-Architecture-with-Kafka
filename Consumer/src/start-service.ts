import { connectToDatabse } from "./config/db.config"
import kafkaConfig from "./config/kafka-config";
import { postConsume } from "./services/postConsume";


export const init= async()=>{
    try {
        await connectToDatabse();
        await kafkaConfig.connect();
        await postConsume();
    } catch (error) {
        console.log("Failed to Initalize services:", error)
        process.exit(1);
    }
}