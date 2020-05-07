const Router = require('koa-router') // 注意require('koa-router')返回的是函数:
const article = new Router() // /article/1/asd 和 /article/query?id=1&name=ads

// params 传参
article.get('/:id/:name', async (ctx, next) => {
  ctx.body = ctx.params.id +"-"+ ctx.params.name
})

// query传参
article.get('/query', async (ctx, next) => {
  ctx.response.body = ctx.query
})

module.exports = article
