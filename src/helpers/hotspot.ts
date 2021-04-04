import { IClient } from "../api/Client/model"
import Pha from "../api/Pha/model"

export const getHotspotAsteroids = async ({ latitude, longitude }: IClient) => {
    const latLimits = { min: latitude - 15, max: latitude + 15 }
    const lngLimits = { min: longitude - 15, max: longitude + 15 }

    const arrPha = await Pha.find({});
    const arrPhaHotspot = arrPha.filter(({ latitude, longitude }) =>
        latitude >= latLimits.min &&
        latitude <= latLimits.max &&
        longitude >= lngLimits.min &&
        longitude <= lngLimits.max
    );

    return arrPhaHotspot.length;
}