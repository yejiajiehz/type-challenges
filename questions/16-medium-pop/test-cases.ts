import { Equal, Expect } from "../../utils";

export type Pop<T extends any[]> = T extends [...infer R, infer _] ? R : never;

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<["a", "b", "c", "d"]>, ["a", "b", "c"]>>
];
