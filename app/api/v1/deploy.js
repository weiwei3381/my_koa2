const Router = require('koa-router')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
  prefix: '/v1/deploy',
})

// Auth中可以传入api的权限等级, 等级越高, 所需的权限就越高
router.get('/getSetting', new Auth(12).m, async (ctx) => {
  ctx.body = ctx.auth
})

module.exports = router
