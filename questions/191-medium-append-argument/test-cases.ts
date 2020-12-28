import { Equal, Expect } from "../../utils";

type AppendArgument<Fn extends (...args: any[]) => any, T> = Fn extends (
  ...args: infer R1
) => infer R2
  ? (...args: [...R1, T]) => R2
  : never;

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>;
type Result1 = (a: number, b: string, x: boolean) => number;

type Case2 = AppendArgument<() => void, undefined>;
type Result2 = (x: undefined) => void;

type cases = [Expect<Equal<Case1, Result1>>, Expect<Equal<Case2, Result2>>];
