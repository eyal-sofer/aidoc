const express = require("express");
const port = 80;
const app = express();
const path = require("path");
const publicDir = path.join(__dirname, "public");

//app.use(express.static(publicDir));

//app.listen(port, () => {
 //   console.log(`Listening on port ${port}`);
 //   console.log(`Hello world!`);
//});



app.get('/myapp/', function(req, res){
    res.send("Hello from the root application URL");
});

app.listen(port, () => console.log('Application is running'));
