const request = require('request');


const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1IjoibWFyc2hhbGxpdiIsImEiOiJjanYwZWV5YnkwY2F2NDNvYnQ1bGU5djN0In0.ay_HkOD4vLGgBgvRxA4WXA`;

    request({url, json:true}, (error, { body }= {}) => {
        if(error){
            callback('Cannot connect. Check your connections!', undefined)
        }else if(body.features.length === 0){
            callback('Invalid Search. Try again!', undefined)
        }else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            });
        };
    });

};

module.exports = geoCode;

