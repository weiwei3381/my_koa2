const Router = require('koa-router')
const { RegisterValidator } = require('../../validators/validator')

// 设定路由前缀, 这样写路由可以避免重复前面的地址
const router = new Router({
  prefix: '/v1/user',
})

// 注册, 不需要next, 所以没传
// 编写一个接口需要利用validator接收参数
router.post('/register', async (ctx) => {
  const v = new RegisterValidator().validate(ctx)
})

module.exports = router
