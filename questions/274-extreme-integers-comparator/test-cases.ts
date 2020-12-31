import { Equal, Expect } from "../../utils";

enum Comparison {
  Greater,
  Equal,
  Lower,
}

// XXX: 递归的深度，更高效的模式应该时按位对比
type NumberToArray<
  T extends number | string,
  Arr extends any[] = []
> = `${Arr["length"]}` extends `${T}` ? Arr : NumberToArray<T, [1, ...Arr]>;

type CompareArr<A extends any[], B extends any[]> = A extends [...B, ...infer _]
  ? B extends [...A, ...infer _]
    ? Comparison.Equal
    : Comparison.Greater
  : Comparison.Lower;

type PositiveCompare<A extends number, B extends number> = CompareArr<
  NumberToArray<A>,
  NumberToArray<B>
>;

type Absolute<T extends number> = `${T}` extends `-${infer R}` ? R : `${T}`;

type NegativeCompare<A extends number, B extends number> = CompareArr<
  NumberToArray<Absolute<B>>,
  NumberToArray<Absolute<A>>
>;

type IsZero<T> = T extends 0 ? true : false;
type IsNegative<T extends number> = `${T}` extends `-${infer _}` ? true : false;

type Comparator<A extends number, B extends number> = IsZero<A> extends true
  ? IsZero<B> extends true
    ? Comparison.Equal
    : IsNegative<B> extends true
    ? Comparison.Greater
    : Comparison.Lower
  : IsNegative<A> extends true
  ? IsNegative<B> extends true
    ? NegativeCompare<A, B>
    : Comparison.Lower
  : IsNegative<B> extends true
  ? Comparison.Greater
  : IsZero<B> extends true
  ? Comparison.Greater
  : PositiveCompare<A, B>;

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>
];
