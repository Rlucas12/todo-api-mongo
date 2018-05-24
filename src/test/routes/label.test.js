const request = require('supertest');
const app = require('../../server');

describe('Labels route', () => {
    let labelId = ''

    it('Should list labels', done => {
        return request(app)
            .get('/api/labels')
            .end((err, { status, body }) => {
                expect(status).toBe(200)
                expect(body).not.toBeUndefined()
                done()
            })
    })

    it('Should create a label', done => {
        return request(app)
            .post('/api/labels')
            .send({
                name: 'Freelance',
                color: 'purple'
            })
            .set('content-type', 'application/json')
            .end((err, { status, body }) => {
                expect(status).toBe(201)
                labelId = body._id
                done()
            })
    })

    it('Should update a label', done => {
        return request(app)
            .put(`/api/labels/${labelId}`)
            .send({
                name: 'Freelance',
                color: 'pink'
            })
            .set('content-type', 'application/json')
            .end((err, { status, body }) => {
                expect(status).toBe(200)
                expect(body.color).toBe('pink')
                done()
            })
    })

    it('Should remove a label', done => {
        return request(app)
            .delete(`/api/labels/${labelId}`)
            .end((err, { status, body }) => {
                expect(status).toBe(204)
                done()
            })
    })

  });