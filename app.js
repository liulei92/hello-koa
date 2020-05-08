/* eslint-disable no-unused-vars */
const path = require('path')
const Http = require('http')
const Axios = require('axios')
const Koa = require('koa') // 导入 Koa
const bodyparser = require('koa-bodyparser') // 解析请求体的中间件
const convert = require('koa-convert')
const logger = require('koa-logger')
const opener = require('opener')
const views = require('koa-views')
const server = require('koa-static')
// const Router = require('koa-router') // 注意require('koa-router')返回的是函数:

const router = require('./router')

// 创建一个对象
const app = new Koa()

const _use = app.use
app.use = x => _use.call(app, convert(x))

app.use(bodyparser()) // 解析请求体的中间件
// logger
app.use(logger())

// 设置默认模板为ejs
app.use(views(path.resolve(__dirname, './views'), {
  extension: 'ejs'
}))

// 启动一个静态服务
app.use(server(path.resolve(__dirname, './static')))

// 中间件1
app.use(async(ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`) // 打印URL
  await next() // 调用下一个middleware
})

// 中间件2
app.use(async(ctx, next) => {
  const start = new Date().getTime()
  await next()
  const ms = new Date().getTime() - start
  console.log(`Time: ${ms}ms`) // 打印耗费时间
})

// // 判断 路由
// app.use(async (ctx, next) => {
//   console.log(ctx.path);
//   if (ctx.request.path === '/ip') {
//     const ipInfo = await Axios.get('http://pv.sohu.com/cityjson');
//     ctx.response.body = ipInfo.data;
//   } else {
//     await next();
//   }
// });

// // 对于仁和请求,app将调用该异步函数处理请求
// app.use(async (ctx, next) => {
//   await next();
//   // 设置response的Content-Type:
//   ctx.response.type = 'text/html';
//   // 设置response的内容:
//   ctx.response.body = `
//     <h1>Hello, koa2!</h1>
//   `;
// });

// const hello = new Router(); // /hello/asdasd
// 使用 koa-router --------
// params传参
// hello.get('/:name', async (ctx, next) => {
//   console.log(ctx.params)
//   if (ctx.params.name === '') {
//     await next()
//   } else {
//     ctx.response.body = ctx.params.name
//   }
// });

// const list = new Router(); // /list 和 /list/todo
// // 嵌套路由
// list.get('/', async (ctx, next) => {
//   ctx.response.body = 'list/';
// }).get('/todo', async (ctx, next) => {
//   ctx.response.body = 'list/todo';
// })

// 装载所有路由
// const router = new Router();

// router.use('/list', ListRouter.routes(), ListRouter.allowedMethods());
// router.use('/article', ArticleRouter.routes(), ArticleRouter.allowedMethods());
// router.use('/form', FormRouter.routes(), FormRouter.allowedMethods());

// router.get('/', async (ctx, next) => {
//   ctx.response.body = '<h1>Hello Koa2!</h1>';
// });

// add router middleware:
// app.use(hello.routes());
// 当请求数据的方法与设置的方法不一致会报错
// app.use(hello.allowedMethods());
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

// 使用 koa-router --------

// app.listen(3003);
// console.log('app started at port 3003...');

Http.createServer(app.callback()).listen(3003, () => {
  console.log('http server start at port 3003!')
  // opener("http://127.0.0.1:3003");
})

