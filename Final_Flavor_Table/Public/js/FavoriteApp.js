const container = document.getElementById("favorites-container")

function htmlToPlainText(html) {
  if (!html) return '';

  let text = html;

  text = text.replace(/<li>/gi, '• ');

  text = text.replace(/<\/li>/gi, '\n');

  text = text.replace(/<\/?(ul|ol)>/gi, '');

  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<\/?p>/gi, '\n');

  text = text.replace(/<[^>]*>/g, '');

  text = text.replace(/[\/()]/g, '');
  text = text.replace(/\*\*/g, '');

  text = text.replace(/\n\s*\n/g, '\n');
  text = text.trim();

  return text;
}

async function loadFavorites(){
  try { 
    const respons = await fetch(`/CRUD/reade`);
    const saved = await respons.json();
    console.log("saved:", saved);
   
    container.innerHTML = '';

    if (!saved.length) {
      container.innerHTML = '<p style="text-align:center; font-size: 1.2rem;">No favorite recipes saved yet.</p>';
      return;
    }
    
    saved.forEach(element => {
      const cards = document.createElement("div");
      cards.className = "cards";

      const allIngredients = element.analyzedInstructions?.flatMap(all => 
        all.steps?.flatMap(step => 
          step.ingredients?.map(ingredient =>
            ingredient.name
          ) || []
        ) || []
      ) || [];

      const uniqIngredients = [...new Set(allIngredients)];

      cards.innerHTML=`
          <button class="delete-btn" title="Remove from Favorites">❌</button>
          <img src="${element.image}" alt="${element.title}">
          <div class="card-content">
            <h3>${element.title}</h3>
            <form id="form">
              <p><strong>Ingredients:</strong></p>
              <textarea id="messageli" rows="6" cols="50" placeholder=""></textarea>
              <p><strong>Instructions:</strong></p>
              <textarea id="message" rows="6" cols="50" placeholder=""></textarea>
              <button type="submit" class="update-btn">Update</button> 
              </form>
          </div>
      `;

      /* Git Data Without HTML Tags */
      const ingredientsTextarea = cards.querySelector('#messageli');
      const instructionsTextarea = cards.querySelector('#message');

      const ingredientsHTML = element.ingredients.length
        ?element.ingredients.map(item => `<li>${item}</li>`).join('')
        : "<li>No ingredients listed.</li>";

      ingredientsTextarea.value = htmlToPlainText(`<ul>${ingredientsHTML}</ul>`);
      instructionsTextarea.value = htmlToPlainText(element.instructions || "No instructions provided.");

      /* Update Button */
      const form = cards.querySelector('#form');
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("you are in event");

        const updatedIngredientsText = card.querySelector('#messageli').value.trim();
        const updatedInstructions = card.querySelector('#message').value.trim();

        const ingredientsArray = updatedIngredientsText
        .split('\n')
        .map(item => item.replace(/^•\s*/, '').trim())
        .filter(item => item !== "");

        const updatedData = {
          instructions: updatedInstructions,
          ingredients: ingredientsArray 
        };
        await UpdateFromDatabase(element.id, updatedData);
      });
            
      /* Delete Button */
      const deleteBtn = cards.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', async () => {
        await deleteFromDatabase(element.id);
        cards.remove();
      });

      container.appendChild(cards);
    });        
  } 
  catch (error) {
    console.error("Error loading favorites:", error);
    container.innerHTML = '<p style="text-align:center; color:red;">Failed to load recipes.</p>';        
  }
}

async function deleteFromDatabase(id) {
    try {
        const response = await fetch(`/CRUD/delete/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            console.error("Failed to delete");
        }
    } catch (error) {
        console.error("Error deleting from DB:", error);
    }
}

async function UpdateFromDatabase(id, updatedData) {
  try {
    const response = await fetch(`/CRUD/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
      
    });

    if (response.ok) {
      alert('✅ Recipe updated successfully!');
    } else {
      alert('❌ Failed to update. Check server response.');
    }
  } catch (error) {
    console.error("❌ Error updating recipe:", error);
    alert('❌ Error occurred while updating.');
  }
}


loadFavorites();