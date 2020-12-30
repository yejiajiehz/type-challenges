import { Equal, Expect } from "../../utils";

type Camel<T> = T extends `${infer R1}_${infer R2}`
  ? Camel<`${R1}${Capitalize<R2>}`>
  : T;

type CamelCase<T extends string> = Camel<Lowercase<T>>;

type cases = [
  Expect<Equal<CamelCase<"foobar">, "foobar">>,
  Expect<Equal<CamelCase<"FOOBAR">, "foobar">>,
  Expect<Equal<CamelCase<"foo_bar">, "fooBar">>,
  Expect<Equal<CamelCase<"foo_bar_hello_world">, "fooBarHelloWorld">>,
  Expect<Equal<CamelCase<"HELLO_WORLD_WITH_TYPES">, "helloWorldWithTypes">>,
  Expect<Equal<CamelCase<"">, "">>
];
