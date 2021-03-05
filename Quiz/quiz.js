"use strict";
function maxNum(arr, k) {
    if (k > arr.length)
        return -1;
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
function reverseString(s) {
    var bracketIndex = [];
    for (var i = 0; i < s.length; i++) {
        if (s.charAt(i) === '(')
            bracketIndex.push(i);
    }
    for (var j = bracketIndex.length - 1; j >= 0; j--) {
        var indexAt = bracketIndex[j];
        var textAcc = [];
        var endRight = 0;
        var startLeft = 0;
        for (var k = indexAt; k <= s.length; k++) {
            var char = s.charAt(k + 1);
            if (char === ')') {
                endRight = k + 2;
                break;
            }
            else
                textAcc.push(char);
        }
        var swap = [];
        for (var k = textAcc.length - 1; k >= 0; k--)
            swap.push(textAcc[k]);
        textAcc = swap;
        for (var k = indexAt; k >= 0; k--) {
            var char = s.charAt(k - 1);
            if (char === ')' || char === '(') {
                startLeft = k;
                break;
            }
            else
                textAcc.unshift(char);
        }
        var fncText = textAcc.join('');
        s = s.slice(0, startLeft) + fncText + s.slice(endRight, s.length);
    }
    return s;
}
