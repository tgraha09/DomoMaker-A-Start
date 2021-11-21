import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import './finder.css';
import { sendAjax, getStorage } from '../../utilities';
import $ from 'jquery'

export class Finder extends React.Component{
    constructor(props){
      super(props);
      console.log("Finder");
      
      this.init()
    }
  
    search = (e)=>{
      
      //console.log("FORM BUTTON");
      let recipeTagInput = $('.tagInput') //document.body.querySelector('.tagInput')
      let searchFood = $('#food') // document.body.querySelector('#food')
      let food = searchFood.val() //.value || searchFood.defaultValue
      let tag = recipeTagInput.val() || "american" //.value || recipeTagInput.defaultValue
      sessionStorage.setItem("food", food)
      sessionStorage.setItem("tag", tag)
      const formAction = searchform.getAttribute("action");
      const formMethod = searchform.getAttribute("method");
      //let data = `?food=${food}&tag=${tag}` //`/recipes-client?food=${food}&tag=${tag}`
      let data = formAction + `?&food=${food}&tag=${tag}`
      console.log(data)
      
      sendAjax(formMethod,'/recipes-json',data,()=>{
        console.log({data});
        console.log(`Send to ${formAction}`);
      });
      setTimeout(() => {
        
       window.location = `/recipes?&food=${food}&tag=${tag}`
      }, 2000);
      //window.location = `/recipes?&food=${food}&tag=${tag}`
      
      //console.log("Sent");
    }
  
    

    init(){//form="searchform"
      //sessionStorage.setItem('results', null)
      sessionStorage.removeItem('results')
      if(sessionStorage.getItem("tagsList") === null || sessionStorage.getItem("tagsList")===""){
        console.log("Getting Tags");
        this.getTags()
      }
        
        
        getStorage("tagsList",(data)=>{
          //console.log(data);
        let recipeTags = $('#recipeTags')
        let recipeTagInput = $('#tagInput')

        //let client = document.body.querySelector('#client')
        //client.onclick = search
        recipeTagInput.textContent = "ok"
        recipeTagInput.recipeTags = []
        
        let searchFood = $('#food')
       // recipeTagInput.value = ""
        let searchform = $('#searchform')
          let tags = JSON.parse(data).results
          tags.forEach(tag => {
          ////console.log(tag);
          let tagValue = tag.name
          let tagName = tag.display_name
          let option = document.createElement("option")
          option.id ="tag"
          recipeTagInput.recipeTags[tagName] = {
            tag: tagValue, 
            option
          }
          option.value = tagValue
          option.text = tagName
          //console.log(option);
          //recipeTags
          recipeTags.append(option)
        
        });


      })

      }

      getTags(){
        //sessionStorage.clear()
        //localStorage.setItem("results", "")
        const data = null;
        const xhr = new XMLHttpRequest();
        //xhr.withCredentials = true;
        xhr.withCredentials = false

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === this.DONE) {
            sessionStorage.setItem("tagsList", this.responseText)
            ////console.log(this.responseText);
          }
        });

        xhr.open("GET", "https://tasty.p.rapidapi.com/tags/list");
        xhr.setRequestHeader("x-rapidapi-host", "tasty.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "170e038a70mshc48a677384b7b29p120f51jsn123cfd31d18c");
        
        xhr.send(data);
      }
  
    render(){
      return (<>
    <h1 className="title">Recipe Finder</h1>
    <nav className="nav">  
        <div className="linkWrap" ><a className="link" id="logout" href="/logout" >Logout</a></div>
        <div className="linkWrap" ><a className="link" id="logout" href="#" >Recipe Client</a></div>
    
    </nav>
    <h3 className="desc">
      Search a recipe by its food and cuisine tag.
    </h3>
    <div className="content">
    
    
    <form className="mainForm" id="searchform" method="POST" action="/recipes-json" >
    <div id="formwrap">
        <div id="foodWrap">
          <label htmlFor="food">Pick Food</label><br/>
          <input className="input" type="text" id="food" name="food" defaultValue="Chicken"/><br/>
        </div>
        <div id="tagWrap">
          <label htmlFor="tag">Select Tag</label><br/>
          <input className="input" id="tagInput" type="text" name="tag" list="recipeTags" />
          <datalist  name="recipeTags" id="recipeTags" >
            <option id="tag"></option>
          </datalist>
          
        </div>
        <input id="submitbtn" type="submit" onClick={(e)=>{e.preventDefault() 
          this.search(e)}} onChange={()=>{console.log("Changed");}}></input>
      </div>
    </form> 
      </div>
      </>);
    }
}