const Router = require('koa-router') // 注意require('koa-router')返回的是函数:
const form = new Router() // /from 和 /from/get?id=1&name=ads 和 /from/post/1/ads
const FormController = require('../controller/form')

form.get('/', FormController.page)

// post 传参
form.post('/post', FormController.post)

// get 传参
form.get('/get', FormController.get)

// 读取cookie
form.get('/getCookie', FormController.getCookie)

module.exports = form
