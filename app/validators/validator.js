const { LinValidator, Rule } = require('../../core/lin-validator')
// 导入用户模块
const { User } = require('../models/user')

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
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', '昵称至少4个字符, 最多32个', { min: 4, max: 32 }),
    ]
  }

  // 判断两个密码是否相同
  validatePassword(vals) {
    const pw1 = vals.body.password1
    const pw2 = vals.body.password2
    if (pw1 !== pw2) {
      throw new Error('两个密码必须相同')
    }
  }
  // 校验email, 不能与数据库中的值重复
  async validateEmail(vals) {
    const email = vals.body.email
    // 找到email相同的用户
    const user = await User.findOne({
      where: {
        email: email,
      },
    })
    if (user) {
      throw new Error('email已经存在')
    }
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
}
