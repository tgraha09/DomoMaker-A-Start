const http = require('https');
// const query = require('querystring');
// const models = require('../models');
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
      'x-rapidapi-key': '170e038a70mshc48a677384b7b29p120f51jsn123cfd31d18c',
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

module.exports = {
  POSTSearchedRecipes,
  GETSearchedRecipes,
};
