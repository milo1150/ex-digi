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
    }
    return s;
}
// reverseString('foo(bar)');
reverseString('a(foo(bar)b(noey)c)');
