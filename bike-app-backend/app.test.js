
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
    })