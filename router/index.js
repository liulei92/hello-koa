const Router = require('koa-router')
const List = require('./list')
const Article = require('./article')
const Form = require('./form')

const router = new Router()

router.use('/list', List.routes(), List.allowedMethods())
router.use('/article', Article.routes(), Article.allowedMethods())
router.use('/form', Form.routes(), Form.allowedMethods())

router.get('/:db', async (ctx, next) => {
  ctx.response.body = '<h1>Hello Koa2!</h1>';
})

module.exports = router