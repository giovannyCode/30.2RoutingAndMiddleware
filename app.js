const express = require('express');
const items = require('./fakeDb');
const itemsRoutes = require('./itemsRoutes')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/items',itemsRoutes);

/*  app.listen(3000, function(){
  console.log("Server starting on port 3000")
})  */

module.exports = app;