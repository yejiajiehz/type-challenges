import { Equal, Expect, ExpectFalse, NotEqual } from "../../utils";

type ControlsMap = {
  s: string;
  d: number;
};

type Format<T extends string> = T extends `${infer _}%${infer R}${infer R2}`
  ? R extends keyof ControlsMap
    ? (p: ControlsMap[R]) => Format<R2>
    : never
  : string;

type cases = [
  Expect<Equal<Format<"abc">, string>>,
  Expect<Equal<Format<"a%sbc">, (s1: string) => string>>,
  Expect<Equal<Format<"a%dbc">, (d1: number) => string>>,
  Expect<Equal<Format<"a%dbc%s">, (d1: number) => (s1: string) => string>>
];
