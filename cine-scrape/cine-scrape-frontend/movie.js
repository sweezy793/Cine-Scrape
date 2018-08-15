const main=document.querySelector('main');
const imdbID=window.location.search.match(/imdbID=(.*)/)[1];
const BASE_URL='https://cine-scrapper.now.sh/';

function getMovie(imdbID){
    return fetch(`${BASE_URL}movie/${imdbID}`)
    .then(res=>res.json());
}

const properties = [{
    title: 'Rating',
    property: 'rating'
  }, {
    title: 'Run Time',
    property: 'runTime'
  }, {
    title: 'Released',
    property: 'datePublished'
  }, {
    title: 'Summary',
    property: 'summary'
  }, {
    title: 'Story Line',
    property: 'storyLine'
  }];

function showMovie(movie){
    console.log(movie);
    const section=document.createElement('section');
    main.appendChild(section);

    section.outerHTML=`
    <section class="row">
    <h1>${movie.title}</h1>
        <div class="col-sm-12">
            <img src="${movie.poster}" class="img-fluid"/>
        </div>
    </section>`
}

getMovie(imdbID)
.then(showMovie)