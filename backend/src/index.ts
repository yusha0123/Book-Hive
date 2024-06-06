import { config } from "dotenv";
import express from "express";
import cors from "cors";
import connectDb from "./utils/connectDb.js";
import router from "./router/index.js";
import NodeCache from "node-cache";
import { User } from "types.js";

config();
connectDb();
const app = express();
const nodeCache = new NodeCache({
  stdTTL: 60 * 5,
});
const Port = process.env.PORT || 3000;

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

app.use(cors());

app.use(express.json());
app.get("/", (_, res) => res.send("Hello from Express!"));
app.use("/api", router);

app.listen(Port, () => console.log(`Server listening on port: ${Port}`));

export { nodeCache };
