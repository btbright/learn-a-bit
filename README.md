# Learn a bit
[![Build Status](https://travis-ci.org/btbright/learn-a-bit.svg?branch=master)](https://travis-ci.org/btbright/learn-a-bit)

This is a quiz app to drill simple bit manipulation operations to get an inuitive understanding of how they work. It was designed to work well on mobile devices so it can be used in spare moments.

## Resources
If you are unfamiliar with bitwise operations, you should read up on them some before getting started. Here are some good resources:

- [Bits Tutorial on CodeFights](https://app.codesignal.com/interview-practice/topics/bits/tutorial)
- [Bitwise Operators on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)
- [Bitwise Operators in C / C++](https://www.cprogramming.com/tutorial/bitwise_operators.html)

## Keyboard Shortcuts
n - new problem
r,c - clear answer
tab, alt-tab - cycle forward and backwards through answer slots
[nums] - input answer (hints are shown below answer options when they're not obvious)
enter - submit, continue after correct answer

## Details
Since this is designed for people new to bitwise operations, the operands are capped at 16 (2^4) to keep things simple. Also, the bitwise NOT (complement) operator uses a one's complement implementation instead of javascript's two's complement implementation since it is easier to understand. See [the bitwise operator MDN article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Signed_32-bit_integers) for more info on javascript's implementation.

## Possible enhancements
- track given problems to prevent repeats too soon
- show answer option
- increment difficulty
- link to explanations? inline?
- toggle base 2/10 in operands and answer to make more difficult
- difficulty controls / options

## License
MIT
