import { BowlingGame } from "../src/BowlingGame";

describe("BowlingGame", () => {
  let game: BowlingGame;

  beforeEach(() => {
    game = new BowlingGame();
  });

  test("Gutter game (all zeroes)", () => {
    for (let i = 0; i < 20; i++) {
        game.roll(0);
    }
    expect(game.score()).toBe(0);
  });

  test("All ones (score of 20)", () => {
    for (let i = 0; i < 20; i++) {
        game.roll(1);
    }
    expect(game.score()).toBe(20);
  });

  test("One spare followed by three and then all zeros", () => {
    game.roll(5);
    game.roll(5);
    game.roll(3);
    for (let i = 0; i < 17; i++) {
        game.roll(0);
    }
    expect(game.score()).toBe(16);
  });

  test("One strike followed by threes, and then zeroes", () => {
    game.roll(10);
    game.roll(3);
    game.roll(3);
    for (let i = 0; i < 16; i++) {
        game.roll(0);
    }
    expect(game.score()).toBe(22);
  });

  test("Perfect game (all strikes)", () => {
    for (let i = 0; i < 12; i++) {
        game.roll(10);
    }
    expect(game.score()).toBe(300);
  });

  test("Alternate strikes and spares", () => {
    const rolls = [10, 5, 5, 10, 5, 5, 10, 5, 5, 10, 5, 5, 10, 5, 5, 10];
    rolls.forEach(pins => game.roll(pins));
    expect(game.score()).toBe(200);
  });

  test("All spares (5 and 5 each frame)", () => {
    for (let i = 0; i < 21; i++) {
        game.roll(5);
    }
    expect(game.score()).toBe(150);
  });

  test("All 4s with a Spare and a Strike in the Last Frame", () => {
    for (let i = 0; i < 18; i++) {
        game.roll(4);
    }
    game.roll(5);
    game.roll(5);
    game.roll(10);
    expect(game.score()).toBe(92);
  });

  test("All 4s with Three Strikes in the Last Frame", () => {
    for (let i = 0; i < 18; i++) {
        game.roll(4);
    }
    game.roll(10);
    game.roll(10);
    game.roll(10);
    expect(game.score()).toBe(102);
  });
});