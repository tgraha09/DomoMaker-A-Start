const handleDomo = (e) =>{
    e.preventDefault();

    $("#domoMessage").animate({width: 'hide'}, 350);

    if($("#domoName").val() == '' || $("#domoAge").val() ==''|| $("#domoHeight").val() ==''){
        handleError("RAWR! All fields are required");
        return false;
    }
    //console.log($("#domoForm").serialize());
    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function (){
        loadDomosFromServer();
    });

    return false;
}

const DomoForm = (props) => {
    //console.log("PROP")
    //console.log(props)
    return (
        <form id="domoForm" 
        onSubmit={handleDomo} 
        name="domoForm"
        action="/finder" 
        method="POST" 
        className="domoForm">

      <label for="name">Name: </label>
      <input id="domoName" type="text" name="name" placeholder="Domo Name"/>
      <label for="age">Age: </label>
      <input id="domoAge" type="text" name="age" placeholder="Domo Age"/>
      <label for="height">Height: </label>
      <input id="domoHeight" type="text" name="height" placeholder="Domo "/>
      <input type="hidden" name="_csrf" value={props.csrf} />
      <input className="makeDomoSubmit" type="submit" value="Make Domo" />
    </form>
    );
};

const DomoList = function(props) {
    if(props.domos.length === 0 ){
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos yet</h3>
            </div>
        )
    }

    const domoNodes = props.domos.map(function(domo){
        return (
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace"/>
                <h3 className="domoName">Name: {domo.name}</h3>
                <h3 className="domoAge">Age: {domo.age}</h3>
                <h3 className="domoHeight">Height: {domo.height}</h3>
            </div>
        )
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const loadDomosFromServer = () =>{
    //console.log("loadDomosFromServer")
    sendAjax('GET', '/getDomos', null, (data)=>{
        ReactDOM.render(
            <DomoList domos={data.domos} />,
            document.querySelector("#domos")
        );
    });
}

const setup = function(csrf) {
    //console.log(csrf)
    ReactDOM.render(
        <DomoForm csrf={csrf} />,
        document.querySelector("#makeDomo")
    );
    ReactDOM.render(
        <DomoList domos={[]} />,
        document.querySelector("#domos")
    );

    loadDomosFromServer()
}

const getToken = () => {
    //console.log("getToken")
    
    sendAjax('GET', '/getToken', null, (result)=>{
        //console.log(result)
        
        setup(result.csrfToken);
    });
};

/*$(document).ready(function() {
    //console.log("Maker Init")
    //setup()
    getToken();
});*/