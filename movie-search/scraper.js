const fetch=require('node-fetch');
const cheerio=require('cheerio');

const searchUrl='https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=';
const movieUrl='https://www.imdb.com/title/';

function searchMovies(searchTerm)
{
    return fetch(`${searchUrl}${searchTerm}`)
    .then(response=>response.text())
    .then(body=>{
        const $=cheerio.load(body);
        const movies=[];
        $('.findResult').each(function(i,element){
            const $element=$(element);
            const $image=$element.find('td a img');
            const $title=$element.find('td.result_text a');
            const imdbID=$title.attr('href').match(/title\/(.*)\//)[1]; //for eg title/t12312e/
            const movie={
                title:$title.text(),
                image:$image.attr('src'),
                imdbID
                
            };
            movies.push(movie);
        });
        return movies;
    });
}

function getMovie(imdbID){
    return fetch(`${movieUrl}${imdbID}`)
    .then(response=>response.text())
    .then(body=>{
        console.log(body);
        return {body};
    });
}


module.exports={searchMovies,getMovie};