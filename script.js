const x = document.getElementById("demo");
const API_KEY = "415712ef3b11403da04c7108797a19ae";

const btn = document.getElementById("btn");
const auto = document.getElementById("auto");
const output = document.getElementById("output");

const out = document.getElementById('output2');

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${API_KEY}`,
  )
    .then((response) => response.json())
    .then((result) => {
      output.innerHTML += `
    <h1>Your Current Time Zone</h1>
    <p>Name Of time Zone: ${result.results[0].address_line2}</p>
    <p>Lat: ${result.query.lat}</p>
    <p>Long: ${result.query.lon}</p>

    <p>Offset STD:: ${result.results[0].timezone.offset_DST}</p>
    <p>Offset STD Seconds : ${result.results[0].timezone.offset_DST_seconds}</p>
    <p>Offset DST: ${result.results[0].timezone.offset_STD}</p>
    <p>Offset DST Seconds: ${result.results[0].timezone.offset_STD_seconds}</p>
    `;
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
}

function error() {
  alert("Sorry, no position available.");
}

getLocation();

btn.addEventListener("click", () => {
  let autocomplete = auto.value;

  fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${autocomplete}&limit=5&format=json&apiKey=${API_KEY}`,
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      console.log(result.results);
      if (result.results.length === 0) {
        console.log("error");
        out.innerHTML = `
        <h1 style="color: red;" >please enter correct address
        `
      }else if(result.results.length !== 0){
         out.innerHTML = `
    <h1>Your Current Time Zone</h1>
    <p>Name Of time Zone: ${result.results[0].address_line2}</p>
    <p>Lat: ${result.results[0].bbox.lat1}</p>
<p>Long: ${result.results[0].bbox.lon1}</p>

    <p>Offset STD:: ${result.results[0].timezone.offset_DST}</p>
    <p>Offset STD Seconds : ${result.results[0].timezone.offset_DST_seconds}</p>
    <p>Offset DST: ${result.results[0].timezone.offset_STD}</p>
    <p>Offset DST Seconds: ${result.results[0].timezone.offset_STD_seconds}</p>
    `;
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
