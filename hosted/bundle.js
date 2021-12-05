"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Display = function Display(_ref) {
  var props = _extends({}, _ref);

  return /*#__PURE__*/React.createElement("main", _extends({
    className: "main"
  }, props), /*#__PURE__*/React.createElement("section", {
    className: "main-inner"
  }, props.children));
};

var Finder = /*#__PURE__*/function (_React$Component) {
  _inherits(Finder, _React$Component);

  var _super = _createSuper(Finder);

  function Finder(props) {
    var _this;

    _classCallCheck(this, Finder);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "search", function (e) {
      //console.log("FORM BUTTON");
      var recipeTagInput = $('#tagInput'); //document.body.querySelector('.tagInput')

      var searchFood = $('#food'); // document.body.querySelector('#food')

      var food = searchFood.val(); //.value || searchFood.defaultValue

      var tag = recipeTagInput.val() || "american"; //.value || recipeTagInput.defaultValue

      sessionStorage.setItem("food", food);
      sessionStorage.setItem("tag", tag);
      var formAction = searchform.getAttribute("action");
      var formMethod = searchform.getAttribute("method"); //let data = `?food=${food}&tag=${tag}` //`/recipes-client?food=${food}&tag=${tag}`

      var data = formAction + "?&food=".concat(food, "&tag=").concat(tag);
      console.log(data);
      sendAjax(formMethod, '/recipes-json', data, function () {
        console.log({
          data: data
        });
        console.log("Send to ".concat(formAction));
      });
      setTimeout(function () {
        window.location = "/recipes?&food=".concat(food, "&tag=").concat(tag);
      }, 2000); //window.location = `/recipes?&food=${food}&tag=${tag}`
      //console.log("Sent");
    });

    console.log("Finder");

    _this.init();

    return _this;
  }

  _createClass(Finder, [{
    key: "init",
    value: function init() {
      //form="searchform"
      //sessionStorage.setItem('results', null)
      sessionStorage.removeItem("food");
      sessionStorage.removeItem("tag");
      sessionStorage.removeItem('results');

      if (sessionStorage.getItem("tagsList") === null || sessionStorage.getItem("tagsList") === "") {
        console.log("Getting Tags");
        this.getTags();
      }

      getStorage("tagsList", function (data) {
        //console.log(data);
        var recipeTags = $('#recipeTags');
        var recipeTagInput = $('#tagInput'); //let client = document.body.querySelector('#client')
        //client.onclick = search

        recipeTagInput.textContent = "ok";
        recipeTagInput.recipeTags = [];
        var searchFood = $('#food'); // recipeTagInput.value = ""

        var searchform = $('#searchform');
        var tags = JSON.parse(data).results;
        tags.forEach(function (tag) {
          ////console.log(tag);
          var tagValue = tag.name;
          var tagName = tag.display_name;
          var option = document.createElement("option");
          option.id = "tag";
          recipeTagInput.recipeTags[tagName] = {
            tag: tagValue,
            option: option
          };
          option.value = tagValue;
          option.text = tagName; //console.log(option);
          //recipeTags

          recipeTags.append(option);
        });
      });
    }
  }, {
    key: "getTags",
    value: function getTags() {
      //sessionStorage.clear("food")
      //sessionStorage.setItem("food", "")
      //sessionStorage.setItem("tag", "")
      var data = null;
      var xhr = new XMLHttpRequest(); //xhr.withCredentials = true;

      xhr.withCredentials = false;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          sessionStorage.setItem("tagsList", this.responseText); ////console.log(this.responseText);
        }
      });
      xhr.open("GET", "https://tasty.p.rapidapi.com/tags/list");
      xhr.setRequestHeader("x-rapidapi-host", "tasty.p.rapidapi.com");
      xhr.setRequestHeader("x-rapidapi-key", "170e038a70mshc48a677384b7b29p120f51jsn123cfd31d18c");
      xhr.send(data);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "content-wrap"
      }, /*#__PURE__*/React.createElement("h1", {
        className: "title"
      }, "Recipe Finder"), /*#__PURE__*/React.createElement("nav", {
        className: "nav"
      }, /*#__PURE__*/React.createElement("div", {
        className: "linkWrap"
      }, /*#__PURE__*/React.createElement("a", {
        className: "link",
        id: "logout",
        href: "/logout"
      }, "Logout")), /*#__PURE__*/React.createElement("div", {
        className: "linkWrap"
      }, /*#__PURE__*/React.createElement("a", {
        className: "link",
        id: "logout",
        href: "/recipes"
      }, "Search Results")), /*#__PURE__*/React.createElement("div", {
        className: "linkWrap"
      }, /*#__PURE__*/React.createElement("a", {
        className: "link",
        id: "logout",
        href: "/playlist"
      }, "Playlist"))), /*#__PURE__*/React.createElement("h3", {
        className: "desc"
      }, "Search a recipe by its food and cuisine tag."), /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, /*#__PURE__*/React.createElement("form", {
        className: "mainForm",
        id: "searchform",
        method: "POST",
        action: "/recipes-json"
      }, /*#__PURE__*/React.createElement("div", {
        id: "formwrap"
      }, /*#__PURE__*/React.createElement("div", {
        id: "foodWrap"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "food"
      }, "Pick Food"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        className: "input",
        type: "text",
        id: "food",
        name: "food",
        defaultValue: "Beef"
      }), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
        id: "tagWrap"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "tag"
      }, "Select Tag"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        className: "input",
        id: "tagInput",
        type: "text",
        name: "tag",
        list: "recipeTags"
      }), /*#__PURE__*/React.createElement("datalist", {
        name: "recipeTags",
        id: "recipeTags"
      }, /*#__PURE__*/React.createElement("option", {
        id: "tag"
      }))), /*#__PURE__*/React.createElement("input", {
        id: "submitbtn",
        type: "submit",
        onClick: function onClick(e) {
          e.preventDefault();

          _this2.search(e);
        },
        onChange: function onChange() {
          console.log("Changed");
        }
      })))));
    }
  }]);

  return Finder;
}(React.Component);

