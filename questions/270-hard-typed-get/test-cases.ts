import { Equal, Expect } from "../../utils";

type Get<T, K> = K extends `${infer K1}.${infer K2}`
  ? Get<Get<T, K1>, K2>
  : K extends keyof T
  ? T[K]
  : never;

type cases = [
  Expect<Equal<Get<Data, "hello">, "world">>,
  Expect<Equal<Get<Data, "foo.bar.count">, 6>>,
  Expect<Equal<Get<Data, "foo.bar">, { value: "foobar"; count: 6 }>>,

  Expect<Equal<Get<Data, "no.existed">, never>>
];

type Data = {
  foo: {
    bar: {
      value: "foobar";
      count: 6;
    };
    included: true;
  };
  hello: "world";
};
