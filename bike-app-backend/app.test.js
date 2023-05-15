
const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
    it('should return 200 OK', () => {
        return request(app).get('/')
            .expect(200);
    });
});
// Test to get all stations //
describe('GET All stations', () => {
    it('should return 200 OK', async ()  => {
        return await request(app).get('/api/v1/stations/')
            .expect(200);
    });
});
// Make sure to add the ID of the station you want to test //
describe('POST station by name', () => {
    it('should return 200 OK', async ()  => {
        return await request(app).post('/api/v1/stations/station')
            .send({name: 'Huovitie'})
            .expect(200)
            .then((response) => {
                expect(response.body.data).toEqual(
                    expect.arrayContaining([
                      expect.objectContaining({
                        ID: expect.any(String),
                        Name: expect.any(String),
                    }),
                ])
              );
        });
    });
});

/* 
Make jorneys testings
*/
describe('GET 50 longest distance from journeys', () => {
    it('should return 200 OK', async ()  => {
        return await request(app).get('/api/v1/jorneys/longestDistance')
            .expect(200);
    })
});
// Get jorneys by station and pagnation number //
describe('GET fifty jorneys by station and pagnation number', () => {
    it('should return 200 OK', async ()  => {
        return await request(app).get('/api/v1/jorneys/fifty?page=1&station=Huovitie')
            .expect(200)
            .then((response) => {
                expect(response.body.data[0]).toEqual(
                      expect.objectContaining({
                        CoveredDistance: expect.any(Number),
                        ReturnStationName: expect.any(String),
                    }),      
              );
        });
    })
});
// Get jorneys stats by station and month  //
describe('GET jorneys stats by station and month', () => {
    it('should return 200 OK', async ()  => {
        return await request(app).get('/api/v1/jorneys/station?name=Huovitie&month=6')
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        departureResults: expect.any(Number),
                        departureMeanDistance: expect.any(Number),
                        returnMeanDistance: expect.any(Number),
                        returnMeanDuration: expect.any(Number),
                })
                )
            })
        });
})


