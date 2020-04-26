module.exports = {
  // 如果prod则是生产环境, 如果是dev则是开发环境
  enviroment: 'dev',
  database: {
    dbName: 'filemsg',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'itor',
  },
  security: {
    // 生成令牌所需的私有key
    secretKey: 'asdc123dad',
    // 令牌的过期时间, 以秒为单位, 这里用1个小时
    expiresIn: 60 * 60,
  },
}
