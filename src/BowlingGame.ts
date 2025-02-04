export class BowlingGame {
  private frameIndex: number;
  private framesStore: number[][];

  constructor() {
    this.frameIndex = 0;
    this.framesStore = [];
  }

  isInProgress(): boolean {
    if (this.frameIndex === 9 && this.framesStore[this.frameIndex]) {
      const lastFrame = this.framesStore[this.frameIndex];
      if (lastFrame.length === 3 || (lastFrame.length === 2 && lastFrame[0] + lastFrame[1] < 10)) {
        return false;
      }
    }

    return true;
  }

  roll(pins: number): void {
    if (pins < 0 || pins > 10) {
      throw new Error("Invalid number of pins. Must be between 0 and 10.");
    }

    if (!this.isInProgress()) {
      throw new Error("Game already finished. Please start a new game first.");
    }

    let frame = this.framesStore[this.frameIndex] || [];
    frame.push(pins);
    this.framesStore[this.frameIndex] = frame;

    if (this.frameIndex < 9 && (frame.length === 2 || pins === 10)) {
      this.frameIndex += 1;
    }
  }

  frames(): number[][] {
    return this.framesStore;
  }

  score(): number {
    let score = 0;

    for (let frameIndex = 0; frameIndex < this.framesStore.length; frameIndex++) {
      const frame = this.framesStore[frameIndex];
      const frameScore = frame.reduce((sum, num) => sum + num, 0);

      // open frame
      if (frameScore < 10) {
        score += frameScore;
        continue;
      }

      // at this point, frameScore is always 10
      const firstNextFrame = this.framesStore[frameIndex + 1] || [];
      const firstNextRoll = firstNextFrame[0] || 0;

      // spare
      if (frame.length === 2) {
        score += frameScore + firstNextRoll;
        continue;
      }

      // strike
      const secondNextRoll = firstNextFrame[1]
        ? firstNextFrame[1]
        : (this.framesStore[frameIndex + 2] || [])[0] || 0;
      score += frameScore + firstNextRoll + secondNextRoll;
    }

    return score;
  }
}
