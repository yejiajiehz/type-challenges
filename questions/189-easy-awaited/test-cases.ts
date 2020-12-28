import { Equal, Expect } from "../../utils";

type Awaited<T> = T extends Promise<infer R> ? R : never;

type X = Promise<string>;
type Y = Promise<{ field: number }>;

type cases = [
  Expect<Equal<Awaited<X>, string>>,
  Expect<Equal<Awaited<Y>, { field: number }>>
];
