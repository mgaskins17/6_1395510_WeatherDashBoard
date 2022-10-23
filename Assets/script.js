// Javascript file

// Initalizing variables for API's needed for this assignment
var APIkey = '40f04d918b53d1a8a149e5f84300b159'; // api key requested from openweather api
var currentDate = moment().format('L');
var currentDay = moment().format('Do');
// Globalizing variables in case I need them later
var cityname 
var Clat
var Clon
var Cwindspd
var Ctemp
var Chum

var CitySearch = {};
var FiveDay = {};
// Building function where I get the results for the current day and 5-day forecast - Do i save to local storage here?
// What do I save to local storage? 
function getSearchResults(cityname, APIkey) {

    var CityURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}&units=imperial`;
    // Fetching today forecast and getting lat/Lon from the city input
    fetch(CityURL)
    .then((response) => response.json())
    .then(function(data) {
            console.log(data);
            CitySearch = {
            CName: cityname, 
            CDate: currentDate,
            Clat: data.coord.lat,
            Clon: data.coord.lon,
            Ctemp: data.main.temp,
            Cwindspd: data.wind.speed,
            Chum: data.main.humidity,
            Cweather: data.weather[0].main
        }

        localStorage.setItem('CitySearch', JSON.stringify(CitySearch));
        console.log(CitySearch);
        // $('#cityName').text(`${cityname} (${currentDate})`);
        // $('#cityTemp').text(`Temp: ${CitySearch.Ctemp}`);
        // $('#cityWindspd').text(`Wind Speed: ${CitySearch.Cwindspd}`);
        // $('#cityHum').text(`Humidity: ${CitySearch.Chum}`);

        // Getting 5-day forecast using Lat/Lon saved From City Search
        var LatLonURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${CitySearch.Clat}&lon=${CitySearch.Clon}&appid=${APIkey}`;
        fetch(LatLonURL)
        .then((response) => response.json())
        .then(function(data) {
            console.log(data)
            for (let i = 0; i < 5; i++) {
                FiveDay[i] = {
                    FiveTemp: data.list[i].main.temp,
                    FiveWind: data.list[i].wind.speed,
                    FiveHum: data.list[i].main.humidity,
                    Fiveweather: data.list[i].weather[0].main
                }
            }
            console.log(FiveDay);
            localStorage.setItem('FiveDay',JSON.stringify(FiveDay));
        })
    })

};


// Create function for RenderMessage() which will take saved objects in Local Storage then display them
function RenderCurrent() {
    var CitySearch = JSON.parse(localStorage.getItem('CitySearch'));
    if (CitySearch !== null) {
        $('#cityName').text(`${CitySearch.CName} (${CitySearch.CDate})`);
        $('#cityTemp').text(`Temp: ${CitySearch.Ctemp}`);
        $('#cityWindspd').text(`Wind Speed: ${CitySearch.Cwindspd}`);
        $('#cityHum').text(`Humidity: ${CitySearch.Chum}`);
    }
}

function RenderFiveDay() {
}

RenderCurrent()

$('#SearchBtn').click(function() {
    cityname = $('#CitySearch').val();
    getSearchResults(cityname, APIkey);
    RenderCurrent()
});