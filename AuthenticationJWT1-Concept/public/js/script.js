const container = document.getElementById('Postcontainer');

async function fetchData() {
    try{
        const response = await fetch('/test/api/posts');
        const data = await response.json();

        container.innerHTML =`
        <h2> ${data.title} </h2>
        <p> ${data.body} </p> `;

    }catch(e){
        console.error('Error fetching data:', e.message);
    }   

}
fetchData();