const Koa = require('koa')
const Router = require('koa-router')
const requireDirectory = require('require-directory')

const app = new Koa()

// requireDirectory的第3个参数传入一个对象
// 对象的visit属性可以传入一个回调函数,
// 就是对每个模块进行导入成功后的操作
// 需要确保路由模块都是采用default形式进行导出, 即module.exports = router
requireDirectory(module, './api', {
  visit: (obj) => {
    // 如果是router对象,则在app上进行注册
    if (obj instanceof Router) {
      app.use(obj.routes())
    }
  },
})

app.listen(3000)
console.log('Server Start in port 3000!')
