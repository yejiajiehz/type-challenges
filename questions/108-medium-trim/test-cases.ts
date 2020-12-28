import { Equal, Expect } from "../../utils";

type S = " " | "\n" | "\t";
type Trim<T extends string> = T extends `${S}${infer R}` | `${infer R}${S}`
  ? Trim<R>
  : T;

type cases = [
  Expect<Equal<Trim<"str">, "str">>,
  Expect<Equal<Trim<" str">, "str">>,
  Expect<Equal<Trim<"     str">, "str">>,
  Expect<Equal<Trim<"str   ">, "str">>,
  Expect<Equal<Trim<"     str     ">, "str">>,
  Expect<Equal<Trim<"   \n\t foo bar \t">, "foo bar">>
];
