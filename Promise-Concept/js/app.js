function boilWater() {
  return new Promise(
    (resolve, reject) => {
        setTimeout(() => {
        resolve("Water is boiled");
        }, 3000);
    });
}

function addCoffee() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("coffee is added");
    }, 1000);
  });
}

function serveCoffee() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("coffe is served ");
    }, 6000);
  });
}


// .then Method
function makeCoffe(){
  console.log("Preparation started");
  boilWater()
    .then((boiled) => {
      console.log(boiled);
      return addCoffee();
    })
   .then((coffeAdded) => {
     console.log(coffeAdded);
     return serveCoffee();
   })

   .then((servingCoffe) => {
     console.log(servingCoffe);
   })
   .catch((error) => {
     console.log(error);
   });
}

makeCoffe();


