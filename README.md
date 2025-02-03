# Bowling Kata - TypeScript Implementation

## Introduction

This project is an implementation of the Bowling Game Kata in TypeScript. It follows the standard rules of ten-pin bowling and uses Jest for testing. The purpose of this exercise is to develop a robust scoring system for a bowling game while practicing test-driven development (TDD).

## Bowling Rules

A game of bowling consists of 10 frames. Each frame allows a player to roll up to two times, except for the last frame, which allows three rolls in the case of a spare or strike.

### Scoring Rules:

1. **Open Frame**: If the sum of two rolls in a frame is less than 10, the score for the frame is simply the total number of pins knocked down.
2. **Spare**: If the sum of two rolls in a frame equals 10, the frame score is 10 plus the number of pins knocked down in the next roll.
3. **Strike**: If all 10 pins are knocked down in the first roll of a frame, it counts as a strike. The frame score is 10 plus the sum of the next two rolls.
4. **Final Frame (10th Frame)**: If a player rolls a strike or spare in the 10th frame, they are awarded extra rolls to determine their final score:
   - A **spare** in the 10th frame grants **one additional roll**.
   - A **strike** in the 10th frame grants **two additional rolls**.
   - No extra rolls are given if neither a strike nor spare is achieved in the last frame.
5. **Perfect Game**: A game consisting of all strikes results in a maximum possible score of **300**.

## Project Structure

```
|-- src/
|   |-- BowlingGame.ts  # Bowling game logic implementation
|
|-- tests/
|   |-- BowlingGame.test.ts         # Test cases
|
|-- jest.config.js    # Jest configuration
|-- tsconfig.json     # TypeScript configuration
|-- package.json      # Project dependencies and scripts
```

## How to Run the Project

### Prerequisites

- Install [Node.js](https://nodejs.org/). On macOS you can do it via brew: `brew install node`
- Install dependencies by running:
  ```sh
  npm install --only=dev
  ```

### Running Tests

To execute the test cases, run:

```sh
npm test
```

This will run all Jest test cases and display the results in the terminal.

### Implementation Steps

1. Implement the `roll(pins: number)` method to register rolls.
2. Implement the `score()` method to calculate the total game score. This method should be always callable at any point of the game, not only at the end, so you can use it to implement a live scoring system
3. Run `npm test` to ensure all tests pass.
4. Refactor and improve the implementation as needed.

## Additional Notes

- The project follows **Test-Driven Development (TDD)**, so the tests are written before implementing the logic.
- Some edge cases such as all spares, all strikes, and mixed rolls are included in test cases, but beware there could be more cases, so add further test cases to ensure your implementation is as robust as possible

Happy coding! 🎳