const request = require('postman-request')

const forecast = (lattitute, longitude, callback) =>{
    const lat = lattitute
    const long = longitude
    const url = 'http://api.weatherstack.com/current?access_key=33cb09f0f385f7256eb8b4e178871522&query='+long+','+lat
    request({url, json:true}, (err, res)=>{
        if(err){
            callback("Unable to connect to the services!", undefined)
        }
        else if(res.body.success==="false"){
            callback("Unable to find the location", undefined)
        }
        else{
            callback(undefined, {
                temperature: res.body.current.temperature,
                precipitation: res.body.current.precip,
                location: res.body.location.name,
                wind_speed: res.body.current.wind_speed,
                humidity: res.body.current.humidity
            })
             
        }
    })
}
module.exports = forecast