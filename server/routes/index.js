const express = require("express");
const Data = require('../models/recipes-models');
const router = express.Router();

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Data.find({}).sort({createdAt: -1}).exec(function(err, data) { 
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
  
router.post('/updateData', (req, res) => {
  const { id, recipeDescription, date } = req.body;
  Data.update(
    { _id: id }, 
    { $push: { 'recipe': { 
      $each: [{recipeDescription: recipeDescription, date: date}],
      $sort: { date: -1 }  
    } } }, 
    (err, post) => {
      if(err){
        console.log(err)
        res.end()
      }else{
        res.end()
      }
    }
  )
});
  
// this is our create method
// this method adds new data in our database
router.post('/putData', (req, res) => {
  
  let data = new Data();
  
  const { recipeDescription, date } = req.body;
  
  data.recipe.push({recipeDescription: recipeDescription, date: date });
  
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });

});

module.exports = router;