const container = document.getElementById('container');
const form = document.getElementById('ingredients');
const MissUsed = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();
  FetchData();
});

async function FetchData(){
    const inputElement = document.getElementById('insart');
    const inputValue = inputElement.value.trim();

    if (inputValue !== '') {
        if (!MissUsed.includes(inputValue)) {
            MissUsed.push(inputValue);
        }
    } 
    else {
        alert('Please enter an ingredient.');
        return;
    }
    inputElement.value = '';

    const q = MissUsed.join(',');
    console.log("Q :", q)

    try {
        const respons = await fetch(`/recipes/search?q=${encodeURIComponent(q)}`);
        if (!respons.ok) {
            throw new Error(`HTTP error! status: ${respons.status}`);
        }
        const data = await respons.json();
        RenderData(data);
    } 
    catch (err) {
        console.error('Error fetching data:', err.message);        
    }
}

async function RenderData(Recipes){
    container.innerHTML = ``;

    if (!Recipes.length) {
        container.innerHTML = '<p>No recipes found.</p>';
        return;
    }
    Recipes.forEach(element => {
        const cards = document.createElement("div");
        cards.className = "cards";

        cards.innerHTML = `
        <button class="save-btn" title="Save to Favorites">♡</button>
        <img src="${element.image}" alt="${element.title}">
        <div class="card-content">
            <h3>${element.title}</h3>

            <p><strong>Used Ingredients:</strong></p>
            <ul>
            ${element.usedIngredients.map(item => `<li>${item.name}</li>`).join('')}
            </ul>

            <p><strong>Missed Ingredients:</strong></p>
            <ul>
            ${element.missedIngredients.map(item => `<li>${item.name}</li>`).join('')}
            </ul>
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
                ingredients: JSON.stringify([
                    ...Recipe.missedIngredients.map(item => item.name),
                    ...Recipe.usedIngredients.map(item => item.name)
                ]),
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