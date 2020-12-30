import { Equal, Expect } from "../../utils";

type IsAny<T> = 0 | 1 extends (T extends never ? 0 : 1) ? true : false;

type cases = [
  Expect<Equal<IsAny<any>, true>>,
  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<string>, false>>
];
