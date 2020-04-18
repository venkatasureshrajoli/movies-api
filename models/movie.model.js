const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    name: {
        type: String,
        required:'Name cannot be blank',
        unique:'Name cannot be duplicated'
    },
    rating: {
        type: Number,
        min:[0,'Should not be less than 0'],
        max:[10, 'Should not be greater than 10']
    },
    genre: {
        type:String,
        enum:['Romance', 'Fiction', 'Thriller', 'Drama'],
        required:'Genre cannot be blank'
    },
    watched:{
        type: Boolean,
        enum:[true,false],
        default:false
    }
});

module.exports = MoviesModel = mongoose.model('Movie', MovieSchema)