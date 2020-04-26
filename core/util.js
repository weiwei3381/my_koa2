const jwt = require('jsonwebtoken')
/***
 *
 */
const findMembers = function (instance, { prefix, specifiedType, filter }) {
  // 递归函数
  function _find(instance) {
    //基线条件（跳出递归）
    if (instance.__proto__ === null) return []

    let names = Reflect.ownKeys(instance)
    names = names.filter((name) => {
      // 过滤掉不满足条件的属性或方法名
      return _shouldKeep(name)
    })

    return [...names, ..._find(instance.__proto__)]
  }

  function _shouldKeep(value) {
    if (filter) {
      if (filter(value)) {
        return true
      }
    }
    if (prefix) if (value.startsWith(prefix)) return true
    if (specifiedType) if (instance[value] instanceof specifiedType) return true
  }

  return _find(instance)
}

// 颁发令牌
const generateToken = function (uid, scope) {
  // 从配置项中读取私有key和过期时间
  const secretKey = global.config.security.secretKey
  const expiresIn = global.config.security.expiresIn
  // 第1个参数放置我们需要令牌携带的内容,包括用户id和权限范围
  // 第2个参数传入私有key,
  // 第3个参数放置令牌的配置项, 这里传入了过期时间
  // 然后利用jwt进行签名生成令牌
  const token = jwt.sign({ uid, scope }, secretKey, { expiresIn })
  return token
}

module.exports = {
  findMembers,
  generateToken,
}
