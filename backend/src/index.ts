import { config } from "dotenv";
import express from "express";
import os from "os"
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
const port = process.env.PORT || 3000;

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

function getHost() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    for (const network of networkInterfaces[interfaceName]) {
      if (network.family === 'IPv4' && !network.internal) {
        return network.address;
      }
    }
  }
  return 'localhost';
}

app.use(cors());

app.use(express.json());
app.get("/", (_, res) => res.send("Hello from Express!"));
app.use("/api", router);

app.listen(port, () => {
  const host = getHost();
  const url = `http://${host}:${port}`;

  console.log(`Server listening on: ${url}`)
});

export { nodeCache };
