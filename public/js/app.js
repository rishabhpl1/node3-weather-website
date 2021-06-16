const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {

    event.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch(`/weather?address=${location}`).then((resp) => {
    resp.json().then((data) => {
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location 
             
            messageTwo.textContent = "temperature is " + data.forecast.temperature + "chances of rain " + 
            data.forecast.precipitation + "%" + ", humidity is " + data.forecast.humidity + "wind speed " +
            data.forecast.wind_speed + "Km/ph"
        }
    })
    })
})

// fetch('http://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) => {
//         console.log(data)
//     })
// })