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

const getLocation = () => {
  return fetch("http://ipinfo.io/json?token=33d2e9470d7e14").then(
    (response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("cannot fetch location data");
      }
    }
  );
};

getLocation()
  .then((data) => {
    console.log(data.city);
    console.log(data.region);
    console.log(data.country);
  })
  .catch((err) => {
    console.log(err);
  });
