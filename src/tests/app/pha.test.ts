import request from 'supertest'
import Pha from '../../api/Pha/model'
import app from '../../app'

const phaInstance = {
    "full_name": "1566 Icarus (1949 MA)",
    "a": 1.078076432,
    "e": 0.827072914,
    "i": 22.81881892,
    "om": 87.98911327,
    "w": 31.40697081,
    "ma": 8.160598893,
}

beforeEach(async () => {
    await Pha.deleteMany({});
    await new Pha(phaInstance).save()
})

describe('GET /api/pha/all', () => {
    it('should get all phas', async () => {
        await request(app)
            .get('/api/pha/all')
            .expect('Content-Type', /json/)
            .expect(200)
    })
})

describe('GET /api/pha/:id', () => {
    it('should get a pha by id', async () => {
        const { id } = await Pha.findOne({}).exec()
        await request(app)
            .get('/api/pha/' + id)
            .expect('Content-Type', /json/)
            .expect(200)
    })

    it('should get an error', async () => {
        await request(app)
            .get('/api/pha/123456789')
            .expect('Content-Type', /json/)
            .expect(404)
    })
})

describe('POST /api/pha', () => {
    it('should save one new pha', async () => {
        await request(app)
            .post('/api/pha')
            .send(phaInstance)
            .expect('Content-Type', /json/)
            .expect(201)
    })

    it('should save multiple phas', async () => {
        const data = [phaInstance, phaInstance]
        await request(app)
            .post('/api/pha')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
    })
})


describe('PUT /api/pha/:id', () => {
    it('should update a pha by id', async () => {
        const { id } = await Pha.findOne({}).exec()

        await request(app)
            .put('/api/pha/' + id)
            .send(phaInstance)
            .expect(200)
    })
})

describe('DELETE /api/pha/:id', () => {
    it('should delete a pha by id', async () => {
        const { id } = await Pha.findOne({}).exec()

        await request(app)
            .delete('/api/pha/' + id)
            .expect(200)
    })
})