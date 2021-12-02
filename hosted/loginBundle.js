"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var LoginWindowJSX = /*#__PURE__*/function (_React$Component) {
  _inherits(LoginWindowJSX, _React$Component);

  var _super = _createSuper(LoginWindowJSX);

  function LoginWindowJSX(props) {
    var _this;

    _classCallCheck(this, LoginWindowJSX);

    _this = _super.call(this, props);
    console.log("LoginWindow");
    _this.state = {
      username: "",
      pass: ""
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleLogin = _this.handleLogin.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(LoginWindowJSX, [{
    key: "handleChange",
    value: function handleChange(e) {
      this.setState(_defineProperty({}, e.target.name, e.target.value));
    }
  }, {
    key: "checkFields",
    value: function checkFields() {
      return !(this.state.username == '' || this.state.pass == '');
    }
  }, {
    key: "createQuery",
    value: function createQuery() {
      var sanitize = function sanitize(str) {
        return encodeURIComponent(str.toString().trim());
      };

      return "username=".concat(sanitize(this.state.username), "&pass=").concat(sanitize(this.state.pass));
    }
  }, {
    key: "handleLogin",
    value: function handleLogin(e) {
      e.preventDefault();

      if (!this.checkFields()) {
        alert("RAWR! Username or password is empty");
        return false;
      }

      var method = "POST";
      var path = document.querySelector("#loginForm").getAttribute("action");
      var query = this.createQuery(); //const completionCallback = redirect("/finder");

      console.log("LOGIN");
      console.log(query); //console.log("LoginCLIENT");

      sendAjax(method, path, query, function () {
        window.location = "/finder";
      });
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      sessionStorage.clear();
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
        id: "login",
        href: "/login"
      }, "Login")), /*#__PURE__*/React.createElement("div", {
        className: "linkWrap"
      }, /*#__PURE__*/React.createElement("a", {
        className: "link",
        id: "signup",
        href: "/signup"
      }, "Signup"))), /*#__PURE__*/React.createElement("h3", {
        className: "desc"
      }, "Login"), /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, /*#__PURE__*/React.createElement("form", {
        id: "loginForm",
        name: "loginForm",
        onSubmit: this.handleLogin,
        action: "/login",
        method: "POST",
        className: "mainForm"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "username"
      }, "Username: "), /*#__PURE__*/React.createElement("input", {
        id: "user",
        type: "text",
        name: "username",
        placeholder: "username",
        value: this.state.username,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement("label", {
        htmlFor: "pass"
      }, "Password: "), /*#__PURE__*/React.createElement("input", {
        id: "pass",
        type: "password",
        name: "pass",
        placeholder: "password",
        value: this.state.pass,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement("input", {
        className: "formSubmit",
        type: "submit",
        value: "Sign in"
      }))));
    }
  }]);

  return LoginWindowJSX;
}(React.Component);

var Display = function Display(_ref) {
  var props = _extends({}, _ref);

  return /*#__PURE__*/React.createElement("main", _extends({
    className: "main"
  }, props), /*#__PURE__*/React.createElement("section", {
    className: "main-inner"
  }, props.children));
};

