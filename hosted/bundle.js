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
      var recipeTagInput = $('.tagInput'); //document.body.querySelector('.tagInput')

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
      //sessionStorage.clear()
      //localStorage.setItem("results", "")
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

      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
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
        href: "#"
      }, "Recipe Client"))), /*#__PURE__*/React.createElement("h3", {
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
        defaultValue: "Chicken"
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

var Search = /*#__PURE__*/function (_React$Component2) {
  _inherits(Search, _React$Component2);

  var _super2 = _createSuper(Search);

  function Search(props) {
    var _this3;

    _classCallCheck(this, Search);

    _this3 = _super2.call(this, props);

    _defineProperty(_assertThisInitialized(_this3), "handleResponse", function (e, food, tag) {
      console.log(e.target.response);
      var userSearch = JSON.parse(e.target.response);
      console.log(userSearch);

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
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
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
        href: "#"
      }, "Recipe Client"))), /*#__PURE__*/React.createElement("h3", {
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
      var _data$results;

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


        recipeElement.innerHTML = "<img id=\"thumb\" src=".concat(recipe.thumbnail, "> </img>\n          <a href=\"javascript:void(0)\" recipe=\"").concat(recipe.id, "\" onclick=\"loadRecipe(this)\">").concat(recipe.name, "</a>"); //let element = recipeElement.outerHTML
        //console.log(recipeElement);
        // console.log(content);

        content.append(recipeElement);
        u++;
      }); //sessionStorage.setItem("results", "")
    }
  }]);

  return Search;
}(React.Component);

var createWindow = function createWindow(csrf) {
  //console.log(window.location.pathname);
  if (window.location.pathname == "/recipes") {
    ReactDOM.render( /*#__PURE__*/React.createElement(Display, null, /*#__PURE__*/React.createElement(Search, null)), document.getElementById("root") // querySelector("#nav")
    );
  } else {
    ReactDOM.render( /*#__PURE__*/React.createElement(Display, null, /*#__PURE__*/React.createElement(Finder, null)), document.getElementById("root") // querySelector("#nav")
    );
  } //React.createElement(LoginWindowJSX)

  /* ReactDOM.render(React.createElement(LoginWindow),
     document.querySelector("#content")
   );*/

};

var getLogin = function getLogin() {
  createWindow();
};

window.onload = getLogin;
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
