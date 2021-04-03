import request from 'supertest'
import User from '../../api/User/model'
import app from '../../app'

beforeEach(async () => {
    await User.deleteMany({});
    await new User({ username: 'Erix', password: '123456789' }).save()
    await new User({ username: 'Erix2', password: '1234567890' }).save()
})

describe('GET /api/user/all', () => {
    it('should get all users', async () => {
        await request(app)
            .get('/api/user/all')
            .expect('Content-Type', /json/)
            .expect(200)
    })
})

describe('GET /api/user/:id', () => {
    it('should get an user by id', async () => {
        const { id } = await User.findOne({}).exec()
        await request(app)
            .get('/api/user/' + id)
            .expect('Content-Type', /json/)
            .expect(200)
    })

    it('should get an error', async () => {
        await request(app)
            .get('/api/user/123456789')
            .expect('Content-Type', /json/)
            .expect(404)
    })
})

describe('POST /api/user', () => {
    it('should save one new user', async () => {
        const data = {
            username: 'Test',
            password: 'Test'
        }
        await request(app)
            .post('/api/user')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
    })

    it('should save multiple users', async () => {
        const data = [
            {
                username: 'Test',
                password: 'Test'
            },
            {
                username: 'Test2',
                password: 'Test2'
            }
        ]
        await request(app)
            .post('/api/user')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
    })
})


describe('PUT /api/user/:id', () => {
    it('should update an user by id', async () => {
        const { id } = await User.findOne({}).exec()

        const newUser = {
            username: 'PutTest',
            password: 'PutTest'
        }
        await request(app)
            .put('/api/user/' + id)
            .send(newUser)
            .expect(200)
    })
})

describe('DELETE /api/user/:id', () => {
    it('should delete an user by id', async () => {
        const { id } = await User.findOne({}).exec()

        await request(app)
            .delete('/api/user/' + id)
            .expect(200)
    })
})