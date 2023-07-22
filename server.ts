import type { NextFunction, Request, Response } from "express";
import type { CorsOptions } from "cors";

const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT ?? 3000;

const cors = require("cors");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const whitelist = [`http://127.0.0.1:${PORT}`, `http://localhost:${PORT}`];
const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (whitelist.includes(requestOrigin ?? "")) {
      callback(null, requestOrigin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.get("/(.html)?", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "views", "404.html"));
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`App is listening in on http://localhost:${PORT} `);
});
