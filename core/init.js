const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  /**
   * 入口方法
   * @param {Koa} app
   */
  static initCore(app) {
    InitManager.app = app
    // 使用静态方法需要用`类名.方法()`进行调用
    InitManager.initLoadRouters()
    InitManager.loadConfig()
  }

  /**
   *  导入路由方法
   */
  static initLoadRouters() {
    // 使用绝对路径引用api, 这样无论怎么修改init.js文件位置都没关系,
    // 前提是api位置不能有变化
    const apiDir = `${process.cwd()}/app/api`
    requireDirectory(module, apiDir, {
      visit: whenLoadModule,
    })

    // 当加载路由模块后的方法
    function whenLoadModule(obj) {
      // 如果是router对象,则在app上进行注册
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }

  // 在全局变量中加载config
  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }
}

module.exports = InitManager