var recipeName;

var Search = /*#__PURE__*/function (_React$Component2) {
  _inherits(Search, _React$Component2);

  var _super2 = _createSuper(Search);

  function Search(props) {
    var _this3;

    _classCallCheck(this, Search);

    _this3 = _super2.call(this, props);

    _defineProperty(_assertThisInitialized(_this3), "handleResponse", function (e, food, tag) {
      //console.log(e.target.response);
      var userSearch = JSON.parse(e.target.response); //console.log(userSearch)

      if (userSearch == undefined) {//console.log("UNDEFINED");
      }

      sessionStorage.setItem("results", JSON.stringify(userSearch));
    });

    console.log("Search");

    _this3.init();

    return _this3;
  }

  _createClass(Search, [{
    key: "init",
    value: function init() {
      var _this4 = this;

      //localStorage.setItem("results", "")
      //console.log("Project 1 Init");
      if (sessionStorage.getItem("results") === null || sessionStorage.getItem("results") === "") {
        this.downloadRecipes();
      }

      getSessionStorage("results", function (dataString) {
        //console.log(dataString);
        _this4.displayRecipies(JSON.parse(dataString)); ////console.log(dataString);
        //displayRecipies(dataString)
        //sessionStorage.setItem("results", "")

      });
    }
  }, {
    key: "downloadRecipes",
    value: function downloadRecipes() {
      var _this5 = this;

      var params = new URL(document.location).searchParams;
      var food = params.get("food");
      var tag = params.get("tag");
      var recipeURL = "/recipes-json?food=".concat(food, "&tag=").concat(tag);
      var xhr = new XMLHttpRequest();

      xhr.onload = function (e) {
        return _this5.handleResponse(e, food, tag);
      };

      xhr.open("GET", recipeURL);
      xhr.setRequestHeader('Accept', "application/javascript");
      xhr.send();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "content-wrap"
      }, /*#__PURE__*/React.createElement("h1", {
        className: "title"
      }, "Search Results"), /*#__PURE__*/React.createElement("nav", {
        className: "nav"
      }, /*#__PURE__*/React.createElement("div", {
        className: "linkWrap"
      }, /*#__PURE__*/React.createElement("a", {
        className: "link",
        id: "logout",
        href: "/logout"
      }, "Logout")), /*#__PURE__*/React.createElement("div", {
        className: "linkWrap"
      }, /*#__PURE__*/React.createElement("a", {
        className: "link",
        id: "logout",
        href: "/finder"
      }, "Finder")), /*#__PURE__*/React.createElement("div", {
        className: "linkWrap"
      }, /*#__PURE__*/React.createElement("a", {
        className: "link",
        id: "logout",
        href: "/playlist"
      }, "Playlist"))), /*#__PURE__*/React.createElement("h3", {
        className: "desc"
      }, "Results"), /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, /*#__PURE__*/React.createElement("div", {
        id: "content"
      })));
    }
  }, {
    key: "displayRecipies",
    value: function displayRecipies(dataString) {
      var _data$results,
          _this6 = this;

      console.log("Parsing Recipies");
      var content = document.querySelector('#content');
      var data = dataString.result; ////console.log(dataString.results);
      //console.log(document.body);

      var u = 0; //sessionStorage.setItem("results", "")

      data === null || data === void 0 ? void 0 : (_data$results = data.results) === null || _data$results === void 0 ? void 0 : _data$results.forEach(function (recipe) {
        //console.log(recipe);
        var recipeElement = document.createElement('recipe');

        if (u == 0) {////console.log(params);
        } // sessionStorage.setItem("recipe", JSON.stringify(recipe))


        var link = document.createElement('a');
        var params = new URL(document.location).searchParams;
        var recipePath = "/recipe?food=".concat(params.get("food"), "&tag=").concat(params.get("tag"), "&id=").concat(recipe.id);
        link.href = recipePath;
        link.recipe = recipe.id;
        link.textContent = recipe.name;
        recipeElement.innerHTML = "<img id=\"thumb\" src=".concat(recipe.thumbnail, "> </img>") + link.outerHTML; //<a href="javascript:void(0)" recipe="${recipe.id}" onclick=${loadRecipe(recipe.id)}>${recipe.name}</a>
        //let element = recipeElement.outerHTML
        //console.log(recipeElement);
        // console.log(content);

        link.addEventListener('click', function (e) {
          e.preventDefault();
          console.log("click");

          _this6.loadRecipe(e.target);
        });
        content.append(recipeElement);
        u++;
      }); //sessionStorage.setItem("results", "")
    }
  }]);

  return Search;
}(React.Component);

