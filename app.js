const Http = require('http');
const Axios = require('axios');
const Koa = require('koa'); // 导入 Koa
const bodyparser = require('koa-bodyparser');
const convert = require('koa-convert');
const koaStatic = require('koa-static');
const logger = require('koa-logger');
const opener = require('opener');
const router = require('koa-router')(); // 注意require('koa-router')返回的是函数:

// 创建一个对象
const app = new Koa();

app.convert = x => app.use.call(app, convert(x));

app.convert(bodyparser());
//logger
app.convert(logger());


// 中间件1
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
  await next(); // 调用下一个middleware
});

// 中间件2
app.use(async (ctx, next) => {
  const start = new Date().getTime();
  await next();
  const ms = new Date().getTime() - start;
  console.log(`Time: ${ms}ms`); // 打印耗费时间
});

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


// 使用 koa-router --------
router.get('/hello/:name', async (ctx, next) => {
  if (ctx.params.name === '') {
    await next()
  } else {
    ctx.response.body = ctx.params.name
  }
})
router.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>Index</h1>';
});
// add router middleware:
app.use(router.routes());

// 未完待续 
// https://www.liaoxuefeng.com/wiki/1022910821149312/1099849448318080
// 处理url
// 使用 koa-router --------

// app.listen(3003);
// console.log('app started at port 3003...');

Http.createServer(app.callback()).listen(3003, ()=>{
  console.log('http server start at port 3003!')
  // opener("http://127.0.0.1:3003");
});

