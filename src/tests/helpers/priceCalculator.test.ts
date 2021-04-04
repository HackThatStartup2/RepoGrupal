import { priceCalculation } from "../../helpers/priceCalculator";

describe('priceCalculation', () => {
    it('should return a correct price', () => {
        const age = 20;
        const hotspotAsteroids = 4;
        const testFunction = priceCalculation(age, hotspotAsteroids);
        
        expect(testFunction).toBe(267.1428571428571)
    })
})
