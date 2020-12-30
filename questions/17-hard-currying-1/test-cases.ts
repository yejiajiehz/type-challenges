import { Equal, Expect } from "../../utils";

type Curry<T extends any[], R> = T[1] extends undefined
  ? (f: T[0]) => R
  : (f: T[0]) => Curry<T extends [infer _, ...infer P] ? P : never, R>;

type Curry2<T extends any[], R> = T extends [infer P1, ...infer P2]
  ? (arg: P1) => Curry2<P2, R>
  : R;

declare function Currying<T extends any[], R>(
  fn: (...args: T) => R
): Curry2<T, R>;

const curried1 = Currying((a: string, b: number, c: boolean) => true);
const curried2 = Currying(
  (
    a: string,
    b: number,
    c: boolean,
    d: boolean,
    e: boolean,
    f: string,
    g: boolean
  ) => true
);

type cases = [
  Expect<
    Equal<
      typeof curried1,
      (a: string) => (b: number) => (c: boolean) => boolean
    >
  >,
  Expect<
    Equal<
      typeof curried2,
      (
        a: string
      ) => (
        b: number
      ) => (
        c: boolean
      ) => (
        d: boolean
      ) => (e: boolean) => (f: string) => (g: boolean) => boolean
    >
  >
];
