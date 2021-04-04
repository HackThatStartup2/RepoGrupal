import to from "await-to-js";
import { startSession } from "mongoose";
import { getPhaLatLng } from "../../../helpers/kepler";
import { IPha } from "../model";

export const addOnePha = async (model, data) => {
    const newPha: IPha = new model(data)
    const latlng = getPhaLatLng(newPha)

    newPha.latitude = latlng.lat;
    newPha.longitude = latlng.long;

    const [err, instance] = await to(newPha.save());

    return err ? err : true
}

export const addManyPha = async (model, data) => {

    const transactSession = await startSession();

    const [err, instance] = await to(transactSession.withTransaction(async () => {
        data.forEach(async doc => {
            const newPha: IPha = new model(doc)
            const latlng = getPhaLatLng(newPha)

            newPha.latitude = latlng.lat;
            newPha.longitude = latlng.long;

            await newPha.save()
        })
    }));

    transactSession.endSession();

    return err ? err : true
}