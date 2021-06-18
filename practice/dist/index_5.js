"use strict";
// 1. クラスとインターフェースの違いは何でしょうか？
/* クラスは、実装、初期化されたクラスフィールド、アクセス修飾子を持つことができます。また、クラスはJavaScriptコードを生成するので、実行時のinstanceofのチェックもサポートしています。クラスは、型と値の両方を定義します。インターフェースは型だけを定義し、JavaScriptコードはいっさい生成せず、型レベルのメンバーだけを含むことができ、アクセス修飾子を含むことはできません。 */
// 2. クラスのコンストラクターをprivateと指定すると、そのクラスをインスタンス化したり拡張したりできないという意味になります。代わりにprotectedと指定すると、何が起こるでしょうか？ コードエディターでいろいろと試してみてください。
class A {
  constructor() {}
}
class B extends A {}
class BalletFlat {
  constructor() {
    this.purpose = "dancing";
  }
}
class Boot {
  constructor() {
    this.purpose = "woodcutting";
  }
}
class Sneaker {
  constructor() {
    this.purpose = "walking";
  }
}
let Shoe = {
  create(type) {
    switch (type) {
      case "dancing":
        console.log("dancing");
        return new BalletFlat();
      case "woodcutting":
        return new Boot();
      case "walking":
        return new Sneaker();
    }
  },
};

console.log(typeof Shoe.create("dancing"));
//# sourceMappingURL=index_5.js.map
