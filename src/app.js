const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require("./util/geocode")
const forecast = require("./util/forecast")

const app = express()
// Define path for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// console.log(__dirname)

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

// since below code is never used we will remove it.
// app.get('', (req, res) => {
// res.send('<h1>Weather</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name: "Rishabh Pal"
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        name:'Rishabh Pal',
         title:'About Me'
    })
})
app.get('/help', (req, res)=>{
    res.render('help', {
        name: "Rishabh",
        title: "Help"
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Address not present"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({
                error: error
            })
        }
        
        forecast(latitude, longitude, (error, forecastedData) => {
            if(error){
                return res.send({error: error })
            }
           res.send({
               forecast: forecastedData, location
           })
          })
    })    


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: "Help article not found", 
        title:"404 Page",
        name:"Rishabh"
    })
})

// Handling 404 request. We use "*" that says everthing is a match(wildcard character). Since, 
app.get('*', (req, res)=>{
    res.render('404', {
        errorMessage: "Page not found",
        title:"Page not found",
        name:"Rishabh"
    })
})
app.listen(3000, () => {
    console.log("Server is up on port 3000")
})
// app.com
// app.com/help
// app.com/about