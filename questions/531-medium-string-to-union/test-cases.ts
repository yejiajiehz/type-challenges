import { Equal, Expect } from "../../utils";

type StrintToUnion<T extends string> = T extends `${infer R1}${infer R2}`
  ? R1 | StrintToUnion<R2>
  : never;

type cases = [
  Expect<Equal<StrintToUnion<"">, never>>,
  Expect<Equal<StrintToUnion<"t">, "t">>,
  Expect<Equal<StrintToUnion<"hello">, "h" | "e" | "l" | "l" | "o">>,
  Expect<
    Equal<
      StrintToUnion<"coronavirus">,
      "c" | "o" | "r" | "o" | "n" | "a" | "v" | "i" | "r" | "u" | "s"
    >
  >
];
