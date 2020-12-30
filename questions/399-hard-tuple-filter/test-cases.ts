import { Equal, Expect, ExpectFalse, NotEqual } from "../../utils";

type FilterOut<T, K> = T extends [infer A1, ...infer A2]
  ? [A1] extends [K]
    ? FilterOut<A2, K>
    : [A1, ...FilterOut<A2, K>]
  : T;

type cases = [
  Expect<Equal<FilterOut<[], never>, []>>,
  Expect<Equal<FilterOut<[never], never>, []>>,
  Expect<Equal<FilterOut<["a", never], never>, ["a"]>>,
  Expect<Equal<FilterOut<[1, never, "a"], never>, [1, "a"]>>,
  Expect<
    Equal<
      FilterOut<
        [never, 1, "a", undefined, false, null],
        never | null | undefined
      >,
      [1, "a", false]
    >
  >,
  Expect<
    Equal<
      FilterOut<[number | null | undefined, never], never | null | undefined>,
      [number | null | undefined]
    >
  >
];
