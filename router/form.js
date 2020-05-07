const Router = require('koa-router') // 注意require('koa-router')返回的是函数:
const form = new Router() // /from 和 /from/get?id=1&name=ads 和 /from/post/1/ads

form.get('/', async (ctx, next) => {
  ctx.set('Content-Type', 'text/html;charset=utf8')
  ctx.response.body = `
    <div>
      <h4>Post</h4>
      <form action="/form/post" method="post">
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="submit" >
      </form>
      <h4>Get</h4>
      <form action="/form/get" method="get">
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="submit" >
      </form>
    </div>
  `
})

// post 传参
form.post('/post', async (ctx, next) => {
  ctx.response.body = ctx.request.body
})

// get 传参
form.get('/get', async (ctx, next) => {
  ctx.response.body = ctx.query
})

module.exports = form