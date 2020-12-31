import { Equal, Expect } from "../../utils";

// TODO: 如何识别 readonly ?
export type GetReadonlyKeys<T, K extends keyof T = keyof T> = K extends K
  ? { readonly [key in K]: T[K] } extends { -readonly [key in K]: T[key] }
    ? K
    : never
  : never;

type cases = [
  Expect<Equal<"title", GetReadonlyKeys<Todo1>>>,
  Expect<Equal<"title" | "description", GetReadonlyKeys<Todo2>>>
];

interface Todo1 {
  readonly title: string;
  description: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  readonly description: string;
  completed?: boolean;
}

type a = { readonly title: string };
type b = { title: string };

type t1 = a extends b ? true : false;
type t2 = b extends a ? true : false;
