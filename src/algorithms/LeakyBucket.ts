export class LeakyBucket {
  private capacity: number;
  private leakRate: number;
  private queue: number[];
  private lastLeakTime: number;

  constructor(capacity: number, leakRate: number) {
    this.capacity = capacity;
    this.leakRate = leakRate;
    this.queue = [];
    this.lastLeakTime = Date.now();
  }

  private leak() {
    const now = Date.now();
    const timeElapsed = now - this.lastLeakTime;
    const leaks = Math.floor((timeElapsed / 1000) * this.leakRate);
    if (leaks > 0) {
      this.queue.splice(0, leaks);
      this.lastLeakTime = now;
    }
  }

  public addRequest(request: any): boolean {
    this.leak();

    if (this.queue.length < this.capacity) {
      this.queue.push(request); // add request to the queue
      return true;
    }
    return false; // Request is rejected due to overflow
  }
}
