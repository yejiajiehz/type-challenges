import { Equal, Expect } from "../../utils";

type Absolute<T extends number> = `${T}` extends `-${infer R}` ? R : `${T}`;

type isNegative<T extends number> = `${T}` extends `-${infer _}` ? true : false;

type SliceLeft<
  Arr extends any[],
  Index extends number,
  Tail extends any[] = []
> = Tail["length"] extends Index
  ? [Tail, Arr]
  : Arr extends [infer Head, ...infer Rest]
  ? SliceLeft<Rest, Index, [...Tail, Head]>
  : [Tail, []];

type SliceRight<
  Arr extends any[],
  Index extends string,
  Tail extends any[] = []
> = `${Tail["length"]}` extends Index
  ? [Arr, Tail]
  : unknown extends Arr[0]
  ? [[], Tail]
  : Arr extends [...infer Rest, infer Last]
  ? SliceRight<Rest, Index, [Last, ...Tail]>
  : [[], Tail];

type SliceIndex<
  Arr extends any[],
  Index extends number
> = isNegative<Index> extends false
  ? SliceLeft<Arr, Index>
  : SliceRight<Arr, Absolute<Index>>;

type Slice<
  Arr extends any[],
  Start extends number = 0,
  End extends number = Arr["length"]
> = SliceIndex<SliceIndex<Arr, End>[0], SliceIndex<Arr, Start>[0]["length"]>[1];

type Arr = [1, 2, 3, 4, 5];

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>
];
