const main=document.querySelector('main');
const imdbID=window.location.search.match(/imdbID=(.*)/)[1];
const BASE_URL='https://cine-scrapper.now.sh/';

function getMovie(imdbID){
    return fetch(`${BASE_URL}movie/${imdbID}`)
    .then(res=>res.json());
}



function showMovie(movie){
    console.log(movie);
    const section=document.createElement('section');
    main.appendChild(section);

    const properties = [{
        title: 'Rating',
        property: 'rating'
      }, {
        title: 'Run Time',
        property: 'runtime'
      }, {
        title: 'Released',
        property: 'releaseDate'
      }, {
        title: 'Summary',
        property: 'plot'
      }, {
        title: 'Story Line',
        property: 'storyline'
      }];
    
      const descriptionHTML = properties.reduce((html, property) => {
        html += `
          <dt class="col-sm-3">${property.title}</dt>
          <dd class="col-sm-9">${movie[property.property]}</dd>`;
        return html;
      }, '');

      section.outerHTML = `
      <section class="row" style="margin-bottom:2em">
        
        <div class="col-sm-5">
        <h3 class="text-center">${movie.title}</h3>
          <img src="${movie.poster}" class="img-fluid" />
        </div>
        <div class="col-sm-7">
          <dl class="row" style="margin-top:12em">
            ${descriptionHTML}
          </dl>
        </div>
      </section>
    `;
  }

getMovie(imdbID)
.then(showMovie)