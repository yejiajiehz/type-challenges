import { Equal, Expect } from "../../utils";

type ReplaceAll<T, From extends string, To extends string> = From extends ""
  ? T
  : T extends `${infer R1}${From}${infer R2}`
  ? ReplaceAll<`${R1}${To}${R2}`, From, To>
  : T;

type cases = [
  Expect<Equal<ReplaceAll<"foobar", "bar", "foo">, "foofoo">>,
  Expect<Equal<ReplaceAll<"foobarbar", "bar", "foo">, "foofoofoo">>,
  Expect<Equal<ReplaceAll<"t y p e s", " ", "">, "types">>,
  Expect<Equal<ReplaceAll<"foobarbar", "", "foo">, "foobarbar">>,
  Expect<Equal<ReplaceAll<"barfoo", "bar", "foo">, "foofoo">>,
  Expect<Equal<ReplaceAll<"", "", "">, "">>
];
