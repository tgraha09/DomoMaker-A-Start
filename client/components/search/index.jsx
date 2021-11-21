import React from 'react';
import PropTypes from 'prop-types';
import './search.css';
import { sendAjax, getStorage, getSessionStorage } from '../../utilities';
import $ from 'jquery'

export class Search extends React.Component{
    constructor(props){
      super(props);
      console.log("Search");
      this.init()
    }
  
    init(){
      //localStorage.setItem("results", "")
      //console.log("Project 1 Init");
      if(sessionStorage.getItem("results") === null || sessionStorage.getItem("results")===""){
        this.downloadRecipes()
      }
      
      
      getSessionStorage("results", (dataString)=>{
        //console.log(dataString);
        this.displayRecipies(JSON.parse(dataString))
        ////console.log(dataString);
        //displayRecipies(dataString)
        //sessionStorage.setItem("results", "")
      })
      
    }
    downloadRecipes(){
      
      let params = (new URL(document.location)).searchParams;
      let food = params.get("food");
      let tag = params.get("tag");
      
      const recipeURL = `/recipes-json?food=${food}&tag=${tag}`;
      const xhr = new XMLHttpRequest();
      
      xhr.onload = (e)=> this.handleResponse(e, food, tag)
      
      
      xhr.open("GET", recipeURL);
      xhr.setRequestHeader('Accept', "application/javascript");
      xhr.send();
    }

    handleResponse = (e, food, tag) =>{
      console.log(e.target.response);
      let userSearch = JSON.parse(e.target.response)
      console.log(userSearch)
      if(userSearch== undefined){
        //console.log("UNDEFINED");
      }
      
      sessionStorage.setItem("results", JSON.stringify(userSearch))
     
    }
  
    render(){
      return (<>
    <h1 className="title">Search Results</h1>
    <nav className="nav">  
        <div className="linkWrap" ><a className="link" id="logout" href="/logout" >Logout</a></div>
        <div className="linkWrap" ><a className="link" id="logout" href="#" >Recipe Client</a></div>
    
    </nav>
    <h3 className="desc">
      Results
    </h3>
    <div className="content">
    <div id="content">
    
    
    
      </div>
    
    
      </div>
      </>);
    }

    displayRecipies(dataString){
      console.log("Parsing Recipies");
      let content = document.querySelector('#content')
      let data = dataString.result
      ////console.log(dataString.results);
      //console.log(document.body);
      let u = 0;
      //sessionStorage.setItem("results", "")
      data?.results?.forEach(recipe => {
        //console.log(recipe);
        let recipeElement = document.createElement('recipe')
        
    
        if(u == 0){
          ////console.log(params);
        }
       // sessionStorage.setItem("recipe", JSON.stringify(recipe))
                  
        recipeElement.innerHTML = 
        `<img id="thumb" src=${recipe.thumbnail}> </img>
          <a href="javascript:void(0)" recipe="${recipe.id}" onclick="loadRecipe(this)">${recipe.name}</a>`
        //let element = recipeElement.outerHTML
        //console.log(recipeElement);
       // console.log(content);
        content.append(recipeElement)
        u++;
      });
      
      //sessionStorage.setItem("results", "")
    }
}