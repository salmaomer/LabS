const cardcontainer = document.getElementById("cardcontainer");

function FetchData(){ 
    //step 1
    fetch("https://fakestoreapi.com/products") 
    //step2
    .then (
        (respons) => {
            /*if (!respons.ok){
                throw new Error ("the API status is not Ok")
            }*/   
            return respons.json();
        } 
    )
    //step 3 we completed later time 
    .then(
        (product) => {
            console.log("check what the inside product :",product);
            RenderData(product);
        }
    ) 
    //step 4 optional
    .catch(
        (error)=>{
            console.log("the Error :",error)
            cardcontainer.innerHTML= "<p> Error happend in the catch method</p>"
        }
    );
}

// render function
function RenderData(projectS){
    projectS.forEach(element => {
        // 1- create elemnt
        const card = document.createElement("div");
        card.className ="cards";
        
        // 2- insert the data using innerHTML
        card.innerHTML= ` 
        <img src="${element.image}" >    
        <div class="card-content">
            <p>${element.title}</p>
            <p>price : ${element.price} jd</p>
            <p>rate : ${element.rating.rate}</p>
        </div>
        ` ;
        // 3- append the elemnt using the parent elemnent
        cardcontainer.appendChild(card);
    });
}


FetchData();

