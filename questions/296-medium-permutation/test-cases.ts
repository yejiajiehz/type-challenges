import { Equal, Expect } from "../../utils";

// type PermutationString<T, V = T> = T extends `${infer R1}${infer R2}`
//   ?
//       | [R1, ...Permutation<R2>]
//       | (V extends `${R2}${R1}` ? never : Permutation<`${R2}${R1}`, V>)
//   : [];

// 知识点，判断 never
// type IsNeverType<T> = [T] extends [never] ? true : never;

type Permutation<T, K = T> = [T] extends [never]
  ? []
  : T extends T
  ? [T, ...Permutation<Exclude<K, T>>]
  : never;

type cases = [
  Expect<Equal<Permutation<"A">, ["A"]>>,
  Expect<
    Equal<
      Permutation<"A" | "B" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<
    Equal<
      Permutation<"B" | "A" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<Equal<Permutation<never>, []>>
];
