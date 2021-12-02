const Display = ({ ...props }) => {
    
    
    return (<main 
    className="main"
    {...props}>
    <section className="main-inner">
    {props.children}
    </section>
    </main>)
}

class Finder extends React.Component{
    constructor(props){
      super(props);
      console.log("Finder");
      
      this.init()
    }
  
    search = (e)=>{
      
      //console.log("FORM BUTTON");
      let recipeTagInput = $('#tagInput') //document.body.querySelector('.tagInput')
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
      sessionStorage.removeItem("food")
      sessionStorage.removeItem("tag")
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
        //sessionStorage.clear("food")
        //sessionStorage.setItem("food", "")
        //sessionStorage.setItem("tag", "")
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
      return (<div className="content-wrap">
    <h1 className="title">Recipe Finder</h1>
    <nav className="nav">  
        <div className="linkWrap" ><a className="link" id="logout" href="/logout" >Logout</a></div>
        <div className="linkWrap" ><a className="link" id="logout" href="/recipes" >Search Results</a></div>
        
    
    </nav>
    <h3 className="desc">
      Search a recipe by its food and cuisine tag.
    </h3>
    <div className="content">
    
    
    <form className="mainForm" id="searchform" method="POST" action="/recipes-json" >
    <div id="formwrap">
        <div id="foodWrap">
          <label htmlFor="food">Pick Food</label><br/>
          <input className="input" type="text" id="food" name="food" defaultValue="Beef"/><br/>
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
      </div>);
    }
}

let recipeName 

class Search extends React.Component{
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
      //console.log(e.target.response);
      let userSearch = JSON.parse(e.target.response)
      //console.log(userSearch)
      if(userSearch== undefined){
        //console.log("UNDEFINED");
      }
      
      sessionStorage.setItem("results", JSON.stringify(userSearch))
     
    }

    
  
    render(){
      return (<div className="content-wrap">
    <h1 className="title">Search Results</h1>
    <nav className="nav">  
        <div className="linkWrap" ><a className="link" id="logout" href="/logout" >Logout</a></div>
        <div className="linkWrap" ><a className="link" id="logout" href="/finder" >Finder</a></div>
        <div className="linkWrap" ><a className="link" id="logout" href="/recipes" >Search Results</a></div>
        
    </nav>
    <h3 className="desc">
      Results
    </h3>
    <div className="content">
    <div id="content">
    
    
    
      </div>
    
    
      </div>
      </div>);
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
        let link = document.createElement('a')
        let params = (new URL(document.location)).searchParams;
        let recipePath = `/recipe?food=${params.get("food")}&tag=${params.get("tag")}&id=${recipe.id}`
        link.href = recipePath
        link.recipe= recipe.id
        link.textContent = recipe.name
        
        recipeElement.innerHTML = 
        `<img id="thumb" src=${recipe.thumbnail}> </img>` + link.outerHTML //<a href="javascript:void(0)" recipe="${recipe.id}" onclick=${loadRecipe(recipe.id)}>${recipe.name}</a>
        //let element = recipeElement.outerHTML
        //console.log(recipeElement);
       // console.log(content);
        link.addEventListener('click', (e)=>{
          e.preventDefault()
          console.log("click");
          this.loadRecipe(e.target)
        })
        content.append(recipeElement)
        u++;
      });
      
      //sessionStorage.setItem("results", "")
    }
}

class Recipe extends React.Component{
  constructor(props){
    super(props);
    console.log("Recipe");
    this.init()
  }

  init(){
    this.getRecipe()
    
    
  }

  instructions = (instructObj)=>{
    let orderedList = document.createElement("ol")
    orderedList.id = "instructions"
    instructObj.forEach(obj => {
      orderedList.innerHTML+= `<li>${obj.display_text}</li>`
      //////console.log(obj.display_text);
    });
    return orderedList.outerHTML
  }

