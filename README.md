
### Koa2 框架

### Getting Start

```
> npm install 
> npm start
```
### 说明
#### koa的中间件方式 await+async
``` javascript
app.use(async (ctx, next) => {
    ...
    await next()
    ...
})
```
#### 转换函数
``` javascript
const convert = require('koa-convert')
const _use = app.use
app.use = x => _use.call(app, convert(x))
```
#### 默认模板 ejs
``` javascript
const views = require('koa-views')
app.use(views(path.resolve(__dirname, './views'), {
  extension: 'ejs'
}))
```
#### 静态服务器
``` javascript
const server = require('koa-static')
app.use(server(path.resolve(__dirname, './static')))

```

#### https的访问方式
> ssl证书免费申请：（腾讯云）https://console.qcloud.com/ssl
``` javascript
let options = {
    key: fs.readFileSync(__dirname+'/ssl/server.key'),
    cert: fs.readFileSync(__dirname+'/ssl/server.crt')
};
https.createServer(options, app.callback()).listen(443,()=>{
    console.log("https://127.0.0.1:443 is runing");
    opener("https://127.0.0.1:443");
});
```

