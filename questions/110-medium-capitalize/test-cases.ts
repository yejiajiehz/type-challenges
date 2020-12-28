import { Equal, Expect } from "../../utils";

type MyCapitalize<T extends string> = `${Capitalize<T>}`;

type cases = [
  Expect<Equal<Capitalize<"foobar">, "Foobar">>,
  Expect<Equal<Capitalize<"FOOBAR">, "FOOBAR">>,
  Expect<Equal<Capitalize<"foo bar">, "Foo bar">>,
  Expect<Equal<Capitalize<"">, "">>
];
