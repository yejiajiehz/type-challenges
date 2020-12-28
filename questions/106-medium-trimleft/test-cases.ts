import { Equal, Expect } from "../../utils";

type S = " " | "\n" | "\t";
type TrimLeft<T extends string> = T extends `${S}${infer R}` ? TrimLeft<R> : T;

type cases = [
  Expect<Equal<TrimLeft<"str">, "str">>,
  Expect<Equal<TrimLeft<" str">, "str">>,
  Expect<Equal<TrimLeft<"     str">, "str">>,
  Expect<Equal<TrimLeft<"     str     ">, "str     ">>,
  Expect<Equal<TrimLeft<"   \n\t foo bar ">, "foo bar ">>
];
