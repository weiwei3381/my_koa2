// 判断val是否存在各类Type中
function isThisType(val) {
  for (let key in this) {
    if (this[key] === val) {
      return true
    }
  }
  return false
}
// 定义登录类型
// 其中增加isThisType的判定,
// 例如用户传100, 通过这个方法即可判断是否为可用值
const LoginType = {
  USER_MINI_PROGRAM: 100,
  USER_EMAIL: 101,
  USER_MOBILE: 102,
  ADMIN_EMAIL: 200,
  isThisType,
}

module.exports = {
  LoginType,
}
