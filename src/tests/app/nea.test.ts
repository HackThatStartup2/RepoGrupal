import request from 'supertest'
import Nea from '../../api/Nea/model'
import app from '../../app'

beforeEach(async () => {
    await Nea.deleteMany({});
    await new Nea({ full_name: '1566 Icarus (1949 MA)', a: 1.078076432, e: 0.827072914, i: 22.81881892, om: 87.98911327, w: 31.40697081, ma: 8.160598893 }).save()
    await new Nea({ full_name: '1566 Icarus (1949 MA)', a: 1.078076432, e: 0.827072914, i: 22.81881892, om: 87.98911327, w: 31.40697081, ma: 8.160598893 }).save()
})

describe('GET /api/nea/all', () => {
    it('should get all neas', async () => {
        await request(app)
            .get('/api/nea/all')
            .expect('Content-Type', /json/)
            .expect(200)
    })
})

describe('GET /api/nea/:id', () => {
    it('should get a nea by id', async () => {
        const { id } = await Nea.findOne({}).exec()
        await request(app)
            .get('/api/nea/' + id)
            .expect('Content-Type', /json/)
            .expect(200)
    })

    it('should get an error', async () => {
        await request(app)
            .get('/api/nea/123456789')
            .expect('Content-Type', /json/)
            .expect(404)
    })
})

describe('POST /api/nea', () => {
    it('should save one new nea', async () => {
        const data = await new Nea({ full_name: '1566 Icarus (1949 MA)', a: 1.078076432, e: 0.827072914, i: 22.81881892, om: 87.98911327, w: 31.40697081, ma: 8.160598893 }).save()
        await request(app)
            .post('/api/nea')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
    })

    it('should save multiple neas', async () => {
        const data = [
            { full_name: '1566 Icarus (1949 MA)', a: 1.078076432, e: 0.827072914, i: 22.81881892, om: 87.98911327, w: 31.40697081, ma: 8.160598893 },
            { full_name: '1566 Icarus (1949 MA)', a: 1.078076432, e: 0.827072914, i: 22.81881892, om: 87.98911327, w: 31.40697081, ma: 8.160598893 }
        ]
        await request(app)
            .post('/api/nea')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
    })
})


describe('PUT /api/nea/:id', () => {
    it('should update a nea by id', async () => {
        const { id } = await Nea.findOne({}).exec()

        const newUser = { full_name: '1566 Icarus (1949 MA)', a: 1.078076432, e: 0.827072914, i: 22.81881892, om: 87.98911327, w: 31.40697081, ma: 8.160598893 }
        await request(app)
            .put('/api/nea/' + id)
            .send(newUser)
            .expect(200)
    })
})

describe('DELETE /api/nea/:id', () => {
    it('should delete a nea by id', async () => {
        const { id } = await Nea.findOne({}).exec()

        await request(app)
            .delete('/api/nea/' + id)
            .expect(200)
    })
})