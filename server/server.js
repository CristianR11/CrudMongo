
const appName = require('./../package').name;
const http = require('http');
const express = require('express');
const localConfig = require('./config/local.json');
const morgan = require('morgan');


const app = express();
const router = require('./routers/index');
const conection = require('./conection/mongo');
conection(app);
router(app);





const server = http.createServer(app);
const port = process.env.PORT || localConfig.port;
server.listen(port, function(){
  
});

module.exports = server;