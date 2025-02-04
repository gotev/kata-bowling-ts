import { BowlingGame } from "../src/BowlingGame";

describe("BowlingGame", () => {
  let game: BowlingGame;

  beforeEach(() => {
    game = new BowlingGame();
  });

  const expectGameFinished = () => {
    expect(() => game.roll(0)).toThrow('Game already finished. Please start a new game first.');
    expect(game.isInProgress()).toBe(false);
  }

  test("Should throw an error when rolling less than 0 pins", () => {
    expect(() => game.roll(-1)).toThrow("Invalid number of pins. Must be between 0 and 10.");
  });

  test("Should throw an error when rolling more than 10 pins", () => {
    expect(() => game.roll(11)).toThrow("Invalid number of pins. Must be between 0 and 10.");
  });

  test("Should allow rolling between 0 and 10 pins", () => {
    expect(() => game.roll(0)).not.toThrow();
    expect(() => game.roll(10)).not.toThrow();
  });

  test("Should not allow rolling for more than 21 times", () => {
    for (let i = 0; i < 18; i++) {
        game.roll(4);
    }
    game.roll(5);
    game.roll(5);
    game.roll(10);
    expectGameFinished();
  });

  test("Gutter game (all zeroes)", () => {
    for (let i = 0; i < 20; i++) {
        game.roll(0);
    }
    expect(game.score()).toBe(0);
    expectGameFinished();
  });

  test("All ones (score of 20)", () => {
    for (let i = 0; i < 20; i++) {
        game.roll(1);
    }
    expect(game.frames()).toStrictEqual([
      [ 1, 1 ], [ 1, 1 ],
      [ 1, 1 ], [ 1, 1 ],
      [ 1, 1 ], [ 1, 1 ],
      [ 1, 1 ], [ 1, 1 ],
      [ 1, 1 ], [ 1, 1 ]
    ]);
    expect(game.score()).toBe(20);
    expectGameFinished();
  });

  test("One spare followed by three and then all zeros", () => {
    game.roll(5);
    game.roll(5);
    game.roll(3);
    for (let i = 0; i < 17; i++) {
        game.roll(0);
    }
    expect(game.frames()).toStrictEqual([
      [ 5, 5 ], [ 3, 0 ],
      [ 0, 0 ], [ 0, 0 ],
      [ 0, 0 ], [ 0, 0 ],
      [ 0, 0 ], [ 0, 0 ],
      [ 0, 0 ], [ 0, 0 ]
    ]);
    expect(game.score()).toBe(16);
    expectGameFinished();
  });

  test("One strike followed by threes, and then zeroes", () => {
    game.roll(10);
    game.roll(3);
    game.roll(3);
    for (let i = 0; i < 16; i++) {
        game.roll(0);
    }
    expect(game.frames()).toStrictEqual([
      [ 10 ],   [ 3, 3 ],
      [ 0, 0 ], [ 0, 0 ],
      [ 0, 0 ], [ 0, 0 ],
      [ 0, 0 ], [ 0, 0 ],
      [ 0, 0 ], [ 0, 0 ]
    ]);
    expect(game.score()).toBe(22);
    expectGameFinished();
  });

  test("Perfect game (all strikes)", () => {
    for (let i = 0; i < 12; i++) {
        game.roll(10);
    }
    expect(game.frames()).toStrictEqual([
      [ 10 ], [ 10 ],
      [ 10 ], [ 10 ],
      [ 10 ], [ 10 ],
      [ 10 ], [ 10 ],
      [ 10 ], [ 10, 10, 10 ]
    ]);
    expect(game.score()).toBe(300);
    expectGameFinished();
  });

  test("Alternate strikes and spares", () => {
    const rolls = [10, 5, 5, 10, 5, 5, 10, 5, 5, 10, 5, 5, 10, 5, 5, 10];
    rolls.forEach(pins => game.roll(pins));
    expect(game.frames()).toStrictEqual([
      [ 10 ], [ 5, 5 ],
      [ 10 ], [ 5, 5 ],
      [ 10 ], [ 5, 5 ],
      [ 10 ], [ 5, 5 ],
      [ 10 ], [ 5, 5, 10 ]
    ]);
    expect(game.score()).toBe(200);
    expectGameFinished();
  });

  test("All spares (5 and 5 each frame)", () => {
    for (let i = 0; i < 21; i++) {
        game.roll(5);
    }
    expect(game.frames()).toStrictEqual([
      [ 5, 5 ], [ 5, 5 ],
      [ 5, 5 ], [ 5, 5 ],
      [ 5, 5 ], [ 5, 5 ],
      [ 5, 5 ], [ 5, 5 ],
      [ 5, 5 ], [ 5, 5, 5 ]
    ]);
    expect(game.score()).toBe(150);
    expectGameFinished();
  });

  test("All 4s with a Spare and a Strike in the Last Frame", () => {
    for (let i = 0; i < 18; i++) {
        game.roll(4);
    }
    game.roll(5);
    game.roll(5);
    game.roll(10);
    expect(game.frames()).toStrictEqual([
      [ 4, 4 ], [ 4, 4 ],
      [ 4, 4 ], [ 4, 4 ],
      [ 4, 4 ], [ 4, 4 ],
      [ 4, 4 ], [ 4, 4 ],
      [ 4, 4 ], [ 5, 5, 10 ]
    ]);
    expect(game.score()).toBe(92);
    expectGameFinished();
  });

  test("All 4s with Three Strikes in the Last Frame", () => {
    for (let i = 0; i < 18; i++) {
        game.roll(4);
    }
    game.roll(10);
    game.roll(10);
    game.roll(10);
    expect(game.frames()).toStrictEqual([
      [ 4, 4 ], [ 4, 4 ],
      [ 4, 4 ], [ 4, 4 ],
      [ 4, 4 ], [ 4, 4 ],
      [ 4, 4 ], [ 4, 4 ],
      [ 4, 4 ], [ 10, 10, 10 ]
    ]);
    expect(game.score()).toBe(102);
    expectGameFinished();
  });

  test("Only first open frame, game still in progress", () => {
    const rolls = [5, 3];
    rolls.forEach(pins => game.roll(pins));
    expect(game.frames()).toStrictEqual([
      [ 5, 3 ]
    ]);
    expect(game.score()).toBe(8);
    expect(game.isInProgress()).toBe(true);
  });

  test("Only first frame with strike, game still in progress", () => {
    game.roll(10);
    expect(game.frames()).toStrictEqual([
      [ 10 ]
    ]);
    expect(game.score()).toBe(10);
    expect(game.isInProgress()).toBe(true);
  });

  test("Only first frame with spare, game still in progress", () => {
    game.roll(5);
    game.roll(5);
    expect(game.frames()).toStrictEqual([
      [ 5, 5 ]
    ]);
    expect(game.score()).toBe(10);
    expect(game.isInProgress()).toBe(true);
  });

  test("Only first frame with spare, and second frame with 4, game still in progress", () => {
    game.roll(5);
    game.roll(5);
    game.roll(4);
    expect(game.frames()).toStrictEqual([
      [ 5, 5 ], [ 4 ]
    ]);
    expect(game.score()).toBe(18);
    expect(game.isInProgress()).toBe(true);
  });

  test("Only first three strikes, game still in progress", () => {
    game.roll(10);
    game.roll(10);
    game.roll(10);
    expect(game.frames()).toStrictEqual([
      [ 10 ], [ 10 ], [ 10 ]
    ]);
    expect(game.score()).toBe(60);
    expect(game.isInProgress()).toBe(true);
  });
});