import { Equal, Expect } from "../../utils";

type MyReadonly<T> = { readonly [key in keyof T]: T[key] };

type NoReadonlyKeys<T> = {
  [P in keyof T]: "readonly" extends keyof T[P] ? never : P;
}[keyof T];

type x = NoReadonlyKeys<{
  readonly title: string;
  description: string;
  completed: boolean;
}>;

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>];

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
}

type IfEquals<X, Y, A, B> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;
