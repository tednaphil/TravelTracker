import { setTraveler, checkLogin } from "./traveler";
import {
  filterTrips,
  organizeTrips,
  findCurrentYear,
  calculateStats,
  getTripDisplayInfo,
  createTrip,
  calculateEstimate,
} from "./trips";
import { findDestination } from "./destinations";
import { fetchData, postData, fetchTrips } from "./apiCalls";

// QUERY SELECTORS
const loginPage = document.querySelector("#login-page");
const loginButton = document.querySelector("#login-button");
const usernameInput = document.querySelector("#username-input");
const passwordInput = document.querySelector("#password-input");
const header = document.querySelector("header");
const main = document.querySelector("main");
const travelerName = document.querySelector("#traveler-name");
const tripDetailsSection = document.querySelector("#trip-details-container");
const planTripForm = document.querySelector("#plan-trip-form");
const dateInput = document.querySelector("#date-input");
const durationInput = document.querySelector("#duration-input");
const numTravelersInput = document.querySelector("#num-travelers-input");
const searchButton = document.querySelector("#trip-search-button");
const lodgingTotal = document.querySelector("#lodging-total");
const airfareTotal = document.querySelector("#airfare-total");
const agentFeesTotal = document.querySelector("#agent-fee-total");
const grandTotal = document.querySelector("#grand-total");
const pendingTrips = document.querySelector("#pending-trips");
const pastTrips = document.querySelector("#past-trips");
const pendingPlaceholder = document.querySelector("#no-pending");
const pastPlaceholder = document.querySelector("#no-past");
const searchResultsSection = document.querySelector("#search-results");
const searchCloseButton = document.querySelector("#close-button");
const resultsContainer = document.querySelector("#results-container");
const tripConfirmation = document.querySelector("#trip-confirmation");
const tripConfirmationMessage = document.querySelector("#trip-confirmation-message");
const tripCosts = document.querySelector("#trip-costs");
const tripConfirmationButton = document.querySelector("#trip-confirmation-button");
const errorDisplay = document.querySelector("#error-display");
const errorText = document.querySelector("#error-text");
const errorCloseButton = document.querySelector("#error-message-button");

// EVENT LISTENERS
loginButton.addEventListener("click", function (e) {
  handleLogin(e);
});
loginPage.addEventListener("input", checkFields);
planTripForm.addEventListener("input", checkFields);
searchButton.addEventListener("click", handleSearch);
searchCloseButton.addEventListener("click", backToHome);
resultsContainer.addEventListener("click", function (e) {
  if (e.target.className === "buttons") {
    planTrip(tripInput, e.target.value);
  }
});
tripConfirmationButton.addEventListener("click", handleConfirmation);
errorCloseButton.addEventListener("click", function () {
  errorDisplay.close();
});

// GLOBAL VARIABLES
let travelersData;
let tripsData;
let destinationsData;
let currentTraveler;
let tripInput;

//FUNCTIONS

function checkFields() {
  if (usernameInput.value && passwordInput.value) {
    loginButton.disabled = false;
    loginButton.classList.remove('greyout');

  } else {
    loginButton.disabled = true;
  }

  if (dateInput.value && durationInput.value && numTravelersInput.value) {
    searchButton.disabled = false;
    searchButton.classList.remove('greyout');

  } else {
    searchButton.disabled = true;
  }
}

function handleLogin(e) {
  e.preventDefault();
  let credentials = {
    username: usernameInput.value,
    password: passwordInput.value,
  };
  const loginSuccessful = checkLogin(credentials);
  if (loginSuccessful) {
    const userID = Number(credentials.username.replace("traveler", ""));
    setData(userID);
    loginPage.classList.add("hidden");
    main.classList.remove("hidden");
    tripDetailsSection.classList.remove("hidden");
  } else {
    displayErrorMessage("Please submit valid credentials");
  }
}

function setData(userID) {
  fetchData()
    .then(({ travelers, destinations, trips }) => {
      travelersData = travelers;
      tripsData = trips;
      destinationsData = destinations;
      renderDom(userID);
    })
    .catch((error) => {
      displayErrorMessage(error);
    });
}

function renderDom(userID) {
  currentTraveler = setTraveler(userID, travelersData);
  let trips = filterTrips(currentTraveler, tripsData);
  let organizedTrips = organizeTrips(trips, destinationsData);
  let tripDisplayDetails = getTripDisplayInfo(organizedTrips);
  let currentYear = findCurrentYear(organizedTrips);
  let stats = calculateStats(
    organizedTrips,
    tripsData,
    destinationsData,
    currentYear
  );
  setMinDate();
  displayCurrentTraveler(currentTraveler);
  displayTrips(tripDisplayDetails);
  displayStats(stats);
}

function displayCurrentTraveler({ name }) {
  const firstName = name.split(" ")[0];
  travelerName.innerText = `Hi there, ${firstName}!`;
}

