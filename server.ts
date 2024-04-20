import express, { Express } from "express";
import dotenv from "dotenv";

import baseRoute from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(baseRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
