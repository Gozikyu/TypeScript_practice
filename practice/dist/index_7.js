"use strict";
// Option型　p171参照
// interface Option<T> {
//   flatMap<U>(f: (value: T) => None): None;
//   flatMap<U>(f: (value: T) => Option<U>): Option<U>;
//   getOrElse(value: T): T;
// }
class Some {
    constructor(value) {
        this.value = value;
    }
    flatMap(f) {
        return f(this.value);
    }
    getOrElse() {
        return this.value;
    }
}
class None {
    flatMap() {
        return this;
    }
    getOrElse(value) {
        return value;
    }
}
function listOfOptionsToOptionOfList(list) {
    let empty = {};
    let result = list
        .map((_) => _.getOrElse(empty))
        .filter((_) => _ !== empty);
    if (result.length) {
        return new Some(result);
    }
    return new None();
}
let api = new API();
let friendsUserNames = api
    .getLoggedInUserID() // ユーザーIDを取得
    .flatMap(api.getFriendIDs) // フレンドIDのリストを取得
    .flatMap((_) => listOfOptionsToOptionOfList(_.map(api.getUserName))); //フレンドIDをフレンドネームに変換
//# sourceMappingURL=index_7.js.map