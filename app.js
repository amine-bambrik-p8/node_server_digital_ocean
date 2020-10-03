
const http = require('http');
const https = require('https');
const express = require("express");

const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
require('dotenv').config();
require("./config/config");

const app = express();
const port = process.env.PORT || 3000;
app.use(morgan("tiny"));
app.use(helmet());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"public")));

const apiRouter = express.Router({
  mergeParams:true,
});
require("./routes")(apiRouter);
app.use("/api",apiRouter);

app.get("**", (req, res) => {
  res.sendFile(path.join(path.join(__dirname,"public/index.html")));
});

app.use((err,req,res,next)=>{
  console.error(err);
  return res.status(500).json({
    message:"Internal server problem - something very wrong"
  });
});
//creating server http 
var httpServer = http.createServer(app);
httpServer.listen(port,()=>{
  console.log(`Server started at localhost:${port}; Press Ctrl + C to stop`);
});
//var httpsServer = https.createServer(credentials, app);