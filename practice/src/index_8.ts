import { resolve } from "path/posix";
import { callbackify } from "util";

// 1. 汎用的なpromisify関数を実装してください。promisifyは、1つの引数と1つのコールバックを取る任意の関数をパラメーターとして取り、それを、プロミスを返す関数の中にラップします。
function promisify<T, A>(
  cb: (arg: A, f: (error: unknown, result: T | null) => void) => void
): (arg: A) => Promise<T> {
  return (arg: A) =>
    new Promise<T>((resolve, reject) => {
      cb(arg, (error, result) => {
        if (error) {
          return reject(error);
        }
        if (result == null) {
          return reject(error);
        }
        return resolve(result);
      });
    });
}

import { readFile } from "fs";

let readFilePromise = promisify(readFile);
readFilePromise("./myfile.ts")
  .then((result) => console.log("success reading file", result.toString()))
  .catch((error) => console.error("error reading file", error));

// 8.6.1 Web Workerは飛ばしたため、演習問題も今はスルー。必要になったら学び直す。
// 2. 「8.6.1.1 型安全なプロトコル」では、型安全な行列演算のためのプロトコルの半分を作成しました。これをメインスレッドで実行すると仮定して、Web Workerスレッドで実行する残りの半分を実装してください。

// 3. （「8.6.1 Web Worker（ブラウザー）」のように）マップ型を使って、Node.jsの`child_process`用の型安全なメッセージパッシングプロトコルを実装してください。
