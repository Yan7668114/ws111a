import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

function page(body) {
  return `<html>
  <head>
  <style>
  </style>
  </head>
  <body>
  ${body}
  </body>
  </html>`
}

app.use((ctx) => {
  console.log('ctx.request.url=', ctx.request.url)
  let pathname = ctx.request.url.pathname
  if (pathname.startsWith("/login")) {
    ctx.response.body = page(`
       <form action="" method="post">
         <input type="text" name="user" value="" placeholder="User Name"/>
         <input type="password" name="password" value="" placeholder="Password"/>
         <button class="btn" id="sign_in" onclick="location.href='home.html'">Sign In</button>
       </form>
    `)
  } else if(pathname.startsWith("/register")){
    ctx.response.body = page(`
       <form action="" method="post">
         <input type="text" name="user" value="" placeholder="User Name"/>
         <input type="password" name="password" value="" placeholder="Password"/>
         <input type="e-mail" name="e-mail" value="" placeholder="E-Mail"/>
         <button class="btn" id="sign_in" onclick="location.href='home.html'">Sign up</button>
       </form>
       `)
  }else{
    ctx.response.body = page(`
      <h1>顏駿葳的網站</h1>
      <a href="http://127.0.0.1:8000/login">登入</a>
      <a href="http://127.0.0.1:8000/register">註冊</a>
    `)
  }
  // searchParams.get('name')=${ctx.request.url.searchParams.get('name')}
});

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });
