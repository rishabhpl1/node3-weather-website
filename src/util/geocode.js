const request = require('postman-request')

const geocode = (address, callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoicmlzaGFiaC0yIiwiYSI6ImNrcGkyMjZoczJyNG8yd2xscGF0bmZjZWQifQ.Zb3lj4KEsYR-HjOD-5enHQ&limit=1"
    request({url:url, json: true}, (err, {body})=>{
        if(err){
            callback('Unable to connect to location services!', undefined)
        }
        else if(body.features.length===0){
            callback('Unable to find the locations', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location:  body.features[0].place_name
            })
        }
    })
}



module.exports = geocode