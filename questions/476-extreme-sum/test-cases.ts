import { Equal, Expect } from "../../utils";

/**
数字相加算法
function addStrings(num1, num2) {
    const len = Math.max(num1.length, num2.length);
    const arr = []

    for (let i = 0; i < len; i++) {
        const v = (+num1[num1.length - i - 1] || 0) + (+num2[num2.length - i -1] || 0) + (arr[i] || 0)
        if (v < 10) {
            arr[i] = v
        }
        else {
            arr[i] = v - 10
            arr[i+1] = 1
        }
    }

    return arr.reverse().join('')
};
 * */

type cases = [
  Expect<Equal<Sum<2, 3>, "5">>,
  Expect<Equal<Sum<"13", "21">, "34">>,
  Expect<Equal<Sum<"328", 7>, "335">>,
  Expect<Equal<Sum<1_000_000_000_000n, "123">, "1000000000123">>,
  Expect<Equal<Sum<9999, 1>, "10000">>,
  Expect<Equal<Sum<4325234, "39532">, "4364766">>,
  Expect<Equal<Sum<728, 0>, "728">>,
  Expect<Equal<Sum<"0", 213>, "213">>,
  Expect<Equal<Sum<0, "0">, "0">>
];
