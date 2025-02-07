type Roll = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type Rolls = Roll[];

type Tuple<N extends number, R extends any[] = []> = R['length'] extends N ? R : Tuple<N, [0, ...R]>;
type Add<A extends number, B extends number> = [...Tuple<A>, ...Tuple<B>]['length'];

type Score<
  T extends Rolls,
  Total extends number = 0,
  Frames extends number = 0
> =
  Frames extends 10
    ? Total 
    : T extends [10, infer Second extends Roll, infer Third extends Roll, ...infer Rest extends Rolls] 
      ? Score<Rest, Add<Total, Add<10, Add<Second, Third>>>, Add<Frames, 1>>
      : T extends [infer First extends Roll, infer Second extends Roll, ...infer Rest extends Rolls]
        ? Add<First, Second> extends 10
          ? Score<Rest, Add<Total, Add<10, (Rest[0] extends Roll ? Rest[0] : 0)>>, Add<Frames, 1>>
          : Score<Rest, Add<Total, Add<First, Second>>, Add<Frames, 1>> 
        : Total;


// 🎳 Gutter Game (Tutti 0) -> Deve restituire 0
type TestGutterGame = Score<[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]>;

// 🎳 Open Frame (Tutti 1) -> 20
type TestAllOnes = Score<[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]>;

// 🎳 Spare seguito da 3 -> 16
type TestSpare = Score<[5, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]>;

// 🎳 Strike seguito da 3 e 3 -> 22
type TestStrike = Score<[10, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]>;

// 🎳 Perfect Game (12 Strike) -> 300
type TestPerfectGame = Score<[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]>;

// 🎳 Alternanza di Strike e Spare (expected 200)
type TestAlternateStrikesAndSpares = Score<[10, 5, 5, 10, 5, 5, 10, 5, 5, 10, 5, 5, 10, 5, 5, 10]>;

// 🎳 Tutti Spare (5 e 5 ogni frame) -> 150
type TestAllSpares = Score<[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]>;

// 🎳 Tutti 4 con Spare e Strike nel 10° Frame -> 92
type TestAllFoursWithSpareAndStrikeInLastFrame = Score<[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 10]>;

// 🎳 Tutti 4 con Tre Strike nel 10° Frame -> 102
type TestAllFoursWithThreeStrikesInLastFrame = Score<[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 10, 10]>;
