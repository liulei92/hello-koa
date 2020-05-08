const Koa = require('koa')
// const proxy = require('koa-proxy') old
const proxy = require('koa-proxies')
const HttpsProxyAgent = require('https-proxy-agent')

var app = new Koa()
// gvc 3200
// app.use(require('koa-static')('../GVC3200/service/webgui/gvc3200'))

// gvc3210
// app.use(require('koa-static')('../GVC3210/service/webgui/gvc3200'))

// gwn7600
app.use(require('koa-static')('../VueProgrames/gwnxx-new-webtools/WebTools/GWN_NEW/dist'))

// app.use(proxy({
//   host: 'https://192.168.124.151',
//   // match: '/manager'
//   // match: /(\/manager|\/upload)/
//   match: /(\/cgi-bin|\/ubus|\/corefiles)/
// }))

app.use(proxy('/cgi-bin', {
  target: 'https://192.168.124.140/cgi-bin',
  changeOrigin: true,
  agent: new HttpsProxyAgent('https://192.168.124.140:88'),
  // rewrite: path => path.replace(/^\/octocat(\/|\/\w+)?$/, '/vagusx'),
  logs: true
}))

app.use(proxy('/ubus', {
  target: 'https://192.168.124.140/ubus',
  changeOrigin: true,
  agent: new HttpsProxyAgent('https://192.168.124.140:88'),
  // rewrite: path => path.replace(/^\/octocat(\/|\/\w+)?$/, '/vagusx'),
  logs: true
}))

app.use(proxy('/corefiles', {
  target: 'https://192.168.124.140/corefiles',
  changeOrigin: true,
  agent: new HttpsProxyAgent('https://192.168.124.140:88'),
  // rewrite: path => path.replace(/^\/octocat(\/|\/\w+)?$/, '/vagusx'),
  logs: true
}))

app.listen(18890)
