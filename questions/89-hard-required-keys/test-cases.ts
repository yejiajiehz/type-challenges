import { Equal, Expect } from "../../utils";

export type RequiredKeys<T, K extends keyof T = keyof T> = K extends K
  ? { [key in K]: T[K] } extends { [key in K]-?: T[key] }
    ? K
    : never
  : never;

type cases = [
  Expect<Equal<RequiredKeys<{ a: number; b?: string }>, "a">>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined }>, "a">>,
  Expect<
    Equal<
      RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }>,
      "a" | "c" | "d"
    >
  >,
  Expect<Equal<RequiredKeys<{}>, never>>
];
