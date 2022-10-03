const express = require("express");
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
var methodOverride = require('method-override')
var mongoDB = 'mongodb+srv://Ajay:ajay@cluster0.69nrddt.mongodb.net/ToDo?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err.message)
    }
    else {
        console.log("connected to DB");
    }
});
const todo = require("./model/todo");
const app = express();


app.use(methodOverride('_method'))

app.use(bodyparser());

app.use(express.static("public"));

// Read/fetch operation
app.get("/", async (req, res) => {
    // wrtite to the code to fetch all the todos 
    const data = await todo.find();
    res.render("todo.ejs", { data });
})

// CReate operation
app.post("/todo/add", async (req, res) => {
    // Write the code to save the record in db
    const todoname = await todo.create({
        todoname: req.body.todoname
    })
    res.redirect("/");
})

// Update operaton
app.put("/update/:id/todo", async (req, res) => {

    const data = await todo.updateOne({ _id: req.params.id }, { taskstatus: true });
    res.redirect("/");
});

// delete operation
app.delete("/delete/:id/todo", async (req, res) => {

    const data = await todo.deleteOne({ _id: req.params.id });
    res.redirect("/");
})

app.listen(3000, () => console.log("Server is up at 3000"));
