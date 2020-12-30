import { Equal, Expect } from "../../utils";

type ControlsMap = {
  c: "char";
  s: "string";
  d: "dec";
  o: "oct";
  h: "hex";
  f: "float";
  p: "pointer";
};

type ParsePrintFormat<T> = T extends `${infer _}%${infer R}${infer R2}`
  ? [
      ...(R extends keyof ControlsMap ? [ControlsMap[R]] : []),
      ...ParsePrintFormat<R2>
    ]
  : [];

type cases = [
  Expect<Equal<ParsePrintFormat<"">, []>>,
  Expect<Equal<ParsePrintFormat<"Any string.">, []>>,
  Expect<Equal<ParsePrintFormat<"The result is %d.">, ["dec"]>>,
  Expect<Equal<ParsePrintFormat<"The result is %%d.">, []>>,
  Expect<Equal<ParsePrintFormat<"The result is %%%d.">, ["dec"]>>,
  Expect<Equal<ParsePrintFormat<"The result is %f.">, ["float"]>>,
  Expect<Equal<ParsePrintFormat<"The result is %h.">, ["hex"]>>,
  Expect<Equal<ParsePrintFormat<"The result is %q.">, []>>,
  Expect<Equal<ParsePrintFormat<"Hello %s: score is %d.">, ["string", "dec"]>>,
  Expect<Equal<ParsePrintFormat<"The result is %">, []>>
];
