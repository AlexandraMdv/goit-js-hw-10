import axios from "axios";
import Notiflix from 'notiflix';

const baseURL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_IM1yX4iK0QqUktjY099o5doZDct9bpo5DJwIPD2szRUXu2YNd1zP1UWZXLQxvrJp';

// Axios set the default/global API key
axios.defaults.headers.common["x-api-key"] = API_KEY;
// Axios set default base url
axios.defaults.baseURL = baseURL;

export function fetchBreeds() {

    showLoader();

    return axios.get('/breeds')
        .then(response=> {
            return response.data;
        })
        .catch(() => {
            //show Notiflix error alert 
            showError();
        })
        .finally( () => {
            hideLoader();
        });

}


export function fetchCatByBreeds(breedId) {

    showLoader();
    const catInfoDiv = document.querySelector('.cat-info');
    if (catInfoDiv) catInfoDiv.style.display = 'none';


    return axios.get(`/images/search?breed_ids=${breedId}`)
            .then(res => res.data)
            .catch( () => {
                showError();
            })
            .finally( () => {
                hideLoader();
                catInfoDiv.style.display = 'flex';
            });

}

function showLoader() {
    const loader = document.querySelector('span.loader');
    if(loader) loader.style.display = 'block';
}

function hideLoader() {
    const loader = document.querySelector('span.loader');
    if(loader) loader.style.display = 'none';
}

function showError() {
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
}