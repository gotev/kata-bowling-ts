# Bowling Kata - TypeScript Implementation Details

## Overview
This document provides an explanation of the implementation. It details how frames are stored, how the score is calculated, and the validation logic to ensure proper gameplay.

---

## Implementation Breakdown

### Class Structure
The `BowlingGame` class is structured as follows:
- `frameIndex`: Tracks the current frame number (0-9).
- `framesStore`: A two-dimensional array storing individual frames as arrays of rolls.

### Constructor
The constructor initializes the `frameIndex` to `0` and an empty `framesStore` array.

### IsInProgress Method (`isInProgress()`)
Returns true if the game is still in progress and false when the game is finished.

### Roll Method (`roll(pins: number)`)
This method records a roll and places it in the correct frame. It includes validation to ensure no invalid rolls are recorded and that the game does not exceed the allowed number of rolls.

While it's possible to track rolls in a flat array and calculate scores based on indexes, grouping rolls into frames improves readability, structure, and scoring efficiency. Here's why:
  - Bowling is a frame-based game, not just a series of rolls. Each player gets:

  - Up to 2 rolls per frame (except for strikes and the final frame).
  - 10 total frames (with possible extra rolls in the last frame).

By grouping rolls into frames, we mirror the game's actual structure, making the code easier to understand and debug.

With a flat array:
  - we need to track frame boundaries dynamically, which leads to index-based logic that can be harder to follow and prone to errors
  - preventing extra rolls after the game is finished becomes tricky because we must infer the game's progress manually

With grouped frames, we can simply iterate over the frames and apply the rules for:
  - Open frames
  - Spares
  - Strikes

This avoids the complexity of manually determining which rolls belong to which frame.

- **Final Frame Handling:** If the game is in the 10th frame (index 9), ensure it follows the special rules for the last frame (e.g., extra roll for a spare or strike):

- **Frame Progression:**
  - If a strike (`pins === 10`) occurs before the last frame, move to the next frame immediately. This is necessary because of how a strike affects the game's structure and scoring:
    - Normally, a frame allows two rolls.
    - If a player rolls a strike (knocking down all 10 pins in the first roll), there is no need for a second roll in that frame because:
      - A strike already guarantees the full 10 pins.
      - The next two rolls (from future frames) will be used as a bonus to compute the score for this frame
    - The 10th frame operates differently:
      - A strike in the 10th frame does not immediately end the frame.
      - Instead, the player is awarded two additional rolls in the same frame.
      - This ensures that even if a player rolls a strike in the first roll of the 10th frame, they still get to roll twice more.
    - If we didn't move to the next frame immediately, we'd mistakenly allow another roll within the same frame, violating bowling rules.
    - Moving to the next frame ensures that the correct bonus logic applies: the next two rolls should be counted as bonuses for the strike, not part of the current frame.
  - Otherwise, wait for two rolls per frame before progressing.

---

### Score Calculation (`score()`)
The `score()` method calculates the total score based on the stored frames.

1. **Iterate through frames** and calculate the score progressively.
2. **Handle open frames** (sum of two rolls is less than 10).
3. **Handle spares** (sum of two rolls is 10, adding the next roll as a bonus).
4. **Handle strikes** (10 in one roll, adding the next two rolls as a bonus).

---

## Example Calculation Walkthrough
### Given Rolls:
```typescript
const rolls = [10, 5, 5, 10, 5, 5, 10, 5, 5, 10, 5, 5, 10, 5, 5, 10];
```

| Frame | Rolls  | Score Calculation      | Cumulative Score |
|-------|--------|-----------------------|------------------|
| 1     | 10     | 10 + 5 + 5 = 20       | 20               |
| 2     | 5, 5   | 10 + 10 = 20          | 40               |
| 3     | 10     | 10 + 5 + 5 = 20       | 60               |
| 4     | 5, 5   | 10 + 10 = 20          | 80               |
| 5     | 10     | 10 + 5 + 5 = 20       | 100              |
| 6     | 5, 5   | 10 + 10 = 20          | 120              |
| 7     | 10     | 10 + 5 + 5 = 20       | 140              |
| 8     | 5, 5   | 10 + 10 = 20          | 160              |
| 9     | 10     | 10 + 5 + 5 = 20       | 180              |
| 10    | 5, 5, 10 | 10 + 10 = 20        | 200              |

Final Score: **200**

---

## Validations & Justifications
### 1. **Valid Rolls Only**
Ensures the number of pins is within the valid range (0-10), preventing invalid inputs.

### 2. **Proper Frame Management**
Prevents adding more than two rolls per frame (except in the 10th frame) to maintain game integrity.

### 3. **Game Completion**
Once the 10th frame has its allowed rolls, further rolls are rejected, ensuring correctness.

---

## Summary
- The implementation efficiently tracks frames and rolls.
- The `roll()` method ensures valid input and prevents exceeding frame limits.
- The `score()` method calculates the correct score, including spares and strikes.
- The validation logic ensures the game follows proper rules and doesn't accept extra rolls.

This approach maintains efficiency, readability, and correctness while enforcing bowling rules effectively.