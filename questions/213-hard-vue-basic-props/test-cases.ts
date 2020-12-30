import { Equal, Expect, IsAny, Debug } from "../../utils";

type ConstructToType<T> = T extends new (...args: any) => any
  ? ConstructToType<InstanceType<T>>
  : T extends String
  ? string
  : T extends Number
  ? number
  : T extends Boolean
  ? boolean
  : T;

type TupleToUnion<T> = T extends any[] ? T[number] : T;

type GetType<T> = T extends { type: infer R } ? R : T;

type PropType<T> = {
  [key in keyof T]: {} extends T[key]
    ? any
    : ConstructToType<TupleToUnion<GetType<T[key]>>>;
};

type Computed<T> = {
  [key in keyof T]: T[key] extends (...args: any) => any
    ? ReturnType<T[key]>
    : T[key];
};

declare function VueBasicProps<P, D, C, M>(
  options: {
    props: P;
    data: (this: PropType<P>) => D;
    computed?: C & ThisType<PropType<P> & D>;
    methods?: M & ThisType<PropType<P> & D & Computed<C> & M>;
  } & ThisType<null>
): any;

class ClassA {}

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>;
    type cases = [
      Expect<IsAny<PropsType["propA"]>>,
      Expect<Equal<PropsType["propB"], string>>,
      Expect<Equal<PropsType["propC"], boolean>>,
      Expect<Equal<PropsType["propD"], ClassA>>,
      Expect<Equal<PropsType["propE"], string | number>>,
      Expect<Equal<PropsType["propF"], RegExp>>
    ];

    // @ts-expect-error
    this.firstname;
    // @ts-expect-error
    this.getRandom();
    // @ts-expect-error
    this.data();

    return {
      firstname: "Type",
      lastname: "Challenges",
      amount: 10,
    };
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`;
    },
  },
  methods: {
    getRandom() {
      return Math.random();
    },
    hi() {
      this.fullname.toLowerCase();
      this.getRandom();
    },
    test() {
      const fullname = this.fullname;
      const propE = this.propE;
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>
      ];
    },
  },
});
