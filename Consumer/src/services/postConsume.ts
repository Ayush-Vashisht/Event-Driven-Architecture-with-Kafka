import kafkaConfig from "../config/kafka-config";
import PostModel from "../model/post";

export const postConsume = async () => {
  const messages: (string | undefined)[] = [];
  let processing = false;
  try {
    await kafkaConfig.subscribeToTopic("post");
    await kafkaConfig.consume(async (message) => {
      messages.push(message);
      console.log("message received:", message);

      if (messages.length > 100) {
        // bulk registration
        processMessages();
      }
      setInterval(()=>{
        processMessages();
      },5000)
    });
  } catch (error) {}

  async function processMessages() {
    if (messages.length > 0 && !processing) {
        processing = true;
        const batchToProcess = [...messages];
        messages.length = 0;
        console.log("processMessages")
        try {
            PostModel.insertMany(batchToProcess, {ordered:false});
            console.log('Bulk Insertion Completed');
        } catch (error) {
            console.log("Error inserting messages: ", error);
            messages.push(...batchToProcess);
        }
        finally{
            processing =  false;
        }
    }
  }
};
