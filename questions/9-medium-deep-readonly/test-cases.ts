import { Equal, Expect } from "../../utils";

type DeepReadonly<T> = {
  readonly [key in keyof T]: T[key] extends object
    ? T[key] extends Function
      ? T[key]
      : DeepReadonly<T[key]>
    : T[key];
};

// 推荐结果：https://github.com/type-challenges/type-challenges/issues/187

type cases = [Expect<Equal<DeepReadonly<X>, Expected>>];

type X = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "string";
        };
        k: "hello";
      };
    };
  };
};

type Expected = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "string";
        };
        readonly k: "hello";
      };
    };
  };
};