var Recipe = /*#__PURE__*/function (_React$Component3) {
  _inherits(Recipe, _React$Component3);

  var _super3 = _createSuper(Recipe);

  function Recipe(props) {
    var _this7;

    _classCallCheck(this, Recipe);

    _this7 = _super3.call(this, props);

    _defineProperty(_assertThisInitialized(_this7), "instructions", function (instructObj) {
      var orderedList = document.createElement("ol");
      orderedList.id = "instructions";
      instructObj.forEach(function (obj) {
        orderedList.innerHTML += "<li>".concat(obj.display_text, "</li>"); //////console.log(obj.display_text);
      });
      return orderedList.outerHTML;
    });

    _defineProperty(_assertThisInitialized(_this7), "saveRecipe", function (e) {
      console.log("saveRecipe"); // console.log(e);

      var params = new URL(document.location).searchParams;
      var food = params.get("food") || sessionStorage.getItem("food");
      console.log(food);
      var tag = params.get("tag") || sessionStorage.getItem("tag");
      var id = params.get("id");
      var name = document.body.querySelector('#name').textContent;
      name = name.replace('&', "and");
      var thumbnail = document.body.querySelector('#recipeImg').src; ////console.log(thumbnail)

      var urlPath = "/recipe-playlist?food=".concat(food, "&tag=").concat(tag, "&id=").concat(id, "&name=").concat(name, "&thumbnail=").concat(thumbnail);
      console.log(urlPath);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", urlPath); //////console.log(xhr.HEADERS_RECEIVED)

      xhr.send();
      return true;
    });

    _defineProperty(_assertThisInitialized(_this7), "getRecipe", function () {
      // remember that an `Event` object gets passed along every time that an event handler or listener calls a function
      // the `target` property of that event points at the element that sent the event, in this case a button
      //////console.log(`An element of id=${e.target.id} was clicked!`);
      var params = new URL(document.location).searchParams;
      var food = params.get("food"); // || sessionStorage.getItem("food")

      var tag = params.get("tag"); //|| sessionStorage.getItem("tag")

      var id = params.get("id");
      console.log(food);
      var data = null;
      var xhr = new XMLHttpRequest();

      var self = _assertThisInitialized(_this7);

      xhr.withCredentials = false;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          //sessionStorage.setItem("recipe", this.responseText)
          var json = JSON.parse(this.responseText); //////console.log(json);

          var recipe = {
            name: json.name,
            description: json.description || "",
            country: json.country,
            language: json.language,
            prepTimeMinutes: json.prep_time_minutes,
            cookTimeMinutes: json.cook_time_minutes,
            totalTimeMinutes: json.total_time_minutes,
            timeTier: json.total_time_tier,
            num_servings: json.num_servings,
            video: json.original_video_url,
            instructions: json.instructions,
            nutrition: json.nutrition,
            tags: json.tags,
            feed: json.recirc_feeds,
            credits: json.credits,
            thumbnail: json.thumbnail_url,
            topics: json.topics,
            rating: json.user_ratings
          }; ////console.log(recipe);

          var displayImg = document.body.querySelector("#recipeImg");
          displayImg.src = recipe.thumbnail;
          document.querySelector('#name').textContent = recipe.name;
          var details = document.querySelector("#details");
          details.innerHTML = "\n        <p>".concat(recipe.description, "</p>\n        <h2>Instructions:</h2>\n        ").concat(self.instructions(recipe.instructions)); //////console.log(this.responseText);
        }
      });
      console.log(id);
      xhr.open("GET", "https://tasty.p.rapidapi.com/recipes/detail?id=" + id);
      xhr.setRequestHeader("x-rapidapi-host", "tasty.p.rapidapi.com");
      xhr.setRequestHeader("x-rapidapi-key", "63f6ab95cemshe9b57c799d2aff1p19c240jsn4a5093e49c83");
      xhr.send(data);
    });

    console.log("Recipe");

    _this7.init();

    return _this7;
  }

  _createClass(Recipe, [{
    key: "init",
    value: function init() {
      this.getRecipe();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "content-wrap"
      }, /*#__PURE__*/React.createElement("h1", {
        className: "title"
      }, "Search Results"), /*#__PURE__*/React.createElement("nav", {
        className: "nav"
      }, /*#__PURE__*/React.createElement("div", {
        className: "linkWrap"
      }, /*#__PURE__*/React.createElement("a", {
        className: "link",
        id: "logout",
        href: "/logout"
      }, "Logout")), /*#__PURE__*/React.createElement("div", {
        className: "linkWrap"
      }, /*#__PURE__*/React.createElement("a", {
        className: "link",
        id: "logout",
        href: "/finder"
      }, "Finder")), /*#__PURE__*/React.createElement("div", {
        className: "linkWrap"
      }, /*#__PURE__*/React.createElement("a", {
        className: "link",
        id: "logout",
        href: "/playlist"
      }, "Playlist"))), /*#__PURE__*/React.createElement("h2", {
        id: "name"
      }, "TITLE"), /*#__PURE__*/React.createElement("p", {
        id: "p"
      }, "Hit the \"Save Recipe\" button to store a recipe in your list"), /*#__PURE__*/React.createElement("button", {
        id: "save",
        onClick: this.saveRecipe
      }, "Save Recipe"), /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, /*#__PURE__*/React.createElement("div", {
        id: "content"
      }, /*#__PURE__*/React.createElement("div", {
        id: "sel"
      }, /*#__PURE__*/React.createElement("div", {
        id: "selected"
      }, /*#__PURE__*/React.createElement("img", {
        id: "recipeImg",
        src: "#",
        alt: ""
      }), /*#__PURE__*/React.createElement("div", {
        id: "details"
      }))))));
    }
  }, {
    key: "displayRecipies",
    value: function displayRecipies(dataString) {
      var _data$results2;

      console.log("Parsing Recipies");
      var content = document.querySelector('#content');
      var data = dataString.result; ////console.log(dataString.results);
      //console.log(document.body);

      var u = 0; //sessionStorage.setItem("results", "")

      data === null || data === void 0 ? void 0 : (_data$results2 = data.results) === null || _data$results2 === void 0 ? void 0 : _data$results2.forEach(function (recipe) {
        //console.log(recipe);
        var recipeElement = document.createElement('recipe');

        if (u == 0) {////console.log(params);
        } // sessionStorage.setItem("recipe", JSON.stringify(recipe))


        recipeElement.innerHTML = "<img id=\"thumb\" src=".concat(recipe.thumbnail, "> </img>\n        <a href=\"javascript:void(0)\" recipe=\"").concat(recipe.id, "\" onclick={}>").concat(recipe.name, "</a>"); //let element = recipeElement.outerHTML
        //console.log(recipeElement);
        // console.log(content);

        content.append(recipeElement);
        u++;
      }); //sessionStorage.setItem("results", "")
    }
  }]);

  return Recipe;
}(React.Component);

