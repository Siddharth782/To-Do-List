// setting up
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
mongoose.connect("mongodb+srv://Siddharth_782:Siddharth02@cluster0.13o5n.mongodb.net/todolistDB", { useNewUrlParser: true });


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Brush ur teeth"
});


const item2 = new Item({
    name: "clean "
});


const item3 = new Item({
    name: "go to work"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);


app.get("/", function (req, res) {

    Item.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Success");
                }
            });
            res.redirect("/");
        }
        else {
            res.render("lists", { listTitle: "Today", newListItems: foundItems });
        };
    })

})
app.get("/:customName", function (req, res) {
    const customListName = _.capitalize(req.params.customName);

    List.findOne({ name: customListName }, function (err, foundlist) {
        if (!err) {
            if (!foundlist) {
                const list = new List({
                    name: customListName,
                    items: defaultItems
                })
                list.save();
                res.redirect("/" + customListName);
            }
            else {
                res.render("lists", { listTitle: customListName, newListItems: foundlist.items })
            }
        }
    })

})


app.post("/", function (req, res) {

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const newItem = new Item(
        {
            name: itemName
        }
    );

    if (listName === "Today") {
        newItem.save();
        res.redirect("/");
    }
    else {
        List.findOne({ name: listName }, function (err, foundList) {
            foundList.items.push(newItem);
            foundList.save();
            res.redirect("/" + listName);

        })
    }

})

app.post("/delete", function (req, res) {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
        Item.findByIdAndRemove({ _id: checkedItemId }, function (err) { // callback is important for this findbyIdandRemove function
            if (err) {
                console.log(err)
            }
            else console.log("done");
        })
        res.redirect("/");
        
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function (err,foundList) {
            if (!err) {
                res.redirect("/"+ listName);
            }
        });
    }

   
})



app.get("/about" , function (req,res) {
    res.render("about");   
}
)

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
    console.log("Server is running")
})