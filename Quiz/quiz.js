"use strict";
function maxNum(arr, k) {
    var max = 0;
    for (var i = 0; i < arr.length - k + 1; i++) {
        var s = 0;
        for (var j = 0; j < k; j++) {
            s += arr[i + j];
        }
        if (!max)
            max = s;
        else if (s > max)
            max = s;
    }
    return max;
}
// maxNum([1, 12, 3, 4, 5], 2)
function reverseString(s) {
    var bracketIndex = [];
    for (var i = 0; i < s.length; i++) {
        if (s.charAt(i) === '(')
            bracketIndex.push(i);
    }
    console.log(bracketIndex);
    for (var j = bracketIndex.length - 1; j >= 0; j--) {
        var indexAt = bracketIndex[j];
        console.log('check at index:', indexAt);
        var textAcc = [];
        // Right
        for (var k = indexAt; k <= s.length; k++) {
            var char = s.charAt(k);
            textAcc.push(char);
            if (char === ')')
                break;
        }
        console.log('Right:', textAcc);
        // Left
        for (var k = indexAt; k >= 0; k--) {
            var char = s.charAt(k - 1);
            if (char === ')' || char === '(')
                break;
            textAcc.unshift(char);
        }
        console.log('Left:', textAcc);
        var fncText = textAcc.join('');
        console.log(fncText);
    }
    return s;
}
// reverseString('foo(bar)');
reverseString('a(foo(bar)b(noey)c)');
