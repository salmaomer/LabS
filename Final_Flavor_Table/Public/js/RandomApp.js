const container = document.getElementById('container');

async function FetchData(){
    try{
        const respons = await fetch(`/recipes/random`);
        const recipe = await respons.json();
        console.log("recipe :",recipe)
        const data = await recipe.recipes;
        console.log("data :",data)

        RenderData(data);
    }
    catch(err){
        console.error('Error fetching data:', err.message);
    }
}

async function RenderData(Recipes){
    container.innerHTML = ''; 

    if (!Recipes.length) {
        container.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    Recipes.forEach(element => {
        const cards = document.createElement("div");
        cards.className = "cards";

        const allIngredients = element.analyzedInstructions?.flatMap(all => 
            all.steps?.flatMap(step => 
                step.ingredients?.map(ingredient =>
                    ingredient.name
                ) || []
            ) || []
        ) || [];

        const uniqIngredients = [...new Set(allIngredients)]

        cards.innerHTML = `
            <button class="save-btn" title="Save to Favorites">♡</button>
            <img src="${element.image}" alt="${element.title}">
            <div class="card-content">
                <h3>${element.title}</h3>
                <p><strong>Ingredients:</strong></p>
                <ul>
                ${uniqIngredients.length?
                    uniqIngredients.map(item =>`<li>${item}</li>`).join('')
                    :"<li>No ingredients listed.</li>"
                }
                </ul>
                <p><strong>Instructions:</strong></p>
                <p>${element.instructions || "No instructions provided."}</p>
                <p><strong>Ready In Minutes:</strong></p>
                <p>${element.readyInMinutes}</p>
            </div>
        `;
        const saveButton = cards.querySelector('.save-btn');
        saveButton.addEventListener('click', async ()=>{
            await SaveData(element);
            saveButton.classList.add('saved'); 
            saveButton.innerHTML = "❤️";
        });  
        container.appendChild(cards);
    });
}

async function SaveData(Recipe){
    try {
        const allIngredients = Recipe.analyzedInstructions?.flatMap(instruction =>
            instruction.steps?.flatMap(step =>
                step.ingredients?.map(ing => ing.name) 
                || []
            ) || []
        ) || [];

        const uniqueIngredients = [...new Set(allIngredients)];

        const respons = await fetch(`/CRUD/create`,{
            method:'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: Recipe.title,
                image: Recipe.image,
                instructions: Recipe.instructions,
                ingredients: JSON.stringify(uniqueIngredients),
                readyin: Recipe.healthScore
            })
        });
        const data = await respons.json();

        if (respons.ok) {
            alert("🎉 Recipe saved to database!");
        } 
        else {
            alert("👾 Failed to save recipe.");
            console.error(data);
        }
    }
    catch (error) {
        console.error("👾 Error saving to DB:", error.message);
        alert("👾 An error occurred.");        
    }    
}

FetchData();