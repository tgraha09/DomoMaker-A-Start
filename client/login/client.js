
const handleLogin = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width: 'hide'}, 350);

    if($("#user").val() ==='' || $("#pass").val() === ''){
        handleError("RAWR! Username or password is empty");
        return false;
    }

    console.log($("#input[name=_csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
}

const handleSignup = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width: 'hide'}, 350);

    if($("#user").val() ==='' || $("#pass").val() === '' || $("#pass2").val() === ''){
        handleError("RAWR! All fields are required");
        return false;
    }

    if($("#pass").val() !== $("#pass2").val()){
        handleError("RAWR! Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
}

const LoginWindow = (props) => {
    //console.log(props)
    return (
        <form  id="loginForm" name="loginForm"
            onSubmit={handleLogin} 
            action="/login" 
            method="POST" 
            class="mainForm"
            className="mainForm"
      >
      <label for="username">Username: </label>
      <input id="user" type="text" name="username" placeholder="username"/>
      <label for="pass">Password: </label>
      <input id="pass" type="password" name="pass" placeholder="password"/>
      <input type="hidden" name="_csrf" value={props.csrf} />
      <input class="formSubmit" className="formSubmit" type="submit" value="Sign In" />
      
    </form>
    );
};

const SignupWindow = (props) => {
    //console.log(props)
    return (
        
        <form  id="signupForm" 
            name="signupForm"
            onSubmit={handleSignup} 
            action="/signup" 
            method="POST" 
            class="mainForm"
            className="mainForm"
            >
      <label for="username">Username: </label>
      <input id="user" type="text" name="username" placeholder="username"/>
      <label for="pass">Password: </label>
      <input id="pass" type="password" name="pass" placeholder="password"/>
      <label for="pass2">Password: </label>
      <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
      <input type="hidden" name="_csrf" value={props.csrf} />
      <input class="formSubmit" className="formSubmit" type="submit" value="Sign In" />
    </form>
    );
};

const createLoginWindow = (csrf) =>{
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createSignupWindow = (csrf) =>{
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const setup = (csrf) =>{
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton")
   // console.log(csrf);
    //createSignupWindow(csrf);
    //createLoginWindow(csrf);
    if(location.pathname === '/'){
        //console.log(location.pathname)
        loginButton.addEventListener("click", (e)=>{
            e.preventDefault();
            createLoginWindow(csrf);
            return false;
        });
    
        signupButton.addEventListener("click", (e) => {
            e.preventDefault();
            createSignupWindow(csrf);
            return false;
        });
        createLoginWindow(csrf); //default view
    }
    

    

    
};

const getToken = () => {
    //console.log("getToken")
    
    sendAjax('GET', '/getToken', null, (result)=>{
        //console.log(result)
        
        setup(result.csrfToken);
    });
};

//console.log("Init")

$(document).ready(function() {
    //console.log("Init")
    //setup()
    getToken();
});