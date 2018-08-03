const fetch=require('node-fetch');
//const cheerio=require('cheerio');

const url='https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=';

function searchMovies(searchTerm)
{
    return fetch(`${url}${searchTerm}`)
    .then(response=>response.text())
}

searchMovies('star wars')
.then(body=>{
    console.log(body);
});