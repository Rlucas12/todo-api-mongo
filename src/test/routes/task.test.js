const request = require('supertest');
const app = require('../../server');

describe('Tasks route', () => {
    let taskId = ''

    it('Should list tasks', done => {
        return request(app)
            .get('/api/tasks')
            .end((err, { status, body }) => {
                expect(status).toBe(200)
                expect(body).not.toBeUndefined()
                done()
            })
    })

    it('Should create a task', done => {
        return request(app)
            .post('/api/tasks')
            .send({
                content: 'Ajouter un test',
                priority: 0,
                isOver: false
            })
            .set('content-type', 'application/json')
            .end((err, { status, body }) => {
                expect(status).toBe(201)
                taskId = body._id
                done()
            })
    })

    it('Should update a task', done => {
        return request(app)
            .put(`/api/tasks/${taskId}`)
            .send({
                content: 'Ajouter un test',
                priority: 0,
                isOver: true
            })
            .set('content-type', 'application/json')
            .end((err, { status, body }) => {
                expect(status).toBe(200)
                expect(body.isOver).toBe(true)
                done()
            })
    })

    it('Should remove a task', done => {
        return request(app)
            .delete(`/api/tasks/${taskId}`)
            .end((err, { status, body }) => {
                expect(status).toBe(204)
                done()
            })
    })

  });