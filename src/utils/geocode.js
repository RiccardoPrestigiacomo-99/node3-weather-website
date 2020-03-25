const request = require('request')
/* const url = 'https://api.darksky.net/forecast/e8328fe62a0034a7741cf9958842d54d/37.8267,-122.4233'

//json: true -> la nostra risposta è già un oggetto json, non c'è bisogno di usare il metodo JSON.parse(response.body)
request({ url: url, json: true }, (error, response) => {
    if(error) {
        console.log('Unable to connect')
    } else if(response.body.error) {
        console.log('Unable to find location')
    }
     else {
    console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' 
    + response.body.currently.precipProbability + '% chance of rain')
    }
})  */


// Geocoding
// Address -> Lat/Long -> Weather

/* const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicmljY2FyZG9wb2w5OSIsImEiOiJjazd1bTBlOW0wejV6M2ZuMWV1OG54N2k3In0.GlV2CyRa6eEXecTZIrmt5w&limit=1'

request( { url: geocodeURL, json: true}, (error, response) => {
    const lat = response.body.features[0].center[1]
    const long = response.body.features[0].center[0]
    console.log(lat, long)
}) */


/* const url =  'https://api.mapbox.com/geocoding/v5/mapbox.places/Milano.json?access_token=pk.eyJ1IjoicmljY2FyZG9wb2w5OSIsImEiOiJjazd1bTBlOW0wejV6M2ZuMWV1OG54N2k3In0.GlV2CyRa6eEXecTZIrmt5w&limit=1'
request( { url: url, json: true}, (error, response) => {
    
    if(error) {
        console.log('Unable to connect to location services')
    } else if(response.body.features.length === 0) {
        console.log('Wrong place, try again')
    } else {
        const lat = response.body.features[0].center[1]
        const long = response.body.features[0].center[0]
        console.log(lat , long)
    }
}) */

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmljY2FyZG9wb2w5OSIsImEiOiJjazd1bTBlOW0wejV6M2ZuMWV1OG54N2k3In0.GlV2CyRa6eEXecTZIrmt5w&limit=1'
    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location, try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode