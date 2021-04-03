import to from "await-to-js";
import { startSession } from "mongoose";

export const addOne = async (model, data) => {
    const [err, instance] = await to(new model(data).save());
    return err ? err : true
}

export const addMany = async (model, data) => {

    const transactSession = await startSession();

    const [err, instance] = await to(transactSession.withTransaction(async () => {
        data.forEach(async doc => {
            await new model(doc).save()
        })
    }));

    transactSession.endSession();
    
    return err ? err : true
}