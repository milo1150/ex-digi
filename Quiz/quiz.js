"use strict";
/**
|--------------------------------------------------
| maxNum
|--------------------------------------------------
*/
function maxNum(arr, k) {
    if (k > arr.length)
        return -1;
    let max = 0;
    for (let i = 0; i < arr.length - k + 1; i++) {
        let s = 0;
        for (let j = 0; j < k; j++) {
            s += arr[i + j];
        }
        if (!max)
            max = s;
        else if (s > max)
            max = s;
    }
    //   console.log(max)
    return max;
}
// maxNum([1, 4, -1, 2, 3], 3);
// maxNum([1, 12, 3, 4, 5], 2)
// maxNum([1, 12, 3, 4, 5, 9], 5);
/**
|--------------------------------------------------
| reverseString
|--------------------------------------------------
*/
function reverseString(s) {
    const bracketIndex = [];
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) === '(')
            bracketIndex.push(i); // find indexOf '('
    }
    /**
     * Use each '(' syntax for starting point
     * start loop from last index of bracketIndex to first index
     */
    for (let j = bracketIndex.length - 1; j >= 0; j--) {
        const indexAt = bracketIndex[j];
        let textAcc = []; // text accumulate
        let endRight = 0; // slice range
        let startLeft = 0; // slice range
        /* toRight [if found ')' -> break] */
        for (let k = indexAt; k <= s.length; k++) {
            let char = s.charAt(k + 1);
            if (char === ')') {
                endRight = k + 2;
                break;
            }
            else
                textAcc.push(char);
        }
        // Swap right text
        const swap = [];
        for (let k = textAcc.length - 1; k >= 0; k--)
            swap.push(textAcc[k]);
        textAcc = swap; // raplace with swap array
        /* toLeft [if found any bracket -> break]*/
        for (let k = indexAt; k >= 0; k--) {
            let char = s.charAt(k - 1);
            if (char === ')' || char === '(') {
                startLeft = k;
                break;
            }
            else
                textAcc.unshift(char);
        }
        let fncText = textAcc.join('');
        s = s.slice(0, startLeft) + fncText + s.slice(endRight, s.length); // update new string
    }
    return s;
}
// reverseString('foo(bar)');
// reverseString('a(foo(bar)b(noey)c)');
/**
|--------------------------------------------------
| reverseString Debug
|--------------------------------------------------
*/
// function reverseString(s: string): string {
//   const bracketIndex: number[] = [];
//   for (let i = 0; i < s.length; i++) {
//     if (s.charAt(i) === '(') bracketIndex.push(i);
//   }
//   console.log(bracketIndex);
//   for (let j = bracketIndex.length - 1; j >= 0; j--) {
//     const indexAt: number = bracketIndex[j];
//     console.log('check at index:', indexAt);
//     let textAcc: string[] = [];
//     let endRight: number = 0;
//     let startLeft: number = 0;
//     /* toRight */
//     for (let k = indexAt; k <= s.length; k++) {
//       let char: string = s.charAt(k + 1);
//       if (char === ')') {
//         endRight = k + 2;
//         break;
//       } else textAcc.push(char);
//     }
//     // Swap right text
//     const swap: string[] = [];
//     for (let k = textAcc.length - 1; k >= 0; k--) swap.push(textAcc[k]);
//     textAcc = swap; // raplace with swap array
//     console.log('Right:', textAcc);
//     /* toLeft */
//     for (let k = indexAt; k >= 0; k--) {
//       let char: string = s.charAt(k - 1);
//       if (char === ')' || char === '(') {
//         startLeft = k;
//         break;
//       } else textAcc.unshift(char);
//     }
//     console.log('Left:', textAcc);
//     let fncText: string = textAcc.join('');
//     console.log('fncText:', fncText);
//     console.log('endRight:', endRight, 'startLeft:', startLeft);
//     console.log(s.slice(0, startLeft), s.slice(endRight, s.length));
//     s = s.slice(0, startLeft) + fncText + s.slice(endRight, s.length); // update string
//     console.log('NEW TEXT:', s);
//   }
//   return s;
// }
//  reverseString('foo(bar)');
//  reverseString('a(foo(bar)b(noey)c)');
