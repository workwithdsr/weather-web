const cityName = document.querySelector('.searchinput')
const searchBtn = document.querySelector('.searchbutton')

const searchCitySection = document.querySelector('.weather')
const weatherInfoSection= document.querySelector('.search_weather')
const notFoundSection = document.querySelector('.not-found')


const countryName = document.querySelector('.city-name')
const tempText = document.querySelector('.temp-text')
const cloud = document.querySelector('.weather_icon')
const currentDate = document.querySelector('date')

const apikey = "e0af5fe7a2aa18088fa823e77074bd70"

searchBtn.addEventListener('click', () => {
    if (cityName.value.trim() != '') {
       updateWeatherInfo( cityName.value)
        cityName.value = ''
        cityName.blur()
    }
})
cityName.addEventListener('keydown', (event) => {
if (event.key == 'Enter' &&
    cityName.value.trim() != ''
){
   updateWeatherInfo( cityName.value)
        cityName.value = ''
        cityName.blur()
}
})

async function getfetchData( endPoint, city){
    const apiurl = `https://api.openweathermap.org/data/2.5/${endPoint}?units=metric&q=${city}&appid=${apikey}&units=metric`

    const response = await fetch(apiurl)
    return response.json()

}

function getWeatherIcon(id){
if (id <= 232) return 'thunderstorm.png'
if (id <= 321) return 'drizzle.png'
if (id <= 531) return 'rain.png'
if (id <= 622) return 'snow.png'
if (id <= 781) return 'atmosphere.png'
if (id <= 800) return 'cleail.png'
else return 'clouds.png'
}

function getCurrentDate(){
    const currentDate = new Date()
    // const options = {
    //     weekday: 'short',
    //     day: '2-digit',
    //     month: 'shorts',
    // }

    // return currentDate.toLocaleDateString('en-GB',options )
    console.log(currentDate)
}

async function updateWeatherInfo(city) {
    const weatherData =  await getfetchData('weather', city)


if(weatherData.cod != 200){
    showDisplaySection(notFoundSection)
    return
}

console.log(weatherData)

const {
    name: country,
    main: {temp, humidity},
    weather: [ { id, main } ],
    wind: speed
    } = weatherData

    countryName.textContent = country
    tempText.textContent = Math.round(temp) + '°C '
    // currentDate.textContent = getCurrentDate()

    cloud.src = `images/${getWeatherIcon(id)}`
    showDisplaySection(weatherInfoSection)
}



function showDisplaySection(section){
    [ weatherInfoSection, searchCitySection, notFoundSection]
    .forEach(section => section.style.display ="none")
 
     section.style.display ='inline-block'
}