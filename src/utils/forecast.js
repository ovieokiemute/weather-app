const request = require('request');


const foreCast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/ca277307b0a0f157f45d37e8dd835a9f/${latitude},${longitude}?units=si&`;

    request({url, json:true}, (error, { body} = {}) => {
        if(error) {
            callback('Unable to connect, check your connections!', undefined);
        }else if(body.error){
            callback('The location is invalid. Try another!', undefined)
        }else{
            callback(undefined, `${body.daily.data[0].summary}. It is currently ${body.currently.temperature} degrees`);
        }
    })
};



module.exports = foreCast;

