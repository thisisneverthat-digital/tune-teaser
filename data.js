const makeNewDate = () => {
  const newDate = new Date();

  const formatToday = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(newDate);

  const formatTime = new Intl.DateTimeFormat("en", {
    timeStyle: "medium",
  }).format(newDate);

  const time = formatTime.replace("PM", "");
  let fullTime = time >= 10 ? time : "0" + time;

  // console.log(today);
  document.querySelector("#today").innerText = formatToday;
  document.querySelector("#time").innerText = fullTime;

  setTimeout(makeNewDate, 1000);
};

makeNewDate();

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
    return getWeather(latitude, longitude).then((data) => {
      const temperature = data.main.temp.toFixed(0);
      const wind = data.wind.speed.toFixed(0);
      $("#temp").prepend(temperature);
      $("#wind").prepend(wind);
    });
  })
  .catch((err) => {
    console.log(err);
  });
