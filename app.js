
const express = require("express");
const port = 80;
const app = express();
const path = require("path");

app.get('/myapp/', function(req, res){
    res.send("Hello from the root application URL"+ process.env.BUILD_NUM);
});

app.listen(port, () => console.log('Application is running'));

