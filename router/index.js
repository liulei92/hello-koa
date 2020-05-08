const Router = require('koa-router')
const List = require('./list')
const Article = require('./article')
const Form = require('./form')

const router = new Router()

router.use('/list', List.routes(), List.allowedMethods())
router.use('/article', Article.routes(), Article.allowedMethods())
router.use('/form', Form.routes(), Form.allowedMethods())

router.get('/404', async(ctx, next) => {
  ctx.response.body = '<h1>404, not found!</h1>'
})
router.get('/:route?', async(ctx, next) => {
  const { route } = ctx.params
  if (route === undefined || route === '') {
    // ctx.response.body = '<h1>Hello Koa2!</h1>'
    // 渲染 index.ejs,此处和koa-static开启静态服务器 有点冲突,开启静态服务器后 会默认走静态资源
    await ctx.render('index', {
      title: '首页',
      projectName: 'hello-koa',
      arr: [1, 2, 3]
    })
  } else {
    ctx.response.redirect('/404') // 重定向
  }
})

module.exports = router
