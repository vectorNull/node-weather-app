const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=bd6f3134aca9eac29a8c9ffe12fda587&units=f&query=${longitude},${latitude}`;
    
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service.');
        } else if (body.error) {
            const { code, type, info } = body.error;
            callback({
                statusCode: code,
                type,
                message: info
            });
        } else {
            const temp = body.current.temperature;
            const feelsLike = body.current.feelslike;
            callback(undefined, `The current temperature is ${temp} degrees, but it feels like ${feelsLike} degrees.`);
        }
    
    })
}

module.exports = forecast