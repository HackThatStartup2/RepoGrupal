import csvtojson2 from 'csvtojson'
import Nea from '../../api/Nea/model'
import Client from '../../api/Client/model'

export const feedDb = async () => {
    try {
        const csvPha = '/OrbitalParameters_PHAs.csv';

        const jsonPha = await csvtojson2().fromFile(__dirname + csvPha)
        await Nea.deleteMany({})
        await Nea.insertMany(jsonPha)

        const csvClients = '/List_Of_Clients.csv';

        const jsonClients = await csvtojson2().fromFile(__dirname + csvClients)
        await Client.deleteMany({})
        await Client.insertMany(jsonClients)

        return jsonClients
    } catch (error) {
        return false
    }

}