import { Router, Request, Response } from "express";
import kafkaConfig from "../config/kafka-config";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { title, content } = req.body;
  try {
    await kafkaConfig.sentToTopic("post", JSON.stringify({ title, content }));
    res.status(200).json({ message: "Message sent successfully" });
    return;
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Error sending message." });
    return;
  }
});

export default router;
