const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");

const msg = document.querySelector("span.msg");
const list = document.querySelector(".ajax-section .cities");

// localStorage.setItem(
//   "apiKey",
//   EncryptStringAES("ab4ad2180412fe2746ca961bd35c26df")
// );

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    getWeatherDataFromApi();
})

const getWeatherDataFromApi = () => {
    // alert("http requst gone");
    let apikey = DecryptStringAES(localStorage.getItem("apiKey"));
    let inputVal = input.value;
    let unitType = "metric";
    let lang = "tr";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apikey}&units=${unitType}&lang=${lang}`;
    form.reset();

}