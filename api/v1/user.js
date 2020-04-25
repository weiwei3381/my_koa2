const Router = require('koa-router')

const router = new Router() // 实例化router
// 编写路由
router.get('/api/v1/login', (ctx, next) => {
  ctx.body = { key: '用户登录失败' }
})
// 由于需要批量自动导入, 这里必须采用默认导出形式
module.exports = router
