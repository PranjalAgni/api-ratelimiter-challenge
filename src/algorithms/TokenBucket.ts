export class TokenBucket {
  private tokens: number;
  private lastRefill: number;
  private capacity: number;
  private refillRate: number;

  constructor(capacity: number, refillRate: number) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  // Refill the bucket based on the elapsed time since the last refill
  private refill() {
    const now = Date.now();
    const timeElapsed = now - this.lastRefill; // in miliseconds
    const tokensToAdd = (timeElapsed / 1000) * this.refillRate;
    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }

  // Consume tokens and return true if enough tokens are available, else return false
  public consume(token: number) {
    this.refill();
    if (this.tokens >= token) {
      this.tokens -= token;
      return true;
    }

    return false; // Request is denied due to insufficient tokens
  }
}
