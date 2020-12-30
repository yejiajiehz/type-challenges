import { Equal, Expect, ExpectFalse, NotEqual } from "../../utils";
import { RequiredKeys } from "../89-hard-required-keys/test-cases";

type GetRequired<T> = {
  [key in RequiredKeys<T>]: T[key];
};

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<
    Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>
  >
];
