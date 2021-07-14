require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");

const Data = require("./models/data");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Connecting to DB
const URL = process.env.DB_URI;
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function (result) {
        console.log("Connected to DB");
    })
    .catch(function (err) {
        console.log(err);
    })

// !---------------------
// To test is server is working
// app.get("/notes",function(req,res){
//     res.json({message : "Hi from server"});
// })
// !---------------------


// ! To get all ithems
app.get("/", function (req, res) {
    Data.find()
        .then(function (result) {
            res.json(result);
        })
        .catch(function (err) {
            console.log(err);
        });
})

// ! For creating new items
app.post("/", function (req, res) {
    const note = new Data({
        title: req.body.title,
        body: req.body.body
    });
    note.save()
        .then(function (result) {
            res.send("Saved");
            console.log(result);
        })
        .catch(function (err) {
            console.log(err);
        });
})

// ! For find particular item
app.get("/:id", function (req, res) {
    const id = req.params.id;
    Data.findById(id)
        .then(function (data) {
            res.send(data);
        })
        .catch(function (err) {
            console.log(err);
        });
})

// ! For updating particular item
app.put("/:id", function (req, res) {
    const id = req.params.id;
    Data.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(function (data) {
            res.json({ messege: "Updated" });
            console.log(data);
        })
        .catch(function (err) {
            console.log(err);
        });
})

// ! For deleting particular item
app.delete("/:id", function (req, res) {
    const id = req.params.id;
    Data.findByIdAndRemove(id)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (req, res) {
            console.log(err);
        })
})

// ! For deleting all items
app.delete("/", function (req, res) {
    Data.deleteMany({})
        .then(function (data) {
            res.send({
                message: `${data.deletedCount} Everything was deleted successfully!`
            });
        })
        .catch(function (err) {
            console.log(err);
        });
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running at port 3000");
})