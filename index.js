const express = require('express');
const app = express();
const path = require('path');

app.set("view engine","ejs");
app.set("views", path.join(__dirname, '/views'));

app.get("/", (req,res) => {
    // console.log("welcome to /");
    res.render("home");

});

app.get("/comments", (req,res)=> {
    res.send("This is the comments page");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});