// Javascript file
var APIkey = '40f04d918b53d1a8a149e5f84300b159'; // api key requested from openweather api
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} <- BASE URL

// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
var currentDate = moment().format('L');
var currentDay = moment().format('Do');
// Globalizing variables in case I need them later
var cityname 
var Clat
var Clon
var Cwindspd
var Ctemp
var Chum

var CitySearch = {
    Clat: '', 
    Clon: '',
    Ctemp: '',
    Cwindspd: '',
    Chum:'',
};
function getSearchResults(cityname, APIkey) {

    var CityURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}&units=imperial`;
    // Fetching today forecast and getting lat/Lon from the city input
    fetch(CityURL)
    .then((response) => response.json())
    .then(function(data) {
        console.log(data);
        CitySearch = {
        Clat: data.coord.lat,
        Clon: data.coord.lon,
        Ctemp: data.main.temp,
        Cwindspd: data.wind.speed,
        Chum: data.main.humidity,
        }    
        $('#cityName').text(`${cityname} (${currentDate})`);
        $('#cityTemp').text(`Temp: ${CitySearch.Ctemp}`);
        $('#cityWindspd').text(`Wind Speed: ${CitySearch.Cwindspd}`);
        $('#cityHum').text(`Humidity: ${CitySearch.Chum}`);

        // Getting 5-day forecast using Lat/Lon saved From City Search
        var LatLonURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${CitySearch.Clat}&lon=${CitySearch.Clon}&appid=${APIkey}`;
        fetch(LatLonURL)
        .then((response) => response.json())
        .then(function(data) {
            console.log(data)
        })
    })

};

$('#SearchBtn').click(function() {
    cityname = $('#CitySearch').val();
    getSearchResults(cityname, APIkey);
})
// getSearchResults(cityname, APIkey);


    // 
//     //var BaseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`;

//     fetch(CityURL).then(function(results) {
//         return results.json
//     }.then((data) => console.log(data))
// }

// var results = getSearchResults(cityname, APIkey).then(function(results) {
//     console.log(results);
// })