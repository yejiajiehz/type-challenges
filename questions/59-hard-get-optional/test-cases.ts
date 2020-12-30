import { Equal, Expect, ExpectFalse, NotEqual } from "../../utils";
import { OptionalKeys } from "../90-hard-optional-keys/test-cases";

type GetOptional<T> = Pick<T, OptionalKeys<T>>;

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<
    Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>
  >
];
