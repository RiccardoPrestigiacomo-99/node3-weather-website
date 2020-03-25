const request = require('request')







const forecast = (longitude, latitude, callback) => {
    
    const url = 'https://api.darksky.net/forecast/e8328fe62a0034a7741cf9958842d54d/' + latitude + ',' + longitude

    request( {url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degress out. There is a '
            + body.currently.precipProbability + '% chance of rain. Wind speed is: ' + body.currently.windSpeed
            )
        }
    })
}


module.exports = forecast