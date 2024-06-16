# Build Your Own Rate Limiter

Challenge from https://codingchallenges.fyi/

This challenge is to build your own API rate limiter. 

Start adding the algorithms directory
Rate limiters are a key part of building an API or large scale distributed system, they help when we wish to throttle traffic based on the user. They allow you to ensure that one or more bad actors can’t accidentally or deliberately overload the service.

A rate limiting strategy can make your API more reliable, when:

- A user is responsible for a spike in traffic, and you need to stay up for everyone else.
- A user is accidentally sending you a lot of requests.
- A bad actor is trying to overwhelm your servers.
- A user is sending you a lot of lower-priority requests, and you want to make sure that it doesn’t affect your high-priority traffic.
- Your service is degraded, and as a result you can’t handle your regular traffic load and need to drop low-priority requests.


## Algorithms for rate limiting

1. Token bucket - tokens are added to a ‘bucket’ at a fixed rate. The bucket has a fixed capacity. When a request is made it will only be accepted if there are enough tokens in the bucket. Tokens are removed from the bucket when a request is accepted.

2. Leaky bucket (as a meter) - This is equivalent to the token bucket, but implemented in a different way - a mirror image.

3. Leaky bucket (as a queue) - The bucket behaves like a FIFO queue with a limited capacity, if there is space in the bucket the request is accepted.

4. Fixed window counter - record the number of requests from a sender occurring in the rate limit’s fixed time interval, if it exceeds the limit the request is rejected.

5. Sliding window log - Store a timestamp for each request in a sorted set, when the size of the set trimmed to the window exceeds the limit, requests are rejected.
Sliding window counter - similar to the fixed window, but each request is timestamped and the window slides.
