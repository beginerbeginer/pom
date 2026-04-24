// 文字列プロパティではなく Symbol を使う理由:
// 文字列 "pomTag" は外部コードが偶然同名プロパティを持つと誤識別が起きる。
// Symbol はモジュール外から参照不能であり、意図しない衝突を原理的に排除できる。
export const POM_TAG = Symbol("pomTag");
