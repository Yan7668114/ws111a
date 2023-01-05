# 學習心得
這堂課與上學期的網站設計比起來難了非常多，目前都是javascript來寫程式的部分，以下是我通過在這堂課學到做的筆記
## 前置作業
### 1，安裝IDE
開發網頁的IDE也不少，但是本課程使用的[Visual Studio code](https://code.visualstudio.com/) IDE
### 2，安裝Deno
Deno 作為目前最好用的javascript與Typescript的運行環境，是與Node.js同一個開發者。
windows user可以通過在終端機裡輸入以下代碼來安裝
```
irm https://deno.land/install.ps1 | iex
```
安裝完成後，就要來運行一下，其實還蠻簡單的~~~
```
deno run xxx.js/xxx.ts
```
更多的教程可以透過官方手冊去了解\
官方英文tutorial https://deno.land/manual@v1.29.2/introduction\
(中文教程要要去網路上自己查詢翻譯)
### 3，安裝Git
由於本課程需要使用GitHub來儲存以及繳交專案，Git會是很大的助益之一。
首先去以下網址來下載Git\
https://git-scm.com/\
下載完成後，預設安裝就可以了\
使用方法稍微複雜一點，首先要去Github fock 老師的GitHub
![](https://i.imgur.com/RvkLDvL.png)\
你將會得到一個跟老師一模一樣的Github\
接下來是重點，先去clone 專案
![](https://i.imgur.com/UHJDYxs.png)\
複製這一整串，然後前往vscode=>新增終端機=>輸入以下代碼
```
git clone https://github.com/xxxxx/xxxxx.git
```
![](https://i.imgur.com/G9y3bGr.png)
專案就會自動跑到你的vscode裡了(clone之後會自動建立一個資料夾，專案會自動儲存在裡面)。\
**第一次使用git的時候需要綁定電腦與github帳號，按照顯示的提示操作即可**\
如果之後有修改這裡面的專案，那麼就需要把專案"推"回去\
這裡會比較複雜，不過熟悉之後也就是網速的問題了
```
git add -A
git commit -m "XXX"
git push 
```
由上至下慢慢輸入，運行成功時，重新整理GitHub介面，你會發現你的東西出現在網路上了呢!是不是很神奇

以上都準備好了之後就可以開始寫程式了
## 登入與註冊
我們常常看到的網站99%都有的會員政策，要求註冊會員與登入後才能查看的資訊\
可以說沒會員制的網站根本稱不上是網站\
以下是透過教授所教授，寫出來的專案
```
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
      <h1>XXX的網站</h1>
      <a href="http://127.0.0.1:8000/login">登入</a>
      <a href="http://127.0.0.1:8000/register">註冊</a>
    `)
  }
  // searchParams.get('name')=${ctx.request.url.searchParams.get('name')}
});

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });

```
先要引進Deon的模組，這個模組是專門處裡Http的一個模組，可以說是給他一佈署一的伺服器，尤其是最下面兩行
```
console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });
```
設定了節點與阜號，只是最好不要多個成是用同一個阜號，否則會塞車...\
8000 8080皆可

專案結果:
![](https://i.imgur.com/UIxCAyB.png)\
點擊登入\
![](https://i.imgur.com/9Ku1zqv.png)\
點擊註冊\
![](https://i.imgur.com/VnEwweL.png)\
這是一個非常簡便的一個註冊登入系統，之後如果能連結資料庫會更好
## Blog
部落格大家應該都很熟悉，什麼痞客幫、PPT都是。\
主要就像是一個手札，可以隨時記錄你的活動、重要事件等\
以下是我的專案演示:\
![](https://i.imgur.com/Hrm0Yb9.png)\
點擊建立事件\
![](https://i.imgur.com/Y5aRYuU.png)\
可以自行選擇時間(萬年曆)
![](https://i.imgur.com/rhRVRFd.png)\
建立成功!!!\
![](https://i.imgur.com/gzfAhUb.png)\
後臺狀況:
![](https://i.imgur.com/JJe86Lt.png)\
若點選刪除，後臺會回傳一個空值:\
![](https://i.imgur.com/aMwaoIK.png)\
這專案除了oak http部署模組外，還需要引進sqlite模組\
專案執行成功之後，會生成一個.db檔案，使用者輸入的資料都會儲存在裡面\
## 專案
我的期中專案是做一個簡便的遊戲，但是大多都是參考外部網站的程式碼，有猜數字、小恐龍
![](https://i.imgur.com/P2ln6vY.png)
![](https://i.imgur.com/wPwu2VJ.png)
![](https://i.imgur.com/zNHLQbu.png)

# 總結
這學習學會了如何使用Deno部署與更進階的JavaScript開發\
老實說，真的很不容易，尤其是要連結資料庫的地方\
雖然很多都是詢問同學跟網路查資料，但是看到自己的想法能執行真的很有成就感!!!















