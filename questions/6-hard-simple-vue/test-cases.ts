import { Equal, Expect } from "../../utils";

type Computed<T> = {
  [key in keyof T]: T[key] extends (...args: any) => any
    ? ReturnType<T[key]>
    : T[key];
};

export declare function SimpleVue<D, C, M>(
  options: {
    data: () => D;
    computed?: C & ThisType<D>;
    methods?: M & ThisType<D & Computed<C> & M>;
  } & ThisType<null>
): any;

SimpleVue({
  data() {
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
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any;
    },
  },
});
