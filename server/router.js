const controllers = require('./controllers');

const mid = require('./middleware');

const router = (app) => {
  app.get('/recipes-json', controllers.recipes.GETSearchedRecipes);
  app.get('/recipe-playlist', controllers.recipes.GETPlaylistJSON);
  app.get('/', mid.requiresSecure, mid.requiresLogout, (req, res) => {
    res.render('login');
    // res.sendFile(path.join(__dirname + '/../dist/index.html'));
  });
  app.get('/login', mid.requiresSecure, mid.requiresLogout, (req, res) => {
    // console.log(req);
    res.render('login');
  });
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, (req, res) => {
    // console.log(req);
    res.render('signup');
  });
  app.get('/finder', mid.requiresLogin, (req, res) => {
    // console.log(req);
    res.render('app');
  }); // mid.requiresLogin,
  app.get('/recipes', mid.requiresLogin, (req, res) => {
    // console.log('/recipes');
    res.render('app');
  });
  app.get('/recipe', mid.requiresLogin, (req, res) => {
    // console.log('/recipe');
    res.render('app');
  });

  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login); // mid.requiresSecure, mid.requiresLogout,
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup); // mid.requiresSecure, mid.requiresLogout,
  app.post('/recipes-json', mid.requiresLogin, controllers.recipes.POSTSearchedRecipes);
  app.post('/recipe-playlist', mid.requiresLogin, controllers.recipes.POSTRecipeToPlaylist);
  /*
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, (req, res)=>{
    //console.log(req);
    res.render('signup');
  });
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Domo.make);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage); */
};

module.exports = router;
