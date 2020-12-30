import { Equal, Expect } from "../../utils";

type CapitalizeWordsWithSpace<T extends string, S extends any> =
  // 判断是否存在空格
  T extends `${infer R1}${S}${infer R2}`
    ? // 获取空格
      T extends `${R1}${infer RS}${R2}`
      ? `${Capitalize<R1>}${RS}${CapitalizeWordsWithSpace<R2, S>}`
      : never
    : // 不存在直接处理
      Capitalize<T>;

type Space = [" ", ".", ","];
type CapitalizeWords<T extends string, V = Space> = V extends [
  infer S,
  ...infer S1
]
  ? CapitalizeWords<CapitalizeWordsWithSpace<T, S>, S1>
  : T;

type x = CapitalizeWords<"foo,bar hello world">;

type cases = [
  Expect<Equal<CapitalizeWords<"foobar">, "Foobar">>,
  Expect<Equal<CapitalizeWords<"FOOBAR">, "FOOBAR">>,
  Expect<Equal<CapitalizeWords<"foo bar">, "Foo Bar">>,
  Expect<Equal<CapitalizeWords<"foo bar hello world">, "Foo Bar Hello World">>,
  Expect<Equal<CapitalizeWords<"foo bar.hello,world">, "Foo Bar.Hello,World">>,
  Expect<Equal<CapitalizeWords<"">, "">>
];
