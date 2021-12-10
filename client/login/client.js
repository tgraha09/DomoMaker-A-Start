

  class LoginWindow extends React.Component{
    constructor(props){
      super(props);
      console.log("LoginWindow");
      
      this.state = {
        username: "",
        pass: "",
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
      
    }
  
    handleChange(e){
      this.setState({[e.target.name]: e.target.value});
    }
  
    checkFields(){
      return !(this.state.username == '' || this.state.pass == '');
    }
  
    createQuery(){
      const sanitize = str => encodeURIComponent(str.toString().trim());
      return `username=${sanitize(this.state.username)}&pass=${sanitize(this.state.pass)}`;
    }
  
    handleLogin(e){
      e.preventDefault();
      
    
      if(!this.checkFields()){
        alert("RAWR! Username or password is empty")
        return false;
      }
  
      const method = "POST";
      const path = document.querySelector("#loginForm").getAttribute("action");
      const query = this.createQuery();
     //const completionCallback = redirect("/finder");
     console.log("LOGIN")
      console.log(query)
      //console.log("LoginCLIENT");
      sendAjax(method,path,query,()=>{
        window.location = "/finder"
      });
      
      return false;
    };
  
    render() {
      sessionStorage.clear()
      return (<div className="content-wrap">
      <h1 className="title">Recipe Finder</h1>
        <nav className="nav">
        
        <div className="linkWrap" ><a className="link" id="login" href="/login">Login</a></div>
        <div className="linkWrap" ><a className="link" id="signup" href="/signup">Signup</a></div>
   
    </nav>
    <h3 className="desc">
      Login
    </h3>
      <div className="content">
        
        <form id="loginForm" name="loginForm"
          onSubmit={this.handleLogin}
          action="/login"
          method="POST"
          className="mainForm">
          <label htmlFor="username">Username: </label>
          <input id="user" type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}/>
          <label htmlFor="pass">Password: </label>
          <input id="pass" type="password" name="pass" placeholder="password" value={this.state.pass} onChange={this.handleChange}/>
          <input className="formSubmit" type="submit" value="Sign in"/>
        </form>
      </div></div>);
    }
}


const Display = ({ ...props }) => {
    
    
    return (<main 
    className="main"
    {...props}>
    <section className="main-inner">
    {props.children}
    </section>
    </main>)
}


  
  class SignupWindow extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        csrf: props.csrf,
        username: "",
        pass: "",
        pass2: "",
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSignup = this.handleSignup.bind(this);
    }
  
    handleChange(e){
      this.setState({[e.target.name]: e.target.value});
    }
  
    checkFields(){
      return !(this.state.username == '' || this.state.pass == '' || this.state.pass2 == '');
     }
  
    checkPasswords(){
      return this.state.pass == this.state.pass2;
    }
  
    createQuery(){
      const sanitize = str => encodeURIComponent(str.toString().trim());
      return `username=${sanitize(this.state.username)}&pass=${sanitize(this.state.pass)}&pass2=${sanitize(this.state.pass2)}&_csrf=${this.state.csrf}`;
    }
  
    handleSignup(e){
      e.preventDefault();
      //$("#domoMessage").animate({width:'hide'},350);
      
      if(!this.checkFields()){
        alert("RAWR! All fields are required!");
        return false;
      }
  
      if(!this.checkPasswords()){
        alert("RAWR! Passwords do not match!");
        return false;
      }
      
      const method = "POST";
      const path = document.querySelector("#signupForm").getAttribute("action");
      const query = this.createQuery();
     // const completionCallback = redirect;
      sendAjax(method,path,query,()=>{
        window.location = "/login"
      });
    
      return false;
    }
  
    render(){
      return (
        <div className="content-wrap">
            <h1 className="title">Recipe Finder</h1>
        <nav className="nav">
        
        <div className="linkWrap" ><a className="link" id="login" href="/login">Login</a></div>
        <div className="linkWrap" ><a className="link" id="signup" href="/signup">Signup</a></div>
   
    </nav>
    <h3 className="desc">
      Signup
    </h3>
        <div id="content">
        <form id="signupForm"
          name="signupForm"
          onSubmit={this.handleSignup}
          action="/signup"
          method="POST"
          className="mainForm"
        >
            
          <label htmlFor="username">Username: </label>
          <input id="user" type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}/>
          <label htmlFor="pass">Password: </label>
          <input id="pass" type="password" name="pass" placeholder="password" value={this.state.pass} onChange={this.handleChange}/>
          <label htmlFor="pass2">Password: </label>
          <input id="pass2" type="password" name="pass2" placeholder="retype password" value={this.state.pass2} onChange={this.handleChange}/>
          <input type="hidden" name="_csrf" value={this.state.csrf} />
          <input className="formSubmit" type="submit" value="Sign up" />
        </form>
        </div>
        </div>
      );
    }
  } 
  
  
  
  // II. Helper Functions
  const createWindow = csrf => {
      //console.log(window.location.pathname);
      if(window.location.pathname=="/signup"){
        ReactDOM.render(<Display>
            <SignupWindow />
        </Display>,
          document.getElementById("root")// querySelector("#nav")
        );
      }
      else{
        ReactDOM.render(<Display>
            <LoginWindow />
        </Display>,
          document.getElementById("root")// querySelector("#nav")
        ); 
      }
    //React.createElement(LoginWindowJSX)
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

  const getLogin = ()=>{
    createWindow()
  }
  
  // III. Initialization
  window.onload = getLogin;