const http = require('https');
// const url = require('url');
// const querystring = require('querystring');
// const query = require('querystring');
const models = require('../models');
const {
  authenticate, findByOwner, // findByID, deleteRecipe,
} = require('../models/Playlist');

const { Playlist } = models;
const { defaultSearch } = require('./defaults');

const userSearchParameters = [];
// const userRecipes = [];
// const searchIdx = -1;

const GETSearchedRecipes = (req, res) => {
  console.log('GETSearchedRecipes');

  const { query } = req;
  const food = `${query.food}`;
  const tag = `${query.tag}`;
  if (!food || !tag) { // just need to check search fields
    return res.status(400).json({ error: 'RAWR! All fields are required' });
  }
  console.log(query);
  if (userSearchParameters.length === 0) {
    userSearchParameters.push(defaultSearch);
  }
  // console.log(userSearchParameters);
  let result;
  for (let i = 0; i < userSearchParameters.length; i += 1) {
    const recipeObj = userSearchParameters[i];
    if (recipeObj.food === food && recipeObj.tag === tag) {
      result = recipeObj;
    }
  }

  if (result === undefined || result === '') {
    console.log('NULL');
    // console.log(recipe)
    return res.status(200).json({ userSearchParameters });
  }
  return res.status(200).json({ result });
  // console.log(userSearchParameters);
  // res.status(400).json({ error: 'RAWR! No Resources found' });
  // return res.json({ redirect: '/recipes' });
};

const POSTSearchedRecipes = (req, res) => {
  console.log('POSTSearchedRecipes');
  const query = req.body;
  const food = `${query.food}`;
  const tag = `${query.tag}`;
  console.log(query);
  if (!food || !tag) { // just need to check search fields
    return res.status(400).json({ error: 'RAWR! All fields are required' });
  }
  // console.log(query);
  const options = {
    method: 'GET',
    hostname: 'tasty.p.rapidapi.com',
    port: null,
    path: `/recipes/list?from=0&size=20&tags=${tag}&q=${food}`,
    headers: {
      'x-rapidapi-host': 'tasty.p.rapidapi.com',
      'x-rapidapi-key': '63f6ab95cemshe9b57c799d2aff1p19c240jsn4a5093e49c83',
      useQueryString: true,
    },
  };

  const tasty = http.request(options, (_res) => {
    const chunks = [];

    _res.on('data', (chunk) => {
      chunks.push(chunk);
    });

    _res.on('end', () => {
      const body = JSON.parse(Buffer.concat(chunks).toString());
      const results = [];
      // //console.log(body);
      body.results.forEach((json) => {
        // //console.log(json);
        const recipeObj = {
          name: json.name,
          id: json.id,
          searchIndex: json.position,
          thumbnail: json.thumbnail_url,

        };
        /**/
        results.push(recipeObj);
      });
      // //console.log(arr);
      // //console.log(body);
      userSearchParameters.push({
        searchedAt: new Date(),
        food,
        tag,
        results,
      });

      /* let recipe;
      for (let i = 0; i < userSearchParameters.length; i += 1) {
        const recipeObj = userSearchParameters[i];
        if (recipeObj.food === food && recipeObj.tag === tag) {
          recipe = recipeObj;
        }
      } */

      // console.log(userSearchParameters);
      // console.log(recipe)
      /* if (acceptedTypes.includes('text/xml')) {
        //const content = buildXML(recipe);
        //respond(request, response, 201, content, 'text/xml');
      } else {
        // //console.log(recipe)
        //respond(request, response, 201, JSON.stringify(recipe), 'application/json');
      } */
    });
  });

  tasty.end();
  return res.json({ userSearchParameters });
  // res.redirect('/recipes')
};
let activeOwner = '61a84caa7017659683108bd8';
const POSTRecipeToPlaylist = (req, res) => {
  console.log('POSTRecipeToPlaylist');
  // console.log(req.query);
  // let query = new URLSearchParams(req.query);
  const { query } = req; // url.parse(req.Search, true); //querystring.parse(req.query)
  // console.log(query);
  const food = `${query.food}`;
  const tag = `${query.tag}`;
  const id = `${query.id}`;
  const name = `${query.name}`;
  const thumbnail = `${query.thumbnail}`;
  // console.log(thumbnail);
  if (!food || !tag || !id || !thumbnail || !name) { // just need to check search fields
    return res.status(400).json({ error: 'RAWR! All fields are required' });
  }
  /* deleteRecipe(id, (err)=>{
    console.log(err);
  }) */
  // Playlist.PlaylistModel
  return authenticate(id, (doc) => {
    // console.log(req.session.account);
    // activeAccount = req.session.account._id
    const accountData = {
      id,
      food,
      tag,
      thumbnail,
      name,
      owner: req.session.account.owner,
    };
    activeOwner = accountData.owner;
    console.log('accountData');
    console.log(accountData);
    let newRecipe;
    let savePromise;
    if (doc === undefined) {
      console.log('NEW RECIPE');
      newRecipe = new Playlist.PlaylistModel(accountData);
      savePromise = newRecipe.save();
      savePromise.then(() => {
        req.session.recipe = Playlist.PlaylistModel.toAPI(newRecipe);
        // console.log("RECIPE THEN");
        console.log(req.session.recipe);
        // return res.status(200).json({ redirect: '/finder' });
      });

      savePromise.catch((err) => {
        // console.log(err);

        if (err.code === 11000) {
          // return res.status(400).json({ error: 'Recipe ID already present.' });
        }

        // return res.status(200).json({ error: 'An error occured' });
      });
    } else {
      console.log('DELETE');
      console.log('doc');
      // console.log(doc);
      /* findByID(doc.id, (err, data)=>{
        if (err) {
          console.log(err);
          return res.status(400).json({ error: 'An error occurred' });
        }
        console.log("FOUND");
        console.log(data);

      }) */
      // console.log(r);
      // return res.status(200).json({ message: 'Posted' });
      return res.status(400).json({ error: 'Recipe ID already present.' });
    }

    // savePromise = newRecipe.save();

    return res.status(200).json({ message: 'Posted' });
  });
};
// let def = '61971896bbb2909349ca3c26'
const GETPlaylistJSON = (req, res) => {
  // console.log(req.session);
  findByOwner(activeOwner, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    console.log('Callback');
    console.log(data);
    // return data
    res.status(200).json({ playlist: data });
    return data;
  });

  return res.status(200); // res.json({ data: req.session });
};

module.exports = {
  POSTSearchedRecipes,
  GETSearchedRecipes,
  POSTRecipeToPlaylist,
  GETPlaylistJSON,
};
