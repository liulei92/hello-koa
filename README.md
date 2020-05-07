
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
    await next();
    ...
});

