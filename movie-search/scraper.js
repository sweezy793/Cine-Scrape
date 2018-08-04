const fetch=require('node-fetch');
const cheerio=require('cheerio');

const url='https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=';

function searchMovies(searchTerm)
{
    return fetch(`${url}${searchTerm}`)
    .then(response=>response.text())
    .then(body=>{
        const $=cheerio.load(body);
        const movies=[];
        $('.findResult').each(function(i,element){
            const $element=$(element);
            const $image=$element.find('td a img');
            const $title=$element.find('td.result_text a');
            const movie={
                title:$title.text(),
                image:$image.attr('src')
                
            };
            movies.push(movie);
        });
        return movies;
    });
}


module.exports={searchMovies};