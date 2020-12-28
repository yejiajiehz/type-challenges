import { Equal, Expect } from "../../utils";

type If<C extends boolean, T, F> = C extends true
  ? T
  : C extends false
  ? F
  : never;

type cases = [
  Expect<Equal<If<true, "a", "b">, "a">>,
  Expect<Equal<If<false, "a", 2>, 2>>
];

// @ts-expect-error
type error = If<null, "a", "b">;
