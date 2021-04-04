import csvtojson2 from 'csvtojson'
import Pha from '../../api/Pha/model'
import Nea from '../../api/Nea/model'
import Client from '../../api/Client/model'
import { addManyPha } from '../../api/Pha/utils/addPha'
import { addMany } from '../../helpers/addHandlers'
import { addManyClient } from '../../api/Client/utils/addClient'

export const feedDb = async () => {
    try {
        const csvPha = '/OrbitalParameters_PHAs.csv';

        const jsonPha = await csvtojson2().fromFile(__dirname + csvPha)
        
        await Pha.deleteMany({})        
        await addManyPha(Pha, jsonPha)

        await Nea.deleteMany({})
        await addMany(Nea, jsonPha)

        const csvClients = '/List_Of_Clients.csv';

        const jsonClients = await csvtojson2().fromFile(__dirname + csvClients)
        await Client.deleteMany({})
        await addManyClient(Client, jsonClients)

        return true
    } catch (error) {
        console.log(error.message);

        return false
    }

}