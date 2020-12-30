import { Equal, Expect } from "../../utils";

export type OptionalKeys<T, K extends keyof T = keyof T> = K extends K
  ? { [key in K]: T[K] } extends { [key in K]-?: T[key] }
    ? never
    : K
  : never;

type cases = [
  Expect<Equal<OptionalKeys<{ a: number; b?: string }>, "b">>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined }>, "b">>,
  Expect<
    Equal<
      OptionalKeys<{ a: undefined; b?: undefined; c?: string; d?: null }>,
      "b" | "c" | "d"
    >
  >,
  Expect<Equal<OptionalKeys<{}>, never>>
];
