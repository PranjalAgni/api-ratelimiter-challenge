import { Request, Response, NextFunction } from "express";
import { TokenBucket } from "../algorithms/TokenBucket";

const tokenBucket = new TokenBucket(10, 1); // Capacity 10 tokens, refill 1 token per second

export function tokenBucketMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (tokenBucket.consume(1)) {
    next();
  } else {
    res.status(429).send("Too Many Requests");
  }
}
