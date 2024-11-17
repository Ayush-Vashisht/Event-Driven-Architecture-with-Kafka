import express, { Request, Response } from 'express';
import { init } from './start-service';
import * as dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(express.json());
const port = 3001;

init();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
