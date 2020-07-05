const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");
const mongoose = require('mongoose');
                                                   //
const app= express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true });

const itemschema = {
  name: String
};
const Item = mongoose.model("Item",itemschema);

const Item2   = new Item({
  name: "hit a + button to add a new item."
});

const Item3   = new Item({
  name: " <-- Hit this to delete an item."
});

const Item1   = new Item({
  name: "welcome to your todo-list."
});

const defaultItems = [Item1, Item2, Item3];



app.get("/",function(req,res){

  Item.find({}, function(err, foundItems){


if(foundItems.length===0){
  Item.insertMany(defaultItems, function(err){
    if(err){
      console.log("error, try again");
    }
    else{
      console.log("you successfully added the items");
    }
  });
  res.redirect("/");
}
else{
res.render("list",{currentday: "Today", newlistitem: foundItems });
}

});

});
app.post("/",function(req,res){
   var itemname = req.body.newitem;
    const item = new Item ({
      name: itemname
    });
  item.save();
  res.redirect("/");

})
app.post("/delete", function(req,res){
  const checkeditemid = req.body.checkbox;
  Item.findByIdAndRemove(checkeditemid, function(err){
  if(!err){
    console.log("successfully deleted the checked item.");
    res.redirect("/");
  }

})
});

app.get("/:listname" , function(req, res){
  const listname = req.params.listname;
});

app.listen(3000,function(){
  console.log("sever is running on port 3000");
});
