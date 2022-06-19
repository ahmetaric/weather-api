const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");

const msg = document.querySelector("span.msg");
const list = document.querySelector(".ajax-section .cities");

localStorage.setItem(
  "apiKey",
  EncryptStringAES("ab4ad2180412fe2746ca961bd35c26df")
);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherDataFromApi();
});

const getWeatherDataFromApi = async () => {
  // alert("http requst gone");
  let apikey = DecryptStringAES(localStorage.getItem("apiKey"));
  let inputVal = input.value;
  let unitType = "metric";
  let lang = "tr";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apikey}&units=${unitType}&lang=${lang}`;

  try {
    // const response = await fetch(url).then(response => response.json());
    const response = await axios(url);
    const { name, main, sys, weather } = response.data;
    console.log(response.data);
    let iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    const cityListItems = list.querySelectorAll(".city");
    const cityListItemsArray = Array.from(cityListItems);
    if(cityListItemsArray.length > 0){
        const filteredArray = cityListItemsArray.filter(cityCard=> cityCard.querySelector("span").innerHTML == name);
          if (filteredArray.length > 0) {
            msg.innerText = `You already know the weather for ${name}, Please search for another city 😉`;
            setTimeout(() => {
              msg.innerText = "";
            }, 5000);
            form.reset();
            return;
          }
    }

    const createdLi = document.createElement("li");
    createdLi.classList.add("city");
    const createdLiInnerHTML = `
        
    <h2 class="city-name" data-name="${name}, ${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
    </h2>
    <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
    <figure>
        <img class="city-icon" src="${iconUrl}">
        <figcaption>${weather[0].description}</figcaption>
    </figure>
`;
createdLi.innerHTML = createdLiInnerHTML;
list.prepend(createdLi);
  } catch (error) {
    msg.innerText = error;
     setTimeout(() => {
       msg.innerText = "";
     }, 5000);
  }
  form.reset();
};
