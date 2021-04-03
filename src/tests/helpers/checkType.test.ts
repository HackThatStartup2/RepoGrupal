import { IUser } from './../../api/User/model';
import { INea } from './../../api/Nea/model';
import { checkArray } from '../../helpers';


describe('Check Array Helper', () => {
    it('Should return true with array', () => {
        const arrayTest = [{ username: 'Dummy1', password: 'Test1' }, { username: 'Dummy2', password: 'Test2' }]
        const isArray = checkArray(arrayTest)
        expect(isArray).toBeTruthy()
    })
    it('Should return false with object', () => {
        const arrayTest = { username: 'Dummy', password: 'Test' }
        const isArray = checkArray(arrayTest)
        expect(isArray).toBeFalsy()
    })
})
