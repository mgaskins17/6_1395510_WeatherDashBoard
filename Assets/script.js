// Javascript file

// Initalizing variables for API's needed for this assignment
var APIkey = '40f04d918b53d1a8a149e5f84300b159'; // api key requested from openweather api
var currentDate = moment().format('L');
var currentMonth = moment().format('MM');
var currentDay = moment().format('DD');
var currentYear = moment().format('YYYY');
// Globalizing variables in case I need them later
var cityname 
var Clat
var Clon
var Cwindspd
var Ctemp
var Chum

if (localStorage.getItem('Searches') !== null) {
    var SearchHistory = JSON.parse(localStorage.getItem('Searches'));
} else {
    var SearchHistory =[]
}

var CitySearch = {};
var FiveDay = {};

// Building function where I get the results for the current day and 5-day forecast - Do i save to local storage here?
// What do I save to local storage? 
async function getSearchResults(cityname, APIkey) {

    var CityURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}&units=imperial`;
    // Fetching today forecast and getting lat/Lon from the city input
    await fetch(CityURL)
    .then((response) => response.json())
    .then(async function(data) {
            console.log(data);
            CitySearch = {
            CName: cityname, 
            CDate: currentDate,
            Clat: data.coord.lat,
            Clon: data.coord.lon,
            Ctemp: data.main.temp,
            Cwindspd: data.wind.speed,
            Chum: data.main.humidity,
            Cweather: data.weather[0].main, 
            CIcon: data.weather[0].icon, 
            CStatus: data.weather[0].description
        }

        localStorage.setItem('CitySearch', JSON.stringify(CitySearch));
        console.log(CitySearch);


        // Getting 5-day forecast using Lat/Lon saved From City Search
        var LatLonURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${CitySearch.Clat}&lon=${CitySearch.Clon}&appid=${APIkey}&units=imperial`;
        await fetch(LatLonURL)
        .then((response) => response.json())
        .then(function(data) {
            console.log(data)
            for (let i = 7; i < 40; i+=8) {
                FiveDay[i] = {
                    CName: cityname,
                    FiveTemp: data.list[i].main.temp,
                    FiveWind: data.list[i].wind.speed,
                    FiveHum: data.list[i].main.humidity,
                    Fiveweather: data.list[i].weather[0].main,
                    FiveIcon: data.list[i].weather[0].icon
                }
            }
            console.log(FiveDay);
            localStorage.setItem('FiveDay',JSON.stringify(FiveDay));
        })
    })

    RenderCurrent()
    RenderFiveDay()

};

// Create function for RenderMessage() which will take saved objects in Local Storage then display them
function RenderCurrent() {
    var CitySearch = JSON.parse(localStorage.getItem('CitySearch'));
    $('#cityName').text(`${CitySearch.CName} (${CitySearch.CDate})`);
    $('#todaypic').attr('src',`https://openweathermap.org/img/wn/${CitySearch.CIcon}.png`)
    $('#todaypic').attr('alt',`${CitySearch.CStatus}`)
    $('#cityTemp').text(`Temp: ${CitySearch.Ctemp} °F`);
    $('#cityWindspd').text(`Wind Speed: ${CitySearch.Cwindspd} mph`);
    $('#cityHum').text(`Humidity: ${CitySearch.Chum}%`);
}

function RenderFiveDay() {
    var FiveObj = JSON.parse(localStorage.getItem('FiveDay')); // tried using FiveDay but it created issues - don't reuse global variables for local purposes
    count = 0;
    for (let i = 7; i < 40; i+=8) {
        console.log('render five works')
        $(`#Day${count}`).empty()
        $('<div>').addClass('added').text(`${currentMonth}/${parseInt(currentDay)+i+1}/${currentYear}`).attr('style','font-size: 1rem; font-weight: bold').appendTo(`#Day${count}`)
        $('<div>').addClass('added').text(`Temp: ${FiveObj[i].FiveTemp} °F`).attr('style','font-size: .9rem').appendTo(`#Day${count}`)
        Temppic = $('<img>').addClass('added').attr('src',`https://openweathermap.org/img/wn/${FiveObj[i].FiveIcon}.png`);
        Temppic.attr('style','height:25%; width:40%; margin:0 auto').appendTo(`#Day${count}`)
        $('<div>').addClass('added').text(`Wind Speed: ${FiveObj[i].FiveWind} mph`).attr('style','font-size: .9rem').appendTo(`#Day${count}`)
        $('<div>').addClass('added').text(`Humidity: ${FiveObj[i].FiveHum}`).attr('style','font-size: .9rem').appendTo(`#Day${count}`)
        count++
    }
console.log(count)
}

// Build Search History 
// Treat each one as a button that will output that cities weather forecast
function SearchRender() {
    // resetSearch()
    $('#past').empty()
    if (localStorage.getItem('Searches') !== null) {
    var SearchHis = JSON.parse(localStorage.getItem('Searches'));
    }
    
    for (let i = 0; i<SearchHis.length; i++) {
        $('<button>').text(SearchHis[i]).addClass('Hist-btn btn btn-danger d-block p-2 my-2 form-control').appendTo('#past');
    }
}

// Checking to see if there is something in local storage then outputting if there is
if (localStorage.getItem('CitySearch') !== null) {
    Recover = JSON.parse(localStorage.getItem('CitySearch'))
    getSearchResults(Recover.CName,APIkey)
    SearchRender()
}

// Search button action of putting out new results
$('#SearchBtn').click(function() {
    cityname = $('#CitySearch').val();
    if ($('#CitySearch').val() !== '') {
        if (SearchHistory.includes(cityname.toUpperCase()) == false)
            SearchHistory.push(cityname.toUpperCase());
            localStorage.setItem('Searches',JSON.stringify(SearchHistory));
    }
    getSearchResults(cityname.toUpperCase(), APIkey);
    SearchRender()
});

$('#ClearBtn').click(function() {
    SearchHistory = [];
    localStorage.setItem('Searches',JSON.stringify(SearchHistory));
    $('#past').empty
    SearchRender()
})

// Reacting to when a past history button is pressed
$("#past").on('click','button',function() { // for some reason I put an event listener on the container for the buttons instead the buttons themselves
    console.log('please work now');
    getSearchResults($(this).text(), APIkey)
})
  












