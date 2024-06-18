import express from "express";
import cors from "cors";
import morgan from "morgan";
import { rateLimiter } from "./middleware/rateLimiter";

async function runServer() {
  const app = express();
  // If we are behind some reverse proxy like Nginx then we can trust this
  app.enable("trust proxy");

  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());

  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Server is running",
      details: "Try out /limited and /unlimited endpoints",
    });
  });

  app.get("/unlimited", (req, res) => {
    res.status(200).send("Unlimited! Let's Go!");
  });

  app.use(rateLimiter);

  app.get("/limited", (req, res) => {
    res.status(200).send("Limited, don't over use me!");
  });

  app.listen(process.env.PORT, () => {
    console.log(`API server running on http://localhost:${process.env.PORT}`);
  });
}

runServer();
