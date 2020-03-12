// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    recipe: [{ 
      //id: Number,
      recipeDescription: String,
      //date: Date.now,
      // ricepeTitle: String,
      // ricepeText: String,
      date: String,
      //timestamps: {type: Date, }
    }],
  },
  {timestamps: true}
);
// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Recipe", DataSchema);