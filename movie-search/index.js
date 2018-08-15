var express=require('express');
var scraper=require('./scraper');
var app=express();


app.get("/",(req,res)=>{
    res.json({
        message:'Get started by using /search route'
    });
}); 

app.get("/search/:title",(req,res)=>{
    scraper.searchMovies(req.params.title)
    .then(movies=>{
        res.json(movies);  
    })
}); 

app.get("/movie/:imdbID",(req,res)=>{
    scraper.getMovie(req.params.imdbID)
    .then(movie=>{
        res.json(movie);  
    });
});


const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log('Listening on port 3000');
});