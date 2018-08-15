const form=document.querySelector('form');
const searchInput=document.querySelector('input');  

form.addEventListener('submit',formSubmitted);

function formSubmitted(event){
    event.preventDefault();//prevents a default function from happening i.e. submit button from submitting

    const searchTerm=searchInput.value;
    console.log(searchTerm);
}