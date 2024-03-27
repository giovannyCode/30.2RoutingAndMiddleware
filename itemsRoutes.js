const express = require('express');
const router = new express.Router();
const items = require('./fakeDb');

router.get('/', function(req, res) {
  return res.json(items);
})

router.post('/', function(req, res) {
  const {name, price} = req.body;
  items.push({name,price});
  console.log(items);
   return res.json({"added": {name,price}});
});

router.get("/:name", function(req, res) {
  const item = items.find(u => u.name === req.params.name);
  if (!item) {
    return res.status(404).json({message:"Not Found"});
  }
  return res.json({item});
})

router.delete("/:name", function(req, res) {
  const item = items.find(u => u.name === req.params.name);
   if (!item) {
    return res.status(404).json({message:"Not Found"});
  }
let index = items.indexOf(item);
if (index !== -1) {
  items.splice(index, 1);
}
  
  return res.json({message: "Deleted"});
})

router.patch("/:name", function(req, res) {
  const item = items.find(u => u.name === req.params.name);
  if (!item) {
    return res.status(404).json({message:"Not Found"});
  }
  const index = items.findIndex(itnem => item.name === req.params.name);
   if (index !== -1) {
    const {name, price} = req.body;
    const newData = {name: name ,price: price}
    items[index]= newData
    console.log(items);
    return res.json({updated:items[index]});
    } 
})


module.exports= router;