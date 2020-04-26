const { LinValidator, Rule } = require('../../core/lin-validator')
class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [new Rule('isInt', '需要正整数', { min: 1 })]
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super()
    this.email = [new Rule('isEmail', '不符合email规范')]
    this.password1 = [
      new Rule('isLength', '密码至少6个字符, 最多32个', { min: 6, max: 32 }),
      new Rule(
        'matches',
        '密码不符合规范',
        '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
      ),
    ]
    // 由于校验规则与pwd1相同,直接复制
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', '昵称至少4个字符, 最多32个', { min: 4, max: 32 }),
    ]
  }

  // 自定义校验规则, 函数必须以validate开头
  // 判断两个密码是否相同
  validatePassword(vals) {
    const pw1 = vals.body.password1
    const pw2 = vals.body.password2
    if (pw1 !== pw2) {
      // 抛出普通异常, 由LinValidator来进行处理
      throw new Error('两个密码必须相同')
    }
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
}
