import { config } from "dotenv";
import express from "express";
import cors from "cors";
import connectDb from "./utils/connectDb.js";
import router from "./router/index.js";
import NodeCache from "node-cache";

config();
connectDb();
const app = express();
const nodeCache = new NodeCache({
  stdTTL: 60 * 5,
});
const Port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.origin,
  })
);

app.use(express.json());
app.get("/", (_, res) => res.send("Hello from Express!"));
app.use("/api", router);

app.listen(Port, () => console.log(`Server listening on port: ${Port}`));

export { nodeCache };
