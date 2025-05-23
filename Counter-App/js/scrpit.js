let counter =0;

function UpdateCounter(){

    document.getElementById("counterdisplay").textContent = counter;

    if(counter > 0){
        counterdisplay.style.color= "#12C93A"
    }else if(counter < 0){
        counterdisplay.style.color= "#D93030"
    }else {counterdisplay.style.color= "#0648a3"}
    

}

function IncrementCounter(){
    counter++;
    UpdateCounter();
}

function DecrementCounter(){
    counter--;
    UpdateCounter();
}
function RestCounter(){
    counter=0;
    UpdateCounter();
}
function initialValue(){
    let initialValueElement = document.getElementById("initialValue");
    counter = initialValueElement.value;
    UpdateCounter();
}



document.getElementById("incrButton").addEventListener('click',IncrementCounter);
document.getElementById("decrButton").addEventListener('click',DecrementCounter);
document.getElementById("restButton").addEventListener('click',RestCounter);
document.getElementById("saveValue").addEventListener('click',initialValue);
