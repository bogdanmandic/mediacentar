const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var imageSchema = new Schema({
  filename: {
    type: String,
    unique: true,
    required: [true, 'Name is missing']
  },
  originalname: {
    type: String,
    required: [true, 'Original image name is required!']
  },
  path: {
    type: String,
    unique: true,
    required: [true, 'Missing image db path']
  },
  tags: [
  {
   type: String,
   required: [true, 'Tag(s) missing!'] 
  }
  ]
});

module.exports = mongoose.model('Image', imageSchema);