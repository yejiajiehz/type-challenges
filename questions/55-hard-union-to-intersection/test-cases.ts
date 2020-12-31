import { Equal, Expect, ExpectFalse, NotEqual } from "../../utils";

// TODO:
type UnionToIntersection<T, K = T> = [T] extends [never]
  ? unknown
  : T extends any
  ? T & UnionToIntersection<Exclude<K, T>>
  : never;

type cases = [
  Expect<Equal<UnionToIntersection<"foo" | 42 | true>, "foo" & 42 & true>>,
  Expect<
    Equal<
      UnionToIntersection<(() => "foo") | ((i: 42) => true)>,
      (() => "foo") & ((i: 42) => true)
    >
  >
];
