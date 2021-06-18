"use strict";
// 次の値に対しTypeScriptはどのような型を推測するか？
let a3 = 1032;
let b3 = "apples and oranges";
const c3 = "pineapples";
let d3 = [true, true, false];
let e3 = { type: "ficus" };
let f3 = [1, false];
const g3 = [3];
let h3 = null;
// 2. 次のそれぞれのものは、なぜエラーをスローするのでしょうか？
// let i:3=3
// i=4
// iの型はリテラル型の3であるため、リテラル型の4を割り当てられない。
// let j = [1, 2, 3];
// j.push(4);
// j.push("5");
// jの型をTypeScriptはnumber[]と推測しセットしたため、リテラル型の'5'を割り当てられない。
// let k:never=4
// neverはボトム型です。つまり、neverを他のすべての型に割り当てることはできますが、neverにはどの型も割り当てることができません。????
// let l :unknown=4
// let m = l*2
// nknownは、実行時に何にでもなりうる値を表します。あなたがしていることが安全であることをTypeScriptに示すには、まず、unknown型の値が、実際にはより具体的なサブタイプを持っていることをTypeScriptに示す必要があります。これを行うには、typeof、instanceof、または他の型クエリーや型ガードを使って値を絞り込みます。
//# sourceMappingURL=index_3.js.map