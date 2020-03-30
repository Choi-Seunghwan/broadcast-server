const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.send("<h1>Hello socket</h1>");
});

io.on("connection", socket => {
  console.log("a user connected");

  socket.on("chat", () => {
    console.log("message: " + msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(3002, function() {
  console.log("listen : 3002");
});