function setMinDate() {
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);
}

function displayTrips({ past, pending }) {
  if (typeof past === "object") {
    pastPlaceholder.classList.add("hidden");
    pastTrips.innerHTML = "";
    past.forEach((trip) => {
      pastTrips.innerHTML += `
            <div class="trip-card">
                <img alt="${trip.alt}" src="${trip.image}">
                <p>${trip.name}</p>
                <p>${trip.date}</p>
            </div>`;
    });
  }
  if (typeof pending === "object") {
    pendingPlaceholder.classList.add("hidden");
    pendingTrips.innerHTML = "";
    const reversedPending = pending.reverse();
    reversedPending.forEach((trip) => {
      pendingTrips.innerHTML += `
            <div class="trip-card">
                <img alt="${trip.alt}" src="${trip.image}">
                <p>${trip.name}</p>
                <p>${trip.date}</p>
            </div>`;
    });
  }
}

function displayStats(statsObj) {
  lodgingTotal.innerText = `$ ${statsObj.lodging}`;
  airfareTotal.innerText = `$ ${statsObj.airfare}`;
  agentFeesTotal.innerText = `$ ${statsObj.agentFee}`;
  grandTotal.innerText = `$ ${statsObj.grandTotal}`;
}

function handleSearch(e) {
  e.preventDefault();
  const dateValidation = checkTripDate();
  if (dateValidation) {
    const input = captureInput();
    clearForm();
    renderResults(destinationsData);
    displayResults(e);
  } else {
    displayErrorMessage(
      "You already have a trip planned for that day! Please choose a different day."
    );
  }
}

function checkTripDate() {
  const userTrips = filterTrips(currentTraveler, tripsData);
  const tripDates = userTrips.map((trip) => trip.date);
  const inputDate = dateInput.value.split("-").join("/");
  if (tripDates.includes(inputDate)) {
    return false;
  } else {
    return true;
  }
}

function captureInput() {
  const input = {
    date: dateInput.value,
    duration: durationInput.value,
    travelers: numTravelersInput.value,
  };
  tripInput = input;
  return input;
}

function renderResults(destinationsArray) {
  resultsContainer.innerHTML = "";
  const sortedDestinations = destinationsArray.sort((a, b) => (a.destination).localeCompare(b.destination));
  sortedDestinations.forEach((dest) => {
    resultsContainer.innerHTML += `
        <div class="result-card">
            <img src="${dest.image}" alt="${dest.alt}">
            <h3>${dest.destination}</h3>
            <p>Lodging: $${dest.estimatedLodgingCostPerDay} per day</p>
            <p>Airfare: $${dest.estimatedFlightCostPerPerson} per person</p>
            <button class="buttons" id="select-destination-button-${dest.id}" value="${dest.id}">Select</button>
        </div>`;
  });
}

function planTrip(inputObj, destinationID) {
  tripConfirmation.showModal();
  const destID = Number(destinationID);
  const dest = findDestination(destID, destinationsData);
  const tripObj = createTrip(inputObj, dest, currentTraveler);
  postData(tripObj)
    .then((data) => {
      const newTrip = data.newTrip;
      displayNewTrip(newTrip);
    })
    .catch((error) => {
      displayErrorMessage(error);
    });
}

function displayNewTrip(tripObj) {
  const dest = findDestination(tripObj.destinationID, destinationsData);
  const costs = calculateEstimate(tripObj, destinationsData);
  tripConfirmationMessage.innerText = `You've planned a trip to ${dest.destination}!`;
  tripCosts.innerHTML = `
    Lodging: $${costs.totalLodging}<br>
    Airfare: $${costs.totalAirfare}<br>
    Subtotal: $${costs.subtotal}<br>
    10% Agent Fee: $${costs.agentFee}<br>
    <span>Total Estimate: $${costs.grandTotal}</span>`;
}

function clearForm() {
  planTripForm.reset();
  searchButton.disabled = true;
  searchButton.classList.add('greyout');
}

function displayResults(e) {
  e.preventDefault();
  header.classList.add("hidden");
  main.classList.add("hidden");
  tripDetailsSection.classList.add("hidden");
  searchResultsSection.classList.remove("hidden");
}

function backToHome() {
  header.classList.remove("hidden");
  main.classList.remove("hidden");
  tripDetailsSection.classList.remove("hidden");
  searchResultsSection.classList.add("hidden");
  tripConfirmation.close();
}

function handleConfirmation() {
  fetchTrips()
    .then(({ trips }) => {
      tripsData = trips;
      renderDom(currentTraveler.id);
    })
    .catch((error) => {
      displayErrorMessage(error);
    });
  backToHome();
}

function displayErrorMessage(error) {
  errorText.innerText = error;
  errorDisplay.showModal();
}
