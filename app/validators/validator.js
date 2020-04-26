const { LinValidator, Rule } = require('../../core/lin-validator')
class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    // this.id值表示校验的是id参数,
    // 由于是数组, 所以可以定义多个校验规则, 它们是"且"关系
    this.id = [new Rule('isInt', '需要正整数', { min: 1 })]
  }
}

module.exports = {
  PositiveIntegerValidator,
}
