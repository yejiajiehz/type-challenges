import { Equal, Expect } from "../../utils";

type ToNumber<
  T extends string,
  V extends any[] = []
> = T extends `${V["length"]}` ? V["length"] : ToNumber<T, [any, ...V]>;

type cases = [
  Expect<Equal<ToNumber<"0">, 0>>,
  Expect<Equal<ToNumber<"5">, 5>>,
  Expect<Equal<ToNumber<"12">, 12>>,
  Expect<Equal<ToNumber<"27">, 27>>
];
