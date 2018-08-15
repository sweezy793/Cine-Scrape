const form=document.querySelector('form');
const searchInput=document.querySelector('input');  
const resultList=document.querySelector('#results');

const BASE_URL='https://cine-scrapper.now.sh/';

form.addEventListener('submit',formSubmitted);

function formSubmitted(event){
    event.preventDefault();//prevents a default function from happening i.e. submit button from submitting

    const searchTerm=searchInput.value;
    getSearchResults(searchTerm)
    .then(showResults);
}

function getSearchResults(searchTerm){
    return fetch(`${BASE_URL}search/${searchTerm}`)
    .then(res=>res.json());
}

function showResults(results){
    results.forEach(movie=>{
        const li=document.createElement('li');
        const br=document.createElement('br');
        
        const img=document.createElement('img');
        li.appendChild(img);
        
        img.src=movie.image;
        const span=document.createElement('span');
        span.textContent=" "+movie.title;
        
        li.appendChild(span);
        
        resultList.appendChild(li);
        resultList.appendChild(br);
    })
}