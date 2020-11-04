const baseURL =
  "https://covid-19-data.p.rapidapi.com/country?format=json&name=";
const formEl = document.querySelector("form.search");
const displayInfo = document.querySelector("div.bottom");
const searchValue = document.querySelector(".search-input");
const getValue = () => searchValue.value;

async function displayUser(user) {
  const response = await fetch(`${baseURL}${user}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      "x-rapidapi-key": "f72609271cmshcdee530fca640e4p11f3c5jsnb332cc8aee63",
    },
  });

  const data = await response.json();
  // if input is wrong - Check spelling && can try again
  // else display information

  displayInfo.textContent = `Check spelling!`;

  formEl.addEventListener("submit", userInput);
  displayInformation(data);
}

// Create element
const myButton = document.createElement("button");
myButton.textContent = "Try again";
myButton.classList.add("again");
displayInfo.appendChild(myButton);

async function userInput(e) {
  e.preventDefault();
  const el = e.currentTarget;
  // Turn form off
  el.submit.disabled = true;
  // Submit the search
  // if (el.submit.disabled == true) {
  //   el.submit.disabled = false;
  // }
  const users = await displayUser(el.name.value);
  el.submit.disabled = false;
}

function displayInformation(data) {
  var date = new Date();
  displayInfo.innerHTML = `<div>Country: ${data[0].country}</div><div>Confirmed cases: ${data[0].confirmed}</div>
       <div>Total deaths: ${data[0].deaths}</div>
       <div>Total recovered: ${data[0].recovered}</div>
       <div>Last updated: ${date}</div>`;
}

function handleError(error) {
  console.log("OH NO!!!");
  console.log(error);
}

const clearValue = () => {
  searchValue.value = "";
};

searchValue.addEventListener("click", clearValue);

displayUser("uk").catch(handleError);
