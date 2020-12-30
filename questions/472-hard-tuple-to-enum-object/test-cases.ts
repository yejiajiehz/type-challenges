import { Equal, Expect, ExpectFalse, NotEqual } from "../../utils";

type Enum1<T extends readonly any[], V extends string = T[number]> = {
  readonly [key in `${Capitalize<T[number]>}`]: V extends any
    ? `${Capitalize<V>}` extends key
      ? V
      : never
    : never;
};

type GetIndex<T, K, V extends any[] = []> = T extends readonly [
  infer R1,
  ...infer R2
]
  ? R1 extends K
    ? V["length"]
    : GetIndex<R2, K, [R1, ...V]>
  : never;

type Enum2<T extends readonly any[], K = Enum1<T>> = {
  [key in keyof K]: GetIndex<T, K[key]>;
};

type Enum<T extends readonly any[], K extends boolean = false> = K extends false
  ? Enum1<T>
  : Enum2<T>;

const OperatingSystem = ["macOS", "Windows", "Linux"] as const;
const Command = [
  "echo",
  "grep",
  "sed",
  "awk",
  "cut",
  "uniq",
  "head",
  "tail",
  "xargs",
  "shift",
] as const;

type cases = [
  Expect<Equal<Enum<[]>, {}>>,
  Expect<
    Equal<
      Enum<typeof OperatingSystem>,
      {
        readonly MacOS: "macOS";
        readonly Windows: "Windows";
        readonly Linux: "Linux";
      }
    >
  >,
  Expect<
    Equal<
      Enum<typeof OperatingSystem, true>,
      {
        readonly MacOS: 0;
        readonly Windows: 1;
        readonly Linux: 2;
      }
    >
  >,
  Expect<
    Equal<
      Enum<typeof Command>,
      {
        readonly Echo: "echo";
        readonly Grep: "grep";
        readonly Sed: "sed";
        readonly Awk: "awk";
        readonly Cut: "cut";
        readonly Uniq: "uniq";
        readonly Head: "head";
        readonly Tail: "tail";
        readonly Xargs: "xargs";
        readonly Shift: "shift";
      }
    >
  >,
  Expect<
    Equal<
      Enum<typeof Command, true>,
      {
        readonly Echo: 0;
        readonly Grep: 1;
        readonly Sed: 2;
        readonly Awk: 3;
        readonly Cut: 4;
        readonly Uniq: 5;
        readonly Head: 6;
        readonly Tail: 7;
        readonly Xargs: 8;
        readonly Shift: 9;
      }
    >
  >
];
