function maxNum(arr: number[], k: number): number {
    let max: number = 0;
    for (let i = 0; i < arr.length - k + 1; i++) {
        let s: number = 0;
        for (let j = 0; j < k; j++) {
            s += arr[i + j];
        }
        if (!max) max = s;
        else if (s > max) max = s;
    }
    return max;
}
// maxNum([1, 12, 3, 4, 5], 2)

function reverseString(s: string): string {
    const bracketIndex: number[] = [];
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) === '(') bracketIndex.push(i)
    }
    console.log(bracketIndex)
    for (let j = bracketIndex.length - 1; j >= 0; j--) {
        const indexAt: number = bracketIndex[j];
        console.log('check at index:', indexAt)
        const textAcc: string[] = [];
        // Right
        for (let k = indexAt; k <= s.length; k++) {
            let char: string = s.charAt(k)
            textAcc.push(char);
            if (char === ')') break;
        }
        console.log('Right:', textAcc)
        // Left
        for (let k = indexAt; k >= 0; k--) {
            let char: string = s.charAt(k - 1)
            if (char === ')' || char === '(') break;
            textAcc.unshift(char);
        }
        console.log('Left:', textAcc)
        const fncText: string = textAcc.join('')
        console.log(fncText)
    }
    return s;
}
// reverseString('foo(bar)');
reverseString('a(foo(bar)b(noey)c)');
