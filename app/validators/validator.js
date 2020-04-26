const { LinValidator, Rule } = require('../../core/lin-validator')
const { User } = require('../models/user')
const { LoginType } = require('../lib/enum')

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

class TokenValidator extends LinValidator {
  constructor() {
    super()
    // 账号传入校验
    this.account = [new Rule('isLength', '不符合账号规则', { min: 4, max: 32 })]
    // 密码是可选校验
    // isOptional表示可选参数, 这是lin-validator自带的
    // 如果传入了, 则需要保证`isLength`规定的校验规则
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '至少6个字符', { min: 6, max: 128 }),
    ]
  }

  // 自定义验证器验证type情况, 需要保证在LoginType枚举中
  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error('type是必填项')
    }
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('type参数不合法')
    }
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
}
