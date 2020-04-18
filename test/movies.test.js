/* id =  5e9b4afb4e5e8b2541ef5900 */
const request = require('supertest');
const app  = require('../index');

describe('Movies Api Test', ()=>{
    it('Get list of movies', (done)=>{
        request(app)
            .get('/api/movies')
            .expect(200,done)
    });

    it('Get list of movies by genre', (done)=>{
        request(app)
            .get('/api/movies/Thriller')
            .expect(200,done)
    });
});