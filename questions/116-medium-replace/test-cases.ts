import { Equal, Expect } from "../../utils";

type Replace<T, From extends string, To extends string> = From extends ""
  ? T
  : T extends `${infer R1}${From}${infer R2}`
  ? `${R1}${To}${R2}`
  : T;

type cases = [
  Expect<Equal<Replace<"foobar", "bar", "foo">, "foofoo">>,
  Expect<Equal<Replace<"foobarbar", "bar", "foo">, "foofoobar">>,
  Expect<Equal<Replace<"foobarbar", "", "foo">, "foobarbar">>,
  Expect<Equal<Replace<"", "", "">, "">>
];
