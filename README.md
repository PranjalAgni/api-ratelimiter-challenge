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
      ```
      In this algorithm there is a bucket 🪣 with a defined capacity, in which we can add tokens. 
      
      Idea is request is processed only if tokens are available in the bucket, if the bucket is empty request is rejected

      Whenever we process a request, we consume a token from the bucket and it is therefore removed from the bucket. 

      There is a refill rate for the bucket after every seconds x tokens are added to the bucket. Suppose 1 token is added every 5 seconds that means the refill rate is 0.2/seconds (0.2 tokens every 1 second)
      ```

2. Leaky bucket (as a meter) - This is equivalent to the token bucket, but implemented in a different way - a mirror image.

      ```
      This is a traffic shaping algorithm, it shapes the bursty network to a smooth one

      Analogy time!!!
      Imagine we have a bucket with a hole in it, we pour water into it at random
      intervals. Water is going to leak at a constant rate from the bucket. 
      If you think clearly it is shaping the water flow no matter how much burstly
      you add water to it in random intervals but, it will outflow at a constant rate only

      So in leaky bucket algorithm, we add requests to the queue which is leaking at a defined
      leak rate. 
      If the queue becomes full we reject the request else we add the request to queue and process it
      ```

3. Leaky bucket (as a queue) - The bucket behaves like a FIFO queue with a limited capacity, if there is space in the bucket the request is accepted.

4. Fixed window counter - record the number of requests from a sender occurring in the rate limit’s fixed time interval, if it exceeds the limit the request is rejected.

5. Sliding window log - Store a timestamp for each request in a sorted set, when the size of the set trimmed to the window exceeds the limit, requests are rejected.
Sliding window counter - similar to the fixed window, but each request is timestamped and the window slides.
