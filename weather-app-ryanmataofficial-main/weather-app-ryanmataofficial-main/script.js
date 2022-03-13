document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);

  //fetch weather
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=8ce3f8759de8a19144336db72d480212";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = "";
      results += '<div id = weatherItem><h2>Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
	       results += '<div id = weatherBlock><img id = weatherImage src="https://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += "<div><p>"
      for (let i=0; i < json.weather.length; i++) {
	       results += json.weather[i].description
	       if (i !== json.weather.length - 1)
	       results += ", "
      }
      results += "</p>";
      results += "<p>Wind Speed: ";
      results += json.wind.speed;
      results += " mph</p>"
      results += "<p>Wind Direction: ";
      results += json.wind.deg;
      results += "&deg;</p>"
      results += "<p>Humidity: ";
      results += json.main.humidity;
      results += "%</p></div></div>"
      results += '<h2 id = extraBottomPadding>' + json.main.temp + " &deg;F</h2></div>"
      document.getElementById("weatherResults").innerHTML = results;
    });

  //fetch forcast
  const url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=8ce3f8759de8a19144336db72d480212";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let forecast = "";
      for (let i=0; i < json.list.length; i++) {
	 forecast += "<div id = \"forecastItem\"><h3>" + moment(json.list[i].dt_txt).format('MMMM Do, YYYY <br> h:mm:ss a') + "</h3>";
	 forecast += "<p>Temperature: " + json.list[i].main.temp + " &deg;F" + "</p>";
   forecast += "<p>Humidity: " + json.list[i].main.humidity + "%</p>";
	 forecast += '<div id = image><img src="https://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/></div>'
         forecast += "<p>Wind Speed: " + json.list[i].wind.speed + " mph</p>";
         forecast += "<p>Wind Direction: " + json.list[i].wind.deg + "&deg;</p></div>";
      }
      document.getElementById("forecastResults").innerHTML = forecast;
    });
});
