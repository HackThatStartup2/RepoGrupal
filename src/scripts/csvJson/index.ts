import csvtojson2 from 'csvtojson'
import Nea from '../../api/Nea/model'

export const feedDb = async () => {
    try {
        const csvFilePath = '/OrbitalParameters_PHAs.csv';

        const json = await csvtojson2().fromFile(__dirname + csvFilePath)
        await Nea.deleteMany({})
        await Nea.insertMany(json)

        return true
    } catch (error) {
        return false
    }

}