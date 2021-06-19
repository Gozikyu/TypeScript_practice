"use strict";
// 1. クラスとインターフェースの違いは何でしょうか？
/* クラスは、実装、初期化されたクラスフィールド、アクセス修飾子を持つことができます。また、クラスはJavaScriptコードを生成するので、実行時のinstanceofのチェックもサポートしています。クラスは、型と値の両方を定義します。インターフェースは型だけを定義し、JavaScriptコードはいっさい生成せず、型レベルのメンバーだけを含むことができ、アクセス修飾子を含むことはできません。 */
Object.defineProperty(exports, "__esModule", { value: true });
// 2. クラスのコンストラクターをprivateと指定すると、そのクラスをインスタンス化したり拡張したりできないという意味になります。代わりにprotectedと指定すると、何が起こるでしょうか？ コードエディターでいろいろと試してみてください。
class A {
    constructor() { }
}
class B extends A {
}
class BalletFlat {
    constructor() {
        this.purpose = "balletFlat";
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
            case "balletFlat":
                return new BalletFlat();
            case "boot":
                return new Boot();
            case "sneaker":
                return new Sneaker();
        }
    },
};
Shoe.create("balletFlat"); // BalletFlat
Shoe.create("boot"); // Boot
Shoe.create("sneaker"); // Sneaker
// 4. ［難問］練習として、型安全なビルダーパターンをどうしたら設計できるか考えてみてください。次のことを実現できるように、「5.11.2 ビルダーパターン」のビルダーパターンを拡張します。
// 4a. 少なくともURLとメソッドの設定が終わるまでは.sendを呼び出せないことをコンパイル時に保証します。メソッドを特定の順序で呼び出すことをユーザーに強制したら、これを保証することは容易になるでしょうか？（ヒント：thisの代わりに何を返せるでしょうか？）
class RequestBuilder {
    constructor() {
        this.data = null;
        this.method = null;
        this.url = null;
    }
    setMethod(method) {
        this.method = method;
        return new RequestBuilderWithMethod().setMethod(method).setData(this.data);
    }
    setData(data) {
        this.data = data;
        return this;
    }
}
class RequestBuilderWithMethod extends RequestBuilder {
    setMethod(method) {
        this.method = method;
        return this;
    }
    setUrl(url) {
        this.url = url;
        return new RequestBuilderWithMethodAndUrl()
            .setMethod(this.method)
            .setUrl(url);
    }
}
class RequestBuilderWithMethodAndUrl extends RequestBuilderWithMethod {
    setUrl(url) {
        this.url = url;
        return this;
    }
    send() {
        console.log("send");
    }
}
new RequestBuilder().setMethod("get").setData({}).setUrl("foo.com").send();
// 4b. ［より難問］ユーザーがメソッドを任意の順序で呼び出せるようにしたまま、これを保証したいとしたら、設計をどのように変更すればよいでしょうか？
//# sourceMappingURL=index_5.js.map