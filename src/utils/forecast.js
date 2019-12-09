const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/71c98d369aa79b0b99825ecfe7a45755/' + latitude + ',' + longitude + '?lang=ko&units=si'
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect forecast API', undefined)
        } else if(body.error) {
            callback('Unable to find loction information.', undefined)
        } else {
            callback(undefined, 
                "현재 : " + body.daily.data[0].summary + ", 기온은 " + body.currently.temperature + "도이며, 현재 강수 확률은" + body.currently.precipProbability + "% 입니다.")
        }
    })
}

module.exports = forecast