var Playlist = /*#__PURE__*/function (_React$Component4) {
  _inherits(Playlist, _React$Component4);

  var _super4 = _createSuper(Playlist);

  function Playlist(props) {
    var _this8;

    _classCallCheck(this, Playlist);

    _this8 = _super4.call(this, props);

    _defineProperty(_assertThisInitialized(_this8), "handleResponse", function (e) {
      sessionStorage.setItem("playlist", e.target.responseText);
    });

    _defineProperty(_assertThisInitialized(_this8), "saveRecipe", function (e) {
      console.log("saveRecipe"); // console.log(e);

      var params = new URL(document.location).searchParams;
      var food = params.get("food") || sessionStorage.getItem("food");
      console.log(food);
      var tag = params.get("tag") || sessionStorage.getItem("tag");
      var id = params.get("id");
      var name = document.body.querySelector('#name').textContent;
      name = name.replace('&', "and");
      var thumbnail = document.body.querySelector('#recipeImg').src; ////console.log(thumbnail)

      var urlPath = "/recipe-playlist?food=".concat(food, "&tag=").concat(tag, "&id=").concat(id, "&name=").concat(name, "&thumbnail=").concat(thumbnail);
      console.log(urlPath);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", urlPath); //////console.log(xhr.HEADERS_RECEIVED)

      xhr.send();
      return true;
    });

    _defineProperty(_assertThisInitialized(_this8), "getPlaylist", function () {
      // remember that an `Event` object gets passed along every time that an event handler or listener calls a function
      // the `target` property of that event points at the element that sent the event, in this case a button
      //////console.log(`An element of id=${e.target.id} was clicked!`);
      var recipeURL = "/recipe-playlist";
      var xhr = new XMLHttpRequest();

      xhr.onload = function (e) {
        return _this8.handleResponse(e);
      };

      xhr.open("GET", recipeURL);
      xhr.setRequestHeader('Accept', "application/javascript");
      xhr.send();
    });

    console.log("Recipe");

    _this8.init();

    return _this8;
  }

  _createClass(Playlist, [{
    key: "init",
    value: function init() {
      var _this9 = this;

      this.getPlaylist();
      getSessionStorage("playlist", function (dataString) {
        //console.log(dataString);
        _this9.displayRecipies(JSON.parse(dataString));
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "content-wrap"
      }, /*#__PURE__*/React.createElement("h1", {
        className: "title"
      }, "Search Results"), /*#__PURE__*/React.createElement("nav", {
        className: "nav"
      }, /*#__PURE__*/React.createElement("div", {
        className: "linkWrap"
      }, /*#__PURE__*/React.createElement("a", {
        className: "link",
        id: "logout",
        href: "/logout"
      }, "Logout")), /*#__PURE__*/React.createElement("div", {
        className: "linkWrap"
      }, /*#__PURE__*/React.createElement("a", {
        className: "link",
        id: "logout",
        href: "/finder"
      }, "Finder"))), /*#__PURE__*/React.createElement("h2", {
        id: "name"
      }, "Playlist"), /*#__PURE__*/React.createElement("p", {
        id: "p"
      }), /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, /*#__PURE__*/React.createElement("div", {
        id: "content",
        "class": "results"
      })));
    }
  }, {
    key: "displayRecipies",
    value: function displayRecipies(dataString) {
      var content = document.body.querySelector('#content');
      var data = dataString.playlist; ////console.log(dataString.results);

      console.log(data);
      var u = 0; //sessionStorage.setItem("results", "")
      //console.log(data)

      data === null || data === void 0 ? void 0 : data.forEach(function (recipe) {
        if (recipe != null) {
          // console.log(recipe)
          var food = recipe.food;
          var tag = recipe.tag;
          content.innerHTML += "<div class=\"wrap\">\n                <img id=\"recipeImg\" src=".concat(recipe === null || recipe === void 0 ? void 0 : recipe.thumbnail, " alt=\"\">\n                <h3 recipe=\"").concat(recipe === null || recipe === void 0 ? void 0 : recipe.id, "\" id=\"foodName\" for=\"name\">").concat(recipe === null || recipe === void 0 ? void 0 : recipe.name, "</h3>\n                <p><b>Food:</b> ").concat(food, "</p>\n                <p><b>Tag:</b> ").concat(tag, "</p>\n                <p><b>ID:</b> ").concat(recipe === null || recipe === void 0 ? void 0 : recipe.id, "</p>\n                <input recipe=\"").concat(recipe === null || recipe === void 0 ? void 0 : recipe.id, "\" id=\"name\" name=\"name\" value=\"\"/>\n                <div id=\"buttonWrap\"><button idx=").concat(u, " recipe=\"").concat(recipe === null || recipe === void 0 ? void 0 : recipe.id, "\" onclick=\"save(this)\">Save Name</button> <button onclick=\"deleteRecipe(this)\" idx=").concat(u, " recipe=\"").concat(recipe === null || recipe === void 0 ? void 0 : recipe.id, "\">Delete</button></div>\n              </div>");
        }

        u++;
      }); //sessionStorage.setItem("results", "")
    }
  }]);

  return Playlist;
}(React.Component);

