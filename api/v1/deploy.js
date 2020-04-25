const Router = require('koa-router')

const router = new Router() // 实例化router

// 编写路由
router.get('/api/v1/getSetting', (ctx, next) => {
  ctx.body = { key: '获取配置' }
})
// 导出路由
module.exports = router
