const {body2latlong} = require("keplerjs");
const fs = require('fs')
const data = require('./data.json')

const datos = data.map(el => {
  const body = el

  /**
  * @param {body} //Celesitial body object
  */

  const position = body2latlong(body)

  body.lat = position.lat
  body.long = position.long
  
  return body
})

fs.writeFileSync('./neasWithPosition.json', JSON.stringify(datos), 'utf-8', (err) => {
    console.log(err)
  })
