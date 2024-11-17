import express, { Request, Response } from "express";
import { init } from "./start-service";
import postRoutes from "./routes/postRoutes";
const app = express();
app.use(express.json());
const port = 3000;

init();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.use('/post',postRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
