import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './client.css';
import { redirect, sendAjax } from '../../utilities';
import $ from 'jquery'
//http://localhost:4000/

export class SignupWindow extends React.Component{
    constructor(props){
      super(props);
      console.log("SignupWindow");
      this.state = {
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
      return `username=${sanitize(this.state.username)}&pass=${sanitize(this.state.pass)}&pass2=${sanitize(this.state.pass2)}`;
    }
  
    handleSignup(e){
      e.preventDefault();
      
      
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
      console.log(query)
      
      sendAjax(method,path,query,()=>{
        window.location = "/login"
      });
      //window.location = "/login"
      return false;
    }
  
    render(){
      return (<>
      <h1 className="title">Recipe Finder</h1>
        <nav className="nav">
        
        <div className="linkWrap" ><a className="link" id="login" href="/login">Login</a></div>
        <div className="linkWrap" ><a className="link" id="signup" href="/signup">Signup</a></div>
   
    </nav>
    <h3 className="desc">
      Search a recipe by its food and cuisine tag.
    </h3>
    <div className="content">
        <form id="signupForm"
          name="signupForm"
          onSubmit={this.handleSignup}
          action="/signup"
          method="POST"
          className="mainForm">
          <label htmlFor="username">Username: </label>
          <input id="user" type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}/>
          <label htmlFor="pass">Password: </label>
          <input id="pass" type="password" name="pass" placeholder="password" value={this.state.pass} onChange={this.handleChange}/>
          <label htmlFor="pass2">Password: </label>
          <input id="pass2" type="password" name="pass2" placeholder="retype password" value={this.state.pass2} onChange={this.handleChange}/>
          <input className="formSubmit" type="submit" value="Sign up" />
        </form>
      </div>
      </>);
    }
} 
  

export class LoginWindowJSX extends React.Component{
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
      console.log(query)
      sendAjax(method,path,query,()=>{
        window.location = "/finder"
      });
      
      return false;
    };
  
    render() {
      return (<>
      <h1 className="title">Recipe Finder</h1>
        <nav className="nav">
        
        <div className="linkWrap" ><a className="link" id="login" href="/login">Login</a></div>
        <div className="linkWrap" ><a className="link" id="signup" href="/signup">Signup</a></div>
   
    </nav>
    <h3 className="desc">
      Search a recipe by its food and cuisine tag.
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
      </div></>);
    }
}


export const LoadClients = (props)=>{
    console.log("LoadClients");
   /* sendAjax('GET', 'http://localhost:4000/getToken', null, (result)=>{
        sessionStorage.setItem("csrf", result.csrfToken.toString())
    })*/
    /*let token = getSessionStorage("csrf", (dataString)=>{
        let tokenString = dataString
        console.log({Latest: tokenString});
        return tokenString
    })*/
    //console.log(token);
    let pathname = location.pathname
    if(pathname==="/signup"){
        return (<SignupWindow>
          
            </SignupWindow>)
    }
      return (<LoginWindow>
          
        </LoginWindow>)
}


