import request from 'supertest'
import Client from '../../api/Client/model'
import app from '../../app'

// Connarÿ,Sullivan,30,-36,-76

const clientInstance = {
    name: "Connarÿ",
    lastname: "Sullivan",
    age: 30,
    latitude: -36,
    longitude: -76
}

beforeEach(async () => {
    await Client.deleteMany({});
    await new Client(clientInstance).save()
})

describe('GET /api/client/all', () => {
    it('should get all clients', async () => {
        await request(app)
            .get('/api/client/all')
            .expect('Content-Type', /json/)
            .expect(200)
    })
})

describe('GET /api/client/:id', () => {
    it('should get an client by id', async () => {
        const { id } = await Client.findOne({}).exec()
        await request(app)
            .get('/api/client/' + id)
            .expect('Content-Type', /json/)
            .expect(200)
    })

    it('should get an error', async () => {
        await request(app)
            .get('/api/client/123456789')
            .expect('Content-Type', /json/)
            .expect(404)
    })
})

describe('POST /api/client', () => {
    it('should save one new client', async () => {
        await request(app)
            .post('/api/client')
            .send(clientInstance)
            .expect('Content-Type', /json/)
            .expect(201)
    })

    it('should save multiple clients', async () => {
        const data = [clientInstance, clientInstance]
        await request(app)
            .post('/api/client')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
    })
})


describe('PUT /api/client/:id', () => {
    it('should update an client by id', async () => {
        const { id } = await Client.findOne({}).exec()

        await request(app)
            .put('/api/client/' + id)
            .send(clientInstance)
            .expect(200)
    })
})

describe('DELETE /api/client/:id', () => {
    it('should delete an client by id', async () => {
        const { id } = await Client.findOne({}).exec()

        await request(app)
            .delete('/api/client/' + id)
            .expect(200)
    })
})