var createWindow = function createWindow(csrf) {
  //console.log(window.location.pathname);
  if (window.location.pathname == "/recipes") {
    ReactDOM.render( /*#__PURE__*/React.createElement(Display, null, /*#__PURE__*/React.createElement(Search, null)), document.getElementById("root") // querySelector("#nav")
    );
  } else if (window.location.pathname == "/recipe") {
    ReactDOM.render( /*#__PURE__*/React.createElement(Display, null, /*#__PURE__*/React.createElement(Recipe, null)), document.getElementById("root") // querySelector("#nav")
    );
  } else if (window.location.pathname == "/playlist") {
    ReactDOM.render( /*#__PURE__*/React.createElement(Display, null, /*#__PURE__*/React.createElement(Playlist, null)), document.getElementById("root") // querySelector("#nav")
    );
  } else {
    ReactDOM.render( /*#__PURE__*/React.createElement(Display, null, /*#__PURE__*/React.createElement(Finder, null)), document.getElementById("root") // querySelector("#nav")
    );
  } //React.createElement(LoginWindowJSX)

  /* ReactDOM.render(React.createElement(LoginWindow),
     document.querySelector("#content")
   );*/

};

var init = function init() {
  createWindow();
};

window.onload = init;
"use strict";

var handleDomo = function handleDomo(e) {
  e.preventDefault();
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoHeight").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  } //console.log($("#domoForm").serialize());


  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
    loadDomosFromServer();
  });
  return false;
};

