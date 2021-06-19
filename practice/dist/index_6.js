"use strict";
// Weekdayで定義されているすべての型に対してcaseが書かれていないので、戻り値がundefinedである可能性があるが、戻り値のDayにはundefinedが設定されていないことを教えてくれている。
// 網羅チェックをしてくれている。
// 4. 明確な割り当てアサーションを使わないように、（「6.6.3 明確な割り当てアサーション」の）例を書き直してください。
let globalCache = {
    get(key) {
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
//# sourceMappingURL=index_6.js.map