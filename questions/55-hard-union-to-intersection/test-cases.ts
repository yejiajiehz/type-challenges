import { Equal, Expect, ExpectFalse, NotEqual } from "../../utils";

// TODO:
type UnionToIntersection<T, K = T> = [T] extends [never]
  ? unknown
  : T extends any
  ? // ? T extends UnionToIntersection<Exclude<K, T>>
    //   ? UnionToIntersection<Exclude<K, T>>
    T & UnionToIntersection<Exclude<K, T>>
  : never;

// type First<T, V extends any[] = []> = V[0] extends undefined
//   ? T extends T
//     ? First<T, [T]>
//     : never
//   : V;
type p = (() => "foo") | ((i: 42) => true);

// a | b => a & b
// V = T
// T extends any T & Exclude<V, T>
// a & b | b & a
// 在函数模式下不正确
// T extends F

type t = UnionToIntersection<p>;
type a = 1 | 1;
type b = () => 1;
type c = (() => 1) | (() => 1);
type d = b | b;

type X<T, V> = T extends any ? (T extends V ? never : V) : never;

type cases = [
  Expect<Equal<UnionToIntersection<"foo" | 42 | true>, "foo" & 42 & true>>,
  Expect<
    Equal<
      UnionToIntersection<(() => "foo") | ((i: 42) => true)>,
      (() => "foo") & ((i: 42) => true)
    >
  >
];