var SignupWindow = /*#__PURE__*/function (_React$Component2) {
  _inherits(SignupWindow, _React$Component2);

  var _super2 = _createSuper(SignupWindow);

  function SignupWindow(props) {
    var _this2;

    _classCallCheck(this, SignupWindow);

    _this2 = _super2.call(this, props);
    _this2.state = {
      csrf: props.csrf,
      username: "",
      pass: "",
      pass2: ""
    };
    _this2.handleChange = _this2.handleChange.bind(_assertThisInitialized(_this2));
    _this2.handleSignup = _this2.handleSignup.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(SignupWindow, [{
    key: "handleChange",
    value: function handleChange(e) {
      this.setState(_defineProperty({}, e.target.name, e.target.value));
    }
  }, {
    key: "checkFields",
    value: function checkFields() {
      return !(this.state.username == '' || this.state.pass == '' || this.state.pass2 == '');
    }
  }, {
    key: "checkPasswords",
    value: function checkPasswords() {
      return this.state.pass == this.state.pass2;
    }
  }, {
    key: "createQuery",
    value: function createQuery() {
      var sanitize = function sanitize(str) {
        return encodeURIComponent(str.toString().trim());
      };

      return "username=".concat(sanitize(this.state.username), "&pass=").concat(sanitize(this.state.pass), "&pass2=").concat(sanitize(this.state.pass2), "&_csrf=").concat(this.state.csrf);
    }
  }, {
    key: "handleSignup",
    value: function handleSignup(e) {
      e.preventDefault(); //$("#domoMessage").animate({width:'hide'},350);

      if (!this.checkFields()) {
        handleError("RAWR! All fields are required!");
        return false;
      }

      if (!this.checkPasswords()) {
        handleError("RAWR! Passwords do not match!");
        return false;
      }

      var method = "POST";
      var path = document.querySelector("#signupForm").getAttribute("action");
      var query = this.createQuery(); // const completionCallback = redirect;

      sendAjax(method, path, query, function () {
        window.location = "/login";
      });
      return false;
    }
  }, {
    key: "render",
    value: function render() {
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
        id: "login",
        href: "/login"
      }, "Login")), /*#__PURE__*/React.createElement("div", {
        className: "linkWrap"
      }, /*#__PURE__*/React.createElement("a", {
        className: "link",
        id: "signup",
        href: "/signup"
      }, "Signup"))), /*#__PURE__*/React.createElement("h3", {
        className: "desc"
      }, "Signup"), /*#__PURE__*/React.createElement("div", {
        id: "content"
      }, /*#__PURE__*/React.createElement("form", {
        id: "signupForm",
        name: "signupForm",
        onSubmit: this.handleSignup,
        action: "/signup",
        method: "POST",
        className: "mainForm"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "username"
      }, "Username: "), /*#__PURE__*/React.createElement("input", {
        id: "user",
        type: "text",
        name: "username",
        placeholder: "username",
        value: this.state.username,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement("label", {
        htmlFor: "pass"
      }, "Password: "), /*#__PURE__*/React.createElement("input", {
        id: "pass",
        type: "password",
        name: "pass",
        placeholder: "password",
        value: this.state.pass,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement("label", {
        htmlFor: "pass2"
      }, "Password: "), /*#__PURE__*/React.createElement("input", {
        id: "pass2",
        type: "password",
        name: "pass2",
        placeholder: "retype password",
        value: this.state.pass2,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement("input", {
        type: "hidden",
        name: "_csrf",
        value: this.state.csrf
      }), /*#__PURE__*/React.createElement("input", {
        className: "formSubmit",
        type: "submit",
        value: "Sign up"
      }))));
    }
  }]);

  return SignupWindow;
}(React.Component); // II. Helper Functions


var createWindow = function createWindow(csrf) {
  //console.log(window.location.pathname);
  if (window.location.pathname == "/signup") {
    ReactDOM.render( /*#__PURE__*/React.createElement(Display, null, /*#__PURE__*/React.createElement(SignupWindow, null)), document.getElementById("root") // querySelector("#nav")
    );
  } else {
    ReactDOM.render( /*#__PURE__*/React.createElement(Display, null, /*#__PURE__*/React.createElement(LoginWindowJSX, null)), document.getElementById("root") // querySelector("#nav")
    );
  } //React.createElement(LoginWindowJSX)

  /* ReactDOM.render(React.createElement(LoginWindow),
     document.querySelector("#content")
   );*/

};
/*const createSignupWindow = csrf => {
  ReactDOM.render(
    <LoginPageNav csrf={csrf} />,
    document.querySelector("#content")
  );
  ReactDOM.render(
    <SignupWindow csrf={csrf} />,
    document.querySelector("#content")
  );
};*/

/* const getToken = () => {
   const completionCallback = result => createLoginWindow(result.csrfToken);
   sendAjax('GET', '/getToken', null, completionCallback);
 };*/


var getLogin = function getLogin() {
  createWindow();
}; // III. Initialization


window.onload = getLogin;
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
