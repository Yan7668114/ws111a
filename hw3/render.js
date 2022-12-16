export function layout(datetime, content) {
  return `
  <html>
  <head>
    <title>${datetime}</title>
    <style>
      body {
        padding: 80px;
        font: 16px Helvetica, Arial;
      }
  
      h1 {
        font-size: 2em;
      }
  
      h2 {
        font-size: 1.2em;
      }
  
      #posts {
        margin: 0;
        padding: 0;
      }
  
      #posts li {
        margin: 40px 0;
        padding: 0;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        list-style: none;
      }
  
      #posts li:last-child {
        border-bottom: none;
      }
  
      textarea {
        width: 700px;
        height: 700px;
      }
  
      input[type=text],
      textarea {
        border: 1px solid #eee;
        border-top-color: #ddd;
        border-left-color: #ddd;
        border-radius: 2px;
        padding: 15px;
        font-size: .8em;
      }
  
      input[type=text] {
        width: 500px;
      }
    </style>
  </head>
  <body>
    <section id="content">
      ${content}
    </section>
  </body>
  </html>
  `
}

export function list(posts) {
  let list = []
  for (let post of posts) {
    list.push(`
    <li>
    <h2>${post.datetime}</h2>
    <h3>${post.title}</h3>
    <p><a href="/post/${post.id}">更多內容</a></p>
    <p><a href="/remove/${post.id}">刪除此blog</a></p>
    </li>
    `)
  }
  let content = `
  <h1>myBlog(10)</h1>
  <p>你有 <strong>${posts.length}</strong> 事件!</p>
  <p><a href="/post/new">建立事件</a></p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
  return layout('Posts', content)
}

export function newPost() {
  return layout('New Event', `
  <h1>新事件</h1>
  <p>輸入以建立一個新事件</p>
  <form action="/post" method="post">
    <p><input type="text" placeholder="Title" name="title"></p>
    <p><input type="datetime-local" value="" name="datetime"></p>
    <p><textarea placeholder="Contents" name="body"></textarea></p>
    <p><input type="submit" value="Create"></p>
  </form>
  `)
}

export function show(post) {
  return layout(post.datetime, `
    <h1>${post.datetime}</h1>
    <h2>${post.title}</h2>
    <pre>${post.body}</pre>
    </br></br>
    <p><a href="/">回主頁</a></p>
  `)
}