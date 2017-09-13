console.log("hola");

var express = require("express");
var app =express();
var path = require("path");

app.get("/", (request, res)=>{
     res.sendFile(__dirname+ "/dist/index.html");
});
app.listen(4000);

app.use("/static", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "dist")));