var DomoForm = function DomoForm(props) {
  //console.log("PROP")
  //console.log(props)
  return /*#__PURE__*/React.createElement("form", {
    id: "domoForm",
    onSubmit: handleDomo,
    name: "domoForm",
    action: "/finder",
    method: "POST",
    className: "domoForm"
  }, /*#__PURE__*/React.createElement("label", {
    "for": "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "domoName",
    type: "text",
    name: "name",
    placeholder: "Domo Name"
  }), /*#__PURE__*/React.createElement("label", {
    "for": "age"
  }, "Age: "), /*#__PURE__*/React.createElement("input", {
    id: "domoAge",
    type: "text",
    name: "age",
    placeholder: "Domo Age"
  }), /*#__PURE__*/React.createElement("label", {
    "for": "height"
  }, "Height: "), /*#__PURE__*/React.createElement("input", {
    id: "domoHeight",
    type: "text",
    name: "height",
    placeholder: "Domo "
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeDomoSubmit",
    type: "submit",
    value: "Make Domo"
  }));
};

var DomoList = function DomoList(props) {
  if (props.domos.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "domoList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyDomo"
    }, "No Domos yet"));
  }

  var domoNodes = props.domos.map(function (domo) {
    return /*#__PURE__*/React.createElement("div", {
      key: domo._id,
      className: "domo"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/domoface.jpeg",
      alt: "domo face",
      className: "domoFace"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "domoName"
    }, "Name: ", domo.name), /*#__PURE__*/React.createElement("h3", {
      className: "domoAge"
    }, "Age: ", domo.age), /*#__PURE__*/React.createElement("h3", {
      className: "domoHeight"
    }, "Height: ", domo.height));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "domoList"
  }, domoNodes);
};

