//建立一個Express伺服器
const express = require('express'); //這裡的express只會回傳一個function，在此我們將此function放進一個variable裡
const app = express(); //因為接受到的型態為function，所以可以用 ()
const path = require('path');
// const bodyParser = require('body-parser'); //routing for query - "POST"使用，取得req.body
const favicon = require('serve-favicon'); //在資料夾 npm install serve-favicon 後，方可取用

// middleware - routing for query - "POST"使用
// app.use(bodyParser.urlencoded({extended: true}));

// serving a static file
// middleware
app.use(express.static("public")); //製作一個public資料夾，之後要給的文件，就會從此資料夾拿取要用的靜態文件

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); //favicon製作，記得將favicon.ico放入public資料夾，因為此處將路徑為public資料夾


// 自訂路由(Routing)：request handling，接收連線請求，並回應客戶端

// 一般函式
// app.get('/', function (req, res) {
//   ...
// })

// 箭頭函式
// 告訴伺服器在根目錄(/)時需要「Get」資料、並「Response」回送一行字串(String)回去
app.get('/', (req, res) => {
  // console.log(req); //可以看到有大量的資訊(巨大的object)，
                       //這些資訊都是客戶端送出的get request（與Node.js-製作node server一樣）。
  // console.log(res); //也可看到大量資訊(巨大的object)。
  // res.send("You are on the homepage.");
  res.sendFile(path.join(__dirname, "index.html"));
});

// handling different request
app.get('/cara', (req, res) => {
  res.send("<h1>This is Cara page.</h1>");
});

// 若想send大量資訊，可以使用sendFile
app.get('/mike', (req, res) => {
  res.sendFile(__dirname + "/mike.html");
});

// 製作302
app.get('/amy', (req, res) => {
  res.status(302);
  res.sendFile(path.join(__dirname, "redirect.html"));
});

// 送出API
app.get('/api', (req, res) => {
  let API = {
    item: "Apple",
    num: 5
  }
  res.send(API);
});

// routing for all：所有不符合 首頁、/cara、/mike、/API 的網頁路徑，都會被帶到此處
// 製作404畫面
app.get("*", (req, res)=> {
  // res.send("Cannot find what you want.");
  res.status(404);
  console.log(res.statusCode);
  res.sendFile(path.join(__dirname, "error.html"));
});

// 告訴server聽取3000這個Port
app.listen(3000, ()=> {
  console.log("Sever is running on port 3000.");
}); 

