export default class Timer {
    private intervalId: NodeJS.Timeout | null = null;
    private count: number = 0;
    private onEnd: () => void;

    constructor(count: number, callbackOnEnd: () => void) {
        this.count = count;
        this.onEnd = callbackOnEnd;
    }

    start() {
        if (this.intervalId) {
            return;
        }

        this.intervalId = setInterval(() => {
            if (this.count > 0) {
              this.count--;
              console.log(this.count);
            } else {
              this.stop();
              this.onEnd();
            }
        }, 1000);
    }

    pause() {
        if (!this.intervalId) {
          return;
        }
    
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
    
    private stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            
        }
    }


}