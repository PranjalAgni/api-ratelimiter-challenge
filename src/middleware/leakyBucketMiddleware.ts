import { Request, Response, NextFunction } from "express";
import { LeakyBucket } from "../algorithms/LeakyBucket";

const leakyBucket = new LeakyBucket(10, 1); // Capacity 10 requests, process 1 request per second

export function leakyBucketMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (leakyBucket.addRequest(req)) {
    next(); // Request is accepted and processed
  } else {
    res.status(429).send("Too Many Requests"); // Request is rejected
  }
}
