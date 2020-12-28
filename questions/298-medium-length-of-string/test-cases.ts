import { Equal, Expect } from "../../utils";

type String2Array<T> = T extends `${infer R1}${infer R2}`
  ? [R1, ...String2Array<R2>]
  : [];

type LengthOfString<T extends string> = String2Array<T>["length"];

type cases = [
  Expect<Equal<LengthOfString<"">, 0>>,
  Expect<Equal<LengthOfString<"kumiko">, 6>>,
  Expect<Equal<LengthOfString<"reina">, 5>>,
  Expect<Equal<LengthOfString<"Sound! Euphonium">, 16>>
];
