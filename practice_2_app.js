const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let items = [];
let workItems = [];

app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function (req, res) {


    let today = new Date();
   
    let options =
    {
        weekday : "long",
        day : "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US", options);
    res.render("lists", { listTitle: day, newListItems: items });
})


app.post("/", function (req,res) {
     let item = req.body.newItem;

     items.push(item);
    // we cant define tasks here its scope is only this. so we did that above
        res.redirect("/");
})

app.get("/work", function (req,res) {
    res.render("lists", {listTitle: "Work List", newListItems : workItems})
})

app.post("/work", function (req,res) {
    let workItem = req.body.newItem;
    workItems.push(workItem);
    res.redirect("/work");
})
app.listen(3000, function () {
    console.log("Server is running")
})