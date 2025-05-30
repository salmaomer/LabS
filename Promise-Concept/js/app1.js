function boilWater() {
    return new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                resolve("Water is boiled");
            }, 3000);
        }
    );
}

function addCoffee() {
    return new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                resolve("coffee is added");
            }, 1000);
        }
    );
}

function serveCoffee() {
    return new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                resolve("coffe is served ");
            }, 6000);
        }
    );
}


async function makeCoffe() {
    try {
        console.log("Preparation started");

        const boiledwater = await boilWater();
        console.log(boiledwater);

        const addCoffeevalue = await addCoffee();
        console.log(addCoffeevalue);

        const serveCoffeeValue = await serveCoffee();
        console.log(serveCoffeeValue);
    } 
    catch (error) {
        console.log(error);
    }
}

makeCoffe();