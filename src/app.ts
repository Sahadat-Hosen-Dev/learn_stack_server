import express, { Request, Response, NextFunction } from "express";

import applyMiddleware from "./middleware";

const app = express();
applyMiddleware(app);

app.get("/health", (req, res) => {
  res.status(200).json({
    health: "OK!",
  });
});

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

export default app;
