const request = require('supertest');
const app = require('../../server');

describe('Users route', () => {
    let userId = ''

    it('Should list users', done => {
        return request(app)
            .get('/api/users')
            .end((err, { status, body }) => {
                expect(status).toBe(200)
                expect(body).not.toBeUndefined()
                done()
            })
    })

    it('Should create an user', done => {
        return request(app)
            .post('/api/users')
            .send({
                firstname: 'John',
                lastname: 'Doe',
                email: `john.doe@todo.com`
            })
            .set('content-type', 'application/json')
            .end((err, { status, body }) => {
                expect(status).toBe(201)
                userId = body._id
                done()
            })
    })

    it('Should update an user', done => {
        return request(app)
            .put(`/api/users/${userId}`)
            .send({
                firstname: 'John',
                lastname: 'Doe',
                email: `john.doe@todo-app.com`
            })
            .set('content-type', 'application/json')
            .end((err, { status, body }) => {
                expect(status).toBe(200)
                expect(body.email).toBe('john.doe@todo-app.com')
                done()
            })
    })

    it('Should remove an user', done => {
        return request(app)
            .delete(`/api/users/${userId}`)
            .end((err, { status, body }) => {
                expect(status).toBe(204)
                done()
            })
    })

  });