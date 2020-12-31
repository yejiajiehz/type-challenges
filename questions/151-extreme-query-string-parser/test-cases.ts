import { Equal, Expect } from "../../utils";

type MergeValue<V, Target> = V extends Target
  ? Target
  : Target extends [...infer R]
  ? [...R, V]
  : [Target, V];

type MergeObject<V, Target> = {
  [key in keyof Target | keyof V]: key extends keyof V
    ? key extends keyof Target
      ? MergeValue<V[key], Target[key]>
      : V[key]
    : key extends keyof Target
    ? Target[key]
    : never;
};

type MergeArray<T, V = {}> = T extends [infer R, ...infer R2]
  ? MergeArray<R2, MergeObject<R, V>>
  : V;

type ArrayToObject<T extends any[]> = T[1] extends undefined
  ? { [key in T[0]]: true }
  : { [key in T[0]]: T[1] };

type Split<T, S extends string> = T extends `${infer R1}${S}${infer R2}`
  ? [R1, ...Split<R2, S>]
  : [T];

type LoopSplit<T extends any[], S extends string> = T extends [""]
  ? {}
  : T extends [infer R, ...infer R2]
  ? [ArrayToObject<Split<R, S>>, ...LoopSplit<R2, S>]
  : [];

type ParseQueryString<T extends string> = MergeArray<
  LoopSplit<Split<T, "&">, "=">
>;

type cases = [
  Expect<Equal<ParseQueryString<"">, {}>>,
  Expect<Equal<ParseQueryString<"k1">, { k1: true }>>,
  Expect<Equal<ParseQueryString<"k1&k1">, { k1: true }>>,
  Expect<Equal<ParseQueryString<"k1&k2">, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<"k1=v1">, { k1: "v1" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v2">, { k1: ["v1", "v2"] }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k2=v2">, { k1: "v1"; k2: "v2" }>>,
  Expect<
    Equal<ParseQueryString<"k1=v1&k2=v2&k1=v2">, { k1: ["v1", "v2"]; k2: "v2" }>
  >,
  Expect<Equal<ParseQueryString<"k1=v1&k2">, { k1: "v1"; k2: true }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v1">, { k1: "v1" }>>
];
