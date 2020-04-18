const express = require('express'), 
    Router = express.Router(),
    MoviesModel = require('../models/movie.model');


Router.get('/movies', (req,res)=>{
    MoviesModel.find({}).lean().exec()
        .then((movies)=>{
            return res.status(200).json(movies);
        })
        .catch((error)=>{
            return res.status(500).json({error:true, message:error.message});  
        });
});

Router.get('/movies/:genre', (req,res)=>{
    MoviesModel.find({genre:req.params.genre}).lean().exec()
        .then((movies)=>{
            return res.status(200).json(movies);
        })
        .catch((error)=>{
            return res.status(500).json({error:true, message:error.message});  
        });
});

Router.post('/movies', (req,res)=>{
    const movie = {
        name: req.body.name,
        rating: req.body.rating,
        genre: req.body.genre,
        watched: req.body.watched
    }

    const newMovie = new MoviesModel(movie);
    newMovie.save()
        .then((movieCreated)=>{
            return res.status(201).json(movieCreated);
        })
        .catch((error)=>{
            return res.status(500).json({error:true, message:error.message});
        })
});

Router.get('/movie/:movieId', (req,res)=>{
    MoviesModel.findOne({_id:req.params.movieId}).lean().exec()
        .then((movieFound)=>{
            return res.status(200).json(movieFound);
        })
        .catch((error)=>{
            return res.status(500).json({error:true, message:error.message});
        })
});

Router.put('/movie/:movieId', (req,res)=>{
    const movie = {
        name: req.body.name,
        rating: req.body.rating,
        genre: req.body.genre,
        watched: req.body.watched
    }
    MoviesModel.findOneAndUpdate({_id:req.params.movieId}, {$set:movie}, {new:true}).exec()
        .then((movieUpdated)=>{
            return res.status(200).json(movieUpdated);
        })
        .catch((error)=>{
            return res.status(500).json({error:true, message:error.message});
        })
});

Router.delete('/movie/:movieId', (req,res)=>{
    MoviesModel.findByIdAndDelete(req.params.movieId).exec()
        .then((movieDeleted)=>{
            return res.status(200).json({error:false, message:'Movie has been deleted successfully'});
        })
        .catch((error)=>{
            return res.status(500).json({error:true, message:error.message});
        })
});

module.exports = Router;