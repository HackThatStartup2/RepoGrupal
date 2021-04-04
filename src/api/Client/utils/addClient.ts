import to from "await-to-js";
import { startSession } from "mongoose";
import { getHotspotAsteroids } from "../../../helpers/hotspot";
import { priceCalculation } from "../../../helpers/priceCalculator";
import { IClient } from "../model";

export const addOneClient = async (model, data) => {
    const newPha: IClient = new model(data)

    const hotspot_asteroids = await getHotspotAsteroids(newPha);
    const price = priceCalculation(newPha.age, hotspot_asteroids)

    newPha.hotspot_asteroids = hotspot_asteroids;
    newPha.price = price

    const [err, instance] = await to(newPha.save());

    return err ? err : true
}

export const addManyClient = async (model, data) => {

    const transactSession = await startSession();

    const [err, instance] = await to(transactSession.withTransaction(async () => {
        data.forEach(async doc => {
            const newPha: IClient = new model(doc)
            const hotspot_asteroids = await getHotspotAsteroids(newPha);
            const price = priceCalculation(newPha.age, hotspot_asteroids)

            newPha.hotspot_asteroids = hotspot_asteroids;
            newPha.price = price

            await newPha.save()
        })
    }));

    transactSession.endSession();

    return err ? err : true
}