  saveRecipe = (e) => {
    console.log("saveRecipe");
   // console.log(e);
    let params = (new URL(document.location)).searchParams;
    let food = params.get("food")|| sessionStorage.getItem("food")
    console.log(food)
    let tag = params.get("tag") || sessionStorage.getItem("tag")
    let id = params.get("id");
    let name = document.body.querySelector('#name').textContent
    name = name.replace('&', "and")
    let thumbnail = document.body.querySelector('#recipeImg').src
    ////console.log(thumbnail)
    let urlPath = `/recipe-playlist?food=${food}&tag=${tag}&id=${id}&name=${name}&thumbnail=${thumbnail}`
    console.log(urlPath);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", urlPath);
    //////console.log(xhr.HEADERS_RECEIVED)
    xhr.send();
    
    return true;
  };

  getRecipe = () => {
    // remember that an `Event` object gets passed along every time that an event handler or listener calls a function
    // the `target` property of that event points at the element that sent the event, in this case a button
    //////console.log(`An element of id=${e.target.id} was clicked!`);
    let params = (new URL(document.location)).searchParams;
    let food = params.get("food")// || sessionStorage.getItem("food")
    let tag = params.get("tag") //|| sessionStorage.getItem("tag")
    let id = params.get("id")
    console.log(food)
    const data = null;
    const xhr = new XMLHttpRequest();
    let self = this
  
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        //sessionStorage.setItem("recipe", this.responseText)
        let json = JSON.parse(this.responseText)
        //////console.log(json);
        const recipe = {
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
          rating: json.user_ratings,
        };
        ////console.log(recipe);
        
        let displayImg = document.body.querySelector("#recipeImg")
        displayImg.src = recipe.thumbnail
        document.querySelector('#name').textContent = recipe.name
        let details = document.querySelector("#details")
        details.innerHTML = `
        <p>${recipe.description}</p>
        <h2>Instructions:</h2>
        ${self.instructions(recipe.instructions)}`
        //////console.log(this.responseText);
      }
    });
    console.log(id);
    xhr.open("GET", "https://tasty.p.rapidapi.com/recipes/detail?id="+id);
    xhr.setRequestHeader("x-rapidapi-host", "tasty.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "63f6ab95cemshe9b57c799d2aff1p19c240jsn4a5093e49c83");

    xhr.send(data);
  }

  

  render(){


    
    return (<div className="content-wrap">
  <h1 className="title">Search Results</h1>
  <nav className="nav">  
      <div className="linkWrap" ><a className="link" id="logout" href="/logout" >Logout</a></div>
      <div className="linkWrap" ><a className="link" id="logout" href="/finder" >Finder</a></div>
     
  
  </nav>
  <h2 id="name">TITLE</h2>
  <p id="p">Hit the "Save Recipe" button to store a recipe in your list</p>
  <button id="save" onClick={this.saveRecipe}>Save Recipe</button>
  <div className="content">
  <div id="content">
  
    <div id="sel">
      <div id="selected">
        <img id="recipeImg" src="#" alt=""/>
        <div id="details">
      </div>
    </div>
    </div>
  
  
    </div>
  
  
    </div>
    </div>);
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
        <a href="javascript:void(0)" recipe="${recipe.id}" onclick={}>${recipe.name}</a>`
      //let element = recipeElement.outerHTML
      //console.log(recipeElement);
     // console.log(content);
      content.append(recipeElement)
      u++;
    });
    
    //sessionStorage.setItem("results", "")
  }
}

class Playlist extends React.Component{
  constructor(props){
    super(props);
    console.log("Recipe");
    this.init()
  }

  init(){
    this.getRecipe()
    
    
  }

  instructions = (instructObj)=>{
    let orderedList = document.createElement("ol")
    orderedList.id = "instructions"
    instructObj.forEach(obj => {
      orderedList.innerHTML+= `<li>${obj.display_text}</li>`
      //////console.log(obj.display_text);
    });
    return orderedList.outerHTML
  }

  saveRecipe = (e) => {
    console.log("saveRecipe");
   // console.log(e);
    let params = (new URL(document.location)).searchParams;
    let food = params.get("food")|| sessionStorage.getItem("food")
    console.log(food)
    let tag = params.get("tag") || sessionStorage.getItem("tag")
    let id = params.get("id");
    let name = document.body.querySelector('#name').textContent
    name = name.replace('&', "and")
    let thumbnail = document.body.querySelector('#recipeImg').src
    ////console.log(thumbnail)
    let urlPath = `/recipe-playlist?food=${food}&tag=${tag}&id=${id}&name=${name}&thumbnail=${thumbnail}`
    console.log(urlPath);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", urlPath);
    //////console.log(xhr.HEADERS_RECEIVED)
    xhr.send();
    
    return true;
  };

  getRecipe = () => {
    // remember that an `Event` object gets passed along every time that an event handler or listener calls a function
    // the `target` property of that event points at the element that sent the event, in this case a button
    //////console.log(`An element of id=${e.target.id} was clicked!`);
    let params = (new URL(document.location)).searchParams;
    let food = params.get("food")// || sessionStorage.getItem("food")
    let tag = params.get("tag") //|| sessionStorage.getItem("tag")
    let id = params.get("id")
    console.log(food)
    const data = null;
    const xhr = new XMLHttpRequest();
    let self = this
  
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        //sessionStorage.setItem("recipe", this.responseText)
        let json = JSON.parse(this.responseText)
        //////console.log(json);
        const recipe = {
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
          rating: json.user_ratings,
        };
        ////console.log(recipe);
        
        let displayImg = document.body.querySelector("#recipeImg")
        displayImg.src = recipe.thumbnail
        document.querySelector('#name').textContent = recipe.name
        let details = document.querySelector("#details")
        details.innerHTML = `
        <p>${recipe.description}</p>
        <h2>Instructions:</h2>
        ${self.instructions(recipe.instructions)}`
        //////console.log(this.responseText);
      }
    });
    console.log(id);
    xhr.open("GET", "https://tasty.p.rapidapi.com/recipes/detail?id="+id);
    xhr.setRequestHeader("x-rapidapi-host", "tasty.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "63f6ab95cemshe9b57c799d2aff1p19c240jsn4a5093e49c83");

    xhr.send(data);
  }

  

  render(){


    
    return (<div className="content-wrap">
  <h1 className="title">Search Results</h1>
  <nav className="nav">  
      <div className="linkWrap" ><a className="link" id="logout" href="/logout" >Logout</a></div>
      <div className="linkWrap" ><a className="link" id="logout" href="#" >Recipe Client</a></div>
  
  </nav>
  <h2 id="name">TITLE</h2>
  <p id="p">Hit the "Save Recipe" button to store a recipe in your list</p>
  <button id="save" onClick={this.saveRecipe}>Save Recipe</button>
  <div className="content">
  <div id="content">
  
    <div id="sel">
      <div id="selected">
        <img id="recipeImg" src="#" alt=""/>
        <div id="details">
      </div>
    </div>
    </div>
  
  
    </div>
  
  
    </div>
    </div>);
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
        <a href="javascript:void(0)" recipe="${recipe.id}" onclick={}>${recipe.name}</a>`
      //let element = recipeElement.outerHTML
      //console.log(recipeElement);
     // console.log(content);
      content.append(recipeElement)
      u++;
    });
    
    //sessionStorage.setItem("results", "")
  }
}

const createWindow = csrf => {
    //console.log(window.location.pathname);
    if(window.location.pathname=="/recipes"){
      ReactDOM.render(<Display>
          <Search />
      </Display>,
        document.getElementById("root")// querySelector("#nav")
      );
    }
    else if(window.location.pathname=="/recipe"){
      ReactDOM.render(<Display>
          <Recipe />
      </Display>,
        document.getElementById("root")// querySelector("#nav")
      );
    }
    else{
      ReactDOM.render(<Display>
          <Finder />
      </Display>,
        document.getElementById("root")// querySelector("#nav")
      ); 
    }
  //React.createElement(LoginWindowJSX)
 /* ReactDOM.render(React.createElement(LoginWindow),
    document.querySelector("#content")
  );*/
};

const init = ()=>{
    createWindow()
}

  window.onload = init;