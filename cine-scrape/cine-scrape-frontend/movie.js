const main=document.querySelector('main');
const imdbID=window.location.search.match(/imdbID=(.*)/)[1];
const BASE_URL='https://cine-scrapper.now.sh/';

function getMovie(imdbID){
    return fetch(`${BASE_URL}movie/${imdbID}`)
    .then(res=>res.json());
}

function showMovie(movie){
    const section=document.createElement('section');
    main.appendChild(section);

    section.outerHTML=`
    <section class="row">
        <div class="col-sm-12">
            <img src="${movie.poster}" class="img-fluid"/>
        </div>
    </section>`
}

getMovie(imdbID)
.then(showMovie)