// const date = new Date();
// const month = date.getMonth() + 1;
// const day = date.getDate();
// const year = date.getFullYear();
//
// document.querySelector("#today").innerHTML = `${month} ${day} ${year}`;

var date = new Date();
var a = new Intl.DateTimeFormat("en", {
  dateStyle: "full",
  timeStyle: "full",
}).format(date);
console.log(a);

document.querySelector("#today").innerText = `${a}`;

//TODO: 위치 정보가 부정확한편임. 다른 API 찾아보기
const getLocation = async () => {
  const response = await fetch(
    "https://ipinfo.io/json?token=e35307e7a95596",
    {}
  );
  return response.json();
};

const getWeather = async (latitude, longitude) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=f178a17b7896893fc09f8333e1b524a8`
  );
  return response.json();
};

getLocation()
  .then((data) => {
    const nowLocation = data.loc.split(",");
    latitude = nowLocation[0];
    longitude = nowLocation[1];
    $("#latitude").append(latitude);
    $("#longitude").append(longitude);
    return getWeather(latitude, longitude).then((data) => {
      const temperature = data.main.temp.toFixed(0);
      const wind = data.wind.speed.toFixed(0);
      console.log(wind);
      $("#temp").prepend(temperature);
      $("#wind").prepend(wind);
    });
  })
  .catch((err) => {
    console.log(err);
  });
