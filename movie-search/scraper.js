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

function getMovie(imdbID){  //get the movie details of the particular movie's imdb id entered in the url
    return fetch(`${movieUrl}${imdbID}`)
    .then(response=>response.text())
    .then(body=>{
        const $=cheerio.load(body);
        const $title=$('.title_wrapper h1');

        const title=$title.first().contents().filter(function(){
            return this.type==='text';
        }).text().trim();
        const rating = $('meta[itemProp="contentRating"]').attr('content');
        const runtime=$('time[itemProp="duration"]').first().contents().filter(function(){
            return this.type==='text'; 
        }).text().trim();
        const genres=[];
        $('span[itemProp="genre"]').each(function(i,element){
            const genre=$(element).text();
            genres.push(genre);
        });
        const releaseDate=$('meta[itemProp="datePublished"]').attr('content');
        const imdbRating=$('span[itemProp="ratingValue"]').text();
        const poster=$('div.poster a img').attr('src');
        const plot=$('div.summary_text').text().trim();
        

        function getItems(itemArray){
            return function(i,element){
                const item=$(element).text().trim();
                itemArray.push(item);
            }
        }


        const directors=[];
        $('span[itemProp="director"]').each(getItems(directors));
        const writers=[];
        $('.credit_summary_item span[itemProp="creator"]').each(getItems(writers));
        const stars=[];
        $('.credit_summary_item span[itemProp="actors"]').each(getItems(stars));
        
        const storyline=$('#titleStoryLine span[itemProp="description"]').text().trim();
        return{
            imdbID,
            title,
            rating,
            runtime,
            genres,
            imdbRating,
            releaseDate,
            poster,
            plot,
            directors,
            writers,
            stars,
            storyline
        };
    });
}


module.exports={searchMovies,getMovie};