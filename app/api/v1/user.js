const Router = require('koa-router')
const { PositiveIntegerValidator } = require('../../validators/validator')

const router = new Router()

router.post('/v1/:id/test', (ctx, next) => {
  const v = new PositiveIntegerValidator().validate(ctx)
  // 如果校验器通过了, 可以利用校验器获取参数,
  // 分别用path,query,head,body代表路径,查询,head和body中的参数
  // 例如path.id代表获取路径中的id参数
  // validator会自动进行转型, 如果不需要转型则第2个参数传false
  // 也能获取嵌套层级, 例如'body.a.b'
  const id = v.get('path.id', false)

  ctx.body = { key: '获取参数成功' }
})

module.exports = router
