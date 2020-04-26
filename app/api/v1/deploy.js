const Router = require('koa-router')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
  prefix: '/v1/deploy',
})

// Auth
router.get('/getSetting', new Auth().m, async (ctx) => {
  ctx.body = ctx.auth
})

module.exports = router
