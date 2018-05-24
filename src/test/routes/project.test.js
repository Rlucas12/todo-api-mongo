const request = require('supertest');
const app = require('../../server');

describe('Projects route', () => {
    let projectId = ''

    it('Should list projects', done => {
        return request(app)
            .get('/api/projects')
            .end((err, { status, body }) => {
                expect(status).toBe(200)
                expect(body).not.toBeUndefined()
                done()
            })
    })

    it('Should create a project', done => {
        return request(app)
            .post('/api/projects')
            .send({
                name: 'ATP',
                color: 'lue',
                isArchived: false
            })
            .set('content-type', 'application/json')
            .end((err, { status, body }) => {
                expect(status).toBe(201)
                projectId = body._id
                done()
            })
    })

    it('Should update a project', done => {
        return request(app)
            .put(`/api/projects/${projectId}`)
            .send({
                name: 'ATP',
                color: 'green'
            })
            .set('content-type', 'application/json')
            .end((err, { status, body }) => {
                expect(status).toBe(200)
                expect(body.color).toBe('green')
                done()
            })
    })

    it('Should remove a project', done => {
        return request(app)
            .delete(`/api/projects/${projectId}`)
            .end((err, { status, body }) => {
                expect(status).toBe(204)
                done()
            })
    })

  });