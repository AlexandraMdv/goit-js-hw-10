import {fetchBreeds, fetchCatByBreeds} from "./cat-api.js";
import SlimSelect from 'slim-select';


function onChange() {

    const select = document.querySelector('select');
    const selectedBreedId = select.value;
    const catInfoDiv = document.querySelector('div.cat-info');
    
    if (!selectedBreedId) {
        catInfoDiv.innerHTML = '<p>Please select a breed.</p>';
        return;
    }
    
    fetchCatByBreeds(selectedBreedId)
        .then(catData => {
            if(catData?.length === 0) throw new Error('Please select a breed');

            const cat = catData[0];
            
            const {name, description, temperament} = cat.breeds[0];

            const markupCatDetails = `
                <img src='${cat.url}' alt='${name}' width="300"/>
                <div>
                    <h2>${name}</h2>
                    <p>${description}</p>
                    <p><strong>Temperament: </strong> ${temperament}</p>
                </div>
                
            `;

            catInfoDiv.innerHTML = markupCatDetails;
        })
        .catch( () => {
            throw new Error('Something went wrong');
        });
}

function getCat() {

    let slimSelect;
    const select = document.querySelector('select');
    select.addEventListener('change', onChange);

    fetchBreeds().then(catArray => {
        if(catArray?.length === 0) throw new Error('No Data');
        
        select.style.display = 'flex';

        const markup = catArray.reduce((markup, cat) => {
            return markup + createSelectMarkup(cat) 
        }, '');

        select.innerHTML = markup;

        if (slimSelect) {
            slimSelect.destroy(); // Destroy the previous instance
        }
        slimSelect = new SlimSelect({ select });
    })
    .catch(onError);
}

function createSelectMarkup(cat) {
    const { name, id } = cat;
    return `<option value="${id}">${name}</option>`;
}

function onError(err) {
    console.error(err);
}

window.addEventListener("load", (event) => {
    getCat();
});

