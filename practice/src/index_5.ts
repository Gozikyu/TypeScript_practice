// 1. クラスとインターフェースの違いは何でしょうか？
/* クラスは、実装、初期化されたクラスフィールド、アクセス修飾子を持つことができます。また、クラスはJavaScriptコードを生成するので、実行時のinstanceofのチェックもサポートしています。クラスは、型と値の両方を定義します。インターフェースは型だけを定義し、JavaScriptコードはいっさい生成せず、型レベルのメンバーだけを含むことができ、アクセス修飾子を含むことはできません。 */

import { RequestListener } from "http";

// 2. クラスのコンストラクターをprivateと指定すると、そのクラスをインスタンス化したり拡張したりできないという意味になります。代わりにprotectedと指定すると、何が起こるでしょうか？ コードエディターでいろいろと試してみてください。

class A {
  protected constructor() {}
}

class B extends A {}
// new A();
// new B();

/* protectedコンストラクターを持つクラスは、privateコンストラクターを持つクラスと違って、拡張することができます。ただし、どちらのクラスも、newすることはできません。 */

// 3. 「5.11.1 ファクトリーパターン」で作成した実装を拡張して、抽象化を多少犠牲にしてでも、より安全にしてください。つまり、Shoe.create('boot')を呼び出すとBootが返され、Shoe.create('balletFlat')を呼び出すとBalletFlatが返されることを（どちらもShoeが返されるのではなく）、利用者がコンパイル時にわかるように、実装を書き換えてください。ヒント：「4.1.9 オーバーロードされた関数の型」を思い出してください。

type Shoe = {
  purpose: string;
};

class BalletFlat implements Shoe {
  purpose = "balletFlat";
}

class Boot implements Shoe {
  purpose = "woodcutting";
}

class Sneaker implements Shoe {
  purpose = "walking";
}

type ShoeCreate = {
  create(type: "balletFlat"): BalletFlat;
  create(type: "boot"): Boot;
  create(type: "sneaker"): Sneaker;
};

let Shoe: ShoeCreate = {
  create(type: "balletFlat" | "boot" | "sneaker"): Shoe {
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
  protected data: object | null = null;
  protected method: "post" | "get" | null = null;
  protected url: string | null = null;

  setMethod(method: "get" | "post"): RequestBuilderWithMethod {
    this.method = method;
    return new RequestBuilderWithMethod().setMethod(method).setData(this.data);
  }

  setData(data: object | null): this {
    this.data = data;
    return this;
  }
}

class RequestBuilderWithMethod extends RequestBuilder {
  setMethod(method: "get" | "post" | null): this {
    this.method = method;
    return this;
  }

  setUrl(url: string): RequestBuilderWithMethodAndUrl {
    this.url = url;
    return new RequestBuilderWithMethodAndUrl()
      .setMethod(this.method)
      .setUrl(url);
  }
}

class RequestBuilderWithMethodAndUrl extends RequestBuilderWithMethod {
  setUrl(url: string): this {
    this.url = url;
    return this;
  }

  send() {
    console.log("send");
  }
}

new RequestBuilder().setMethod("get").setData({}).setUrl("foo.com").send();

// 4b. ［より難問］ユーザーがメソッドを任意の順序で呼び出せるようにしたまま、これを保証したいとしたら、設計をどのように変更すればよいでしょうか？
