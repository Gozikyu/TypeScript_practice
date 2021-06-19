// Weekdayで定義されているすべての型に対してcaseが書かれていないので、戻り値がundefinedである可能性があるが、戻り値のDayにはundefinedが設定されていないことを教えてくれている。
// 網羅チェックをしてくれている。

// type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
// type Day = Weekday | "Sat" | "Sun";

// function getNextDay(w: Weekday): Day {
//   switch (w) {
//     case "Mon":
//       return "Tue";
//   }
// }

// p150　参考にしたサイト https://zenn.dev/luvmini511/articles/d89b3ad241e544
// タプル型で定義下Color1はinterfaceで定義したcolor2と同じ。
type Colors1 = ["white", "red", "black", "purple"];

interface Colors2 {
  length: 4;
  0: "white";
  1: "red";
  2: "black";
  3: "purple";
}

// 配列Tにはnumeric index signature （Color2でいう0,1,2,3）がある。そのためT[number]はのnumberは配列のキーを表しT[number]は配列の値を表している。
type ElementType<T> = T extends unknown[] ? T[number] : T;
type A = ElementType<string | number[]>;

// 練習問題
// 1. 次のそれぞれの型のペアについて、最初の型が2番目の型に割り当て可能かどうかを、その理由も添えて答えてください。サブタイプと変性の観点からこれらについて考え、もし確信を持って答えられなければ、章の初めのほうのルールを参照してください（それでも確信が持てなければ、コードエディターに入力してチェックしてください）。

// a. 1とnumber
// 割り当て可 正解

// b. numberと1
// 割り当て不可　正解

// c. stringとnumber|string
// 割り当て可　正解

// d. booleanとnumber
// 割り当て不可　正解

// e. number[]と(number|string)[]
// 割り当て可　正解

// f. (number|string)[]とnumber[]
// 割り当て不可　正解

// g. {a:true}と{a:bolean}
// 割り当て可　正解

// h. {a:{b:[string]}}と{a:{b:[number|string]}}
// 割り当て可　正解

// i. (a:number)=>stringと(b:number):string
// 割り当て可　正解

// j. (a:number)=>stringと(a:string)=>string
// 割り当て不可　正解

// k. (a:number|string)=>stringと(a:string)=>string
// 割り当て不可　不正解　正解は割り当て可

// テキスp125参照
/* 割り当て可能です。関数が別の関数に割り当て可能であるためには、「そのそれぞれのパラメーター >: 別の関数のパラメーター」および「その戻り値の型 <: 別の関数の戻り値の型」でなければなりません。number | stringはstringのスーパータイプであり、「string <: string」なので、この関数型は割り当て可能です。 */

// l.（列挙型 enum E {X = 'X'} で定義されている）E.X と（列挙型 enum F {X = 'X'} で定義されている）F.X
// 割り当て可　不正解　正解は割り当て不可

/* 割り当て可能ではありません。列挙型のメンバーが別の列挙型のメンバーに割り当て可能であるためには、同じ列挙型に由来するものでなければなりません。どちらのメンバーもXという名前であり、同じ文字列値'X'を持っていますが、それらは異なる列挙型について定義されているので、それらを互いに割り当てることはできません。 */

// 2. type O = {a: {b: {c: string}}} というオブジェクト型がある場合、keyof Oの型は何になるでしょうか？ O['a']['b']については、どうでしょうか？
type O = { a: { b: { c: string } } };
type test = keyof O; // 'a'
type test2 = keyof O["a"]["b"]; // 'c'

// 3. TかUのどちらかに含まれる（ただし両方には含まれない）型を計算するExclusive<T, U>型を記述してください。たとえば、Exclusive<1 | 2 | 3, 2 | 3 | 4>は、1 | 4になります。Exclusive<1 | 2, 2 | 4>を型チェッカーがどのように評価するかを、ステップごとに書き出してください。
type Exclusive<T, U> = Exclude<T, U> | Exclude<U, T>;

type test3 = Exclusive<1 | 2 | 3, 2 | 3 | 4>; // 1|4

// 4. 明確な割り当てアサーションを使わないように、（「6.6.3 明確な割り当てアサーション」の）例を書き直してください。
let globalCache = {
  get(key: string) {
    return "user";
  },
};

let userId = fetchUser();
userId.toUpperCase();

function fetchUser() {
  return globalCache.get("userId");
}

console.log(userId);

// ↑回答？？　globalCache.getの返り値は固定なので引数定義している意味ある？
