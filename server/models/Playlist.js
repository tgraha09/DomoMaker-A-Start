// const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let PlaylistModel = {};
// const iterations = 10000;
// const saltLength = 64;
// const keyLength = 64;
const convertId = mongoose.Types.ObjectId;
const RecipeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: false,
    trim: false,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: false,
    unique: false,

  },
  food: {
    type: String,
    required: false,
    trim: false,
    unique: false,

  },
  tag: {
    type: String,
    required: false,
    trim: false,
    unique: false,

  },
  thumbnail: {
    type: String,
    required: false,
    trim: false,
    unique: false,

  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Recipe',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

RecipeSchema.statics.toAPI = (doc) => ({
  // _id is built into your mongo document and is guaranteed to be unique

  id: doc.id,
  food: doc.food,
  name: doc.name,
  owner: doc.owner,
  tag: doc.tag,
  thumbnail: doc.thumbnail,
});

RecipeSchema.statics.findByID = (id, callback) => {
  const search = {
    id,
  };

  return PlaylistModel.findOne(search, callback);
};

RecipeSchema.statics.deleteRecipe = (id, callback) => {
  const search = {
    id,
  };
  return PlaylistModel.deleteOne(search, callback);
};

RecipeSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return PlaylistModel.find(search).select('id food tag owner name thumbnail').lean().exec(callback);
};

RecipeSchema.statics.authenticate = (id, callback) => {
  PlaylistModel.findByID(id, (err, doc) => {
    if (err) {
      return callback(err);
    }

    if (!doc) {
      return callback();
    }

    return callback(doc);
  });
};

PlaylistModel = mongoose.model('Recipe', RecipeSchema);

module.exports.PlaylistModel = PlaylistModel;
module.exports.RecipeSchema = RecipeSchema;
module.exports.authenticate = RecipeSchema.statics.authenticate;
module.exports.deleteRecipe = RecipeSchema.statics.deleteRecipe;
module.exports.findByOwner = RecipeSchema.statics.findByOwner;
module.exports.findByID = RecipeSchema.statics.findByID;
