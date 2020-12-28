const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

// In order to accept data...
app.use(express.urlencoded( { extended: true } ));
app.use(express.json());

// Since forms can only do GET/POST, we need this to do PATCH
app.use(methodOverride('_method'));

app.set("views", path.join(__dirname, '/views'));
app.set("view engine","ejs");

let dataset = [
    { 
        username: "jkim", 
        id: 0, 
        comment: "this is a bad comment"
    },
    { 
        username: "foo", 
        id: 1, 
        comment: "this is a good comment"
    },
    { 
        username: "bar", 
        id: 2, 
        comment: "this is just one comment"
    }
];

app.get("/", (req,res) => {
    // console.log("welcome to /");
    res.render("home"); 
});

app.get("/comments", (req,res)=> {
    // console.log(dataset);
    res.render("comments", { dataset } );
});

app.get("/comments/:id", (req,res)=> {
    const { id } = req.params;
    const currobj = dataset[id];
    res.render("editcomments", { currobj });
});

// update a comment using PATCH
app.patch("/comments/:id", (req,res) => {
    const { id } = req.params;
    console.log(id);

    const newtext = req.body.comment;
    console.log(newtext);

    dataset[id].comment = newtext;

    res.redirect("/");
});


app.listen(3000, () => {
    console.log("Listening on port 3000");
});