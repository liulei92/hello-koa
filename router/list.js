const Router = require('koa-router') // 注意require('koa-router')返回的是函数:
const list = new Router() // /list 和 /list/todo

// 嵌套路由
list.get('/', async (ctx, next) => {
  ctx.response.body = 'list/'
}).get('/todo', async (ctx, next) => {
  ctx.response.body = 'list/todo'
})

module.exports = list
