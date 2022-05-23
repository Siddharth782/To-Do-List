const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs'); // tell our app to use ejs as its view engine

app.get("/", function (req, res) {


    var today = new Date();
    var currentDay = today.getDay();
    var day = "";

    switch (currentDay) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "wednesday";
            break; case 4:
            day = "Thursday";
            break; case 5:
            day = "Friday";
            break;
        default:
            break;
    }

    // res.render("lists", { kindOfDay: day });
    // tells the view engine to go to views file(by default) & look for a file by the name of lists.
})

app.listen(3000, function () {
    console.log("Server is running")
})