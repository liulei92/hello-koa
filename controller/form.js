const form = {
  page: async(ctx, next) => {
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
  },
  // post 传参
  post: async(ctx, next) => {
    // ctx.response.body = ctx.request.body
    /** ctx.request.body为解析的post数据对象 */
    console.log(ctx.request.body)
    const { username, password } = ctx.request.body
    if (username === 'pingm' && password === '123456') {
      ctx.body = `Hello ${username}`
      // 调用 write
      form.writeCookie(ctx, {
        username,
        age: '9'
      })
    } else {
      ctx.body = '账号信息错误'
    }
  },
  // get 传参
  get: async(ctx, next) => {
    ctx.response.body = ctx.query
  },
  // 写cookie
  writeCookie: (ctx, params) => {
    const { username, age } = params
    ctx.cookies.set('username', username, {
      domain: '127.0.0.1', // 写入cookie所在的域名
      path: '/', // 写入cookie最大的路径
      maxAge: 10 * 1000, // Cookie最大有效时长
      httpOnly: false, // 是否只用于http请求中获取
      overwrite: false // 是否允许重写
    })
    ctx.cookies.set('age', age)
  },
  // 读cookie
  getCookie: async(ctx, next) => {
    // 有name读name
    const username = ctx.cookies.get('username') || '没有username'
    const age = ctx.cookies.get('age') || '没有age'
    ctx.body = `${username}-${age}`
  }
}

module.exports = form
