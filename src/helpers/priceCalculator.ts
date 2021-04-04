export const priceCalculation = (age: number, hotspotAsteroids: number): number => {
    const fixedPrice = 170
    const variablePrice = ((100 * age) / 35) + (10 * hotspotAsteroids)

    return fixedPrice + variablePrice
}