var loadDomosFromServer = function loadDomosFromServer() {
  //console.log("loadDomosFromServer")
  sendAjax('GET', '/getDomos', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
      domos: data.domos
    }), document.querySelector("#domos"));
  });
};

var setup = function setup(csrf) {
  //console.log(csrf)
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoForm, {
    csrf: csrf
  }), document.querySelector("#makeDomo"));
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
    domos: []
  }), document.querySelector("#domos"));
  loadDomosFromServer();
};

var getToken = function getToken() {
  //console.log("getToken")
  sendAjax('GET', '/getToken', null, function (result) {
    //console.log(result)
    setup(result.csrfToken);
  });
};
/*$(document).ready(function() {
    //console.log("Maker Init")
    //setup()
    getToken();
});*/
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      console.log("Error");
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
"use strict";

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: 'json',
    success: success,
    error: function error(xhr) {
      console.log('Error');
      console.log(xhr.responseText);
      var messageObj = JSON.parse(xhr.responseText);
      console.log(messageObj.error);
    }
  });
};

var getSessionStorage = function getSessionStorage(key, callback) {
  var data;
  var time = setInterval(function () {
    data = window.sessionStorage.getItem(key);

    if (data !== '' && data !== null) {
      data = callback(data);
      clearInterval(time);
    }
  }, 200);
};

var getStorage = function getStorage(key, callback) {
  var data;
  var time = setInterval(function () {
    data = window.localStorage.getItem(key);

    if (data !== '' && data !== null) {
      data = callback(data);
      clearInterval(time); // data = callback(data)

      return data; /// /console.log(data);
    }

    return data;
  }, 200);
  return data; /// /console.log(time);
};

var redirect = function redirect(location) {
  window.location = location;
};
