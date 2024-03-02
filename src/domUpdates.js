import { setTraveler, checkLogin } from "./traveler";
import { filterTrips, organizeTrips, calculateTripCost, findCurrentYear, calculateStats, getTripDisplayInfo, createTrip, makeTentativeTrips, getResultsDisplayInfo, calculateEstimate } from "./trips";
import { findDestination, getDestCostDisplay, getDestDisplayInfo, filterDestinations } from "./destinations";
import { fetchData, postData, fetchTrips } from "./apiCalls";

// QUERY SELECTORS
const loginPage = document.querySelector('#login-page');
const loginButton = document.querySelector('#login-button');
const usernameInput = document.querySelector('#username-input');
const passwordInput = document.querySelector('#password-input');

const main = document.querySelector('main');
const tripDetailsSection = document.querySelector('#trip-details-container');

const planTripForm = document.querySelector('#plan-trip-form');
const dateInput = document.querySelector('#date-input');
const durationInput = document.querySelector('#duration-input');
const numTravelersInput = document.querySelector('#num-travelers-input');
const searchButton = document.querySelector('#trip-search-button');

const lodgingTotal = document.querySelector('#lodging-total');
const airfareTotal = document.querySelector('#airfare-total');
const agentFeesTotal = document.querySelector('#agent-fee-total');
const grandTotal = document.querySelector('#grand-total');
const pendingTrips = document.querySelector('#pending-trips');
const pastTrips = document.querySelector('#past-trips');
const pendingPlaceholder = document.querySelector('#no-pending');
const pastPlaceholder = document.querySelector('#no-past');

const searchResultsSection = document.querySelector('#search-results');
const searchCloseButton = document.querySelector('#close-button');
const resultsContainer = document.querySelector('#results-container');

const tripConfirmation = document.querySelector('#trip-confirmation');
const tripConfirmationMessage = document.querySelector('#trip-confirmation-message');
const tripCosts = document.querySelector('#trip-costs')
const tripConfirmationButton = document.querySelector('#trip-confirmation-button');




// EVENT LISTENERS
loginButton.addEventListener('click', function(e) {
    handleLogin(e)
});
// window.addEventListener('load', setData);
searchButton.addEventListener('click', handleSearch);
searchCloseButton.addEventListener('click', backToHome);
resultsContainer.addEventListener('click', function(e) {
    planTrip(tripInput, e.target.value)
})
tripConfirmationButton.addEventListener('click', handleConfirmation)

// GLOBAL VARIABLES
let travelersData;
let tripsData;
let destinationsData;
// let userID;
let currentTraveler;
let tripInput;

function handleLogin(e) {
    e.preventDefault();
    let credentials = {
        username: usernameInput.value,
        password: passwordInput.value
    }
    const loginSuccessful = checkLogin(credentials);
    if (loginSuccessful) {
        console.log('credentials', credentials);
        const userID = Number(credentials.username.replace('traveler', ''))
        setData(userID);
        loginPage.classList.add('hidden');
        main.classList.remove('hidden');
        tripDetailsSection.classList.remove('hidden');
    } else {
        //display error text
        throw new Error('bad credentials')
    }
}

function setData(userID) {
    fetchData()
//refactor to take in traveler id to pass into renderDom
    .then(({travelers, destinations, trips}) => {
        travelersData =travelers;
        tripsData = trips;
        destinationsData = destinations;
        renderDom(userID)
    })
    .catch(error => {
        console.log(error)
        return error
    })
}



function renderDom(userID) {
    //add paramater to accept traveler id to pass to setTraveler
    // console.log('trips data', tripsData)
    currentTraveler = setTraveler(userID, travelersData);
    console.log('currentTraveler', currentTraveler)
    let trips = filterTrips(currentTraveler, tripsData);
    console.log('trips', trips);
    let organizedTrips = organizeTrips(trips);
    console.log('organizedTrips', organizedTrips);
    let tripDisplayDetails = getTripDisplayInfo(organizedTrips, destinationsData);
    console.log('Trip Display Info', tripDisplayDetails)
    let currentYear = findCurrentYear(organizedTrips);
    let stats = calculateStats(organizedTrips, tripsData, destinationsData, currentYear);
    console.log('stats', stats)
    displayTrips(tripDisplayDetails);
    displayStats(stats);
}

function displayTrips({past, pending}) {
    if (typeof past === 'object') {
        pastPlaceholder.classList.add('hidden');
        pastTrips.innerHTML = ''
        past.forEach(trip => {
            pastTrips.innerHTML += `
            <div class="trip-card">
                <img alt="${trip.alt}" src="${trip.image}">
                <p>${trip.name}</p>
            </div>`
        })
    };
    if (typeof pending === 'object') {
        pendingPlaceholder.classList.add('hidden');
        pendingTrips.innerHTML = ''
        pending.forEach(trip => {
            pendingTrips.innerHTML += `
            <div class="trip-card">
                <img alt="${trip.alt}" src="${trip.image}">
                <p>${trip.name}</p>
            </div>`
        })
    }; 
};

function displayStats(statsObj) {
    lodgingTotal.innerText = `$ ${statsObj.lodging}`;
    airfareTotal.innerText = `$ ${statsObj.airfare}`;
    agentFeesTotal.innerText = `$ ${statsObj.agentFee}`;
    grandTotal.innerText = `$ ${statsObj.grandTotal}`;

};

function handleSearch(e) {
    // console.log('tripsData at time of search', tripsData)
    const input = captureInput(); //do i need to store this globaly?
    clearForm()
    // const tentativeTrips = makeTentativeTrips(input, destinationsData);
    renderResults(destinationsData);
    displayResults(e);
    
}

function captureInput() {
    //return object with all input from form
    // console.log('date', dateInput.value)
    // console.log('duration', durationInput.value)
    // console.log('travelers', numTravelersInput.value)
    const input = {
        date: dateInput.value,
        duration: durationInput.value,
        travelers: numTravelersInput.value
    }
    console.log('input object', input)
    tripInput = input
    return input
}

function renderResults(destinationsArray) {
    resultsContainer.innerHTML = ''
    destinationsArray.forEach(dest => {
        resultsContainer.innerHTML += `
        <div class="result-card">
            <h3>${dest.destination}</h3>
            <p>Lodging: $${dest.estimatedLodgingCostPerDay} per day</p>
            <p>Airfare: $${dest.estimatedFlightCostPerPerson} per person</p>
            <button class="buttons" id="select-destination-button" value="${dest.id}">Select</button>
        </div>`
    })
}

function planTrip(inputObj, destinationID) {
    // tripConfirmation.classList.remove('hidden');
    // searchResultsSection.classList.add('hidden');

    tripConfirmation.showModal()
    const destID = Number(destinationID)
    console.log('destination id is a', typeof destID)
    const dest = findDestination(destID, destinationsData) //maybe pass target value in directly
    const tripObj = createTrip(inputObj, dest, currentTraveler)
    
    console.log('trip obj', tripObj)
    postData(tripObj)
        .then(data => {
            // console.log(data.newTrip)
            const newTrip = data.newTrip
            console.log('new trip', newTrip)
            // const costs = calculateTripCost(newTrip.id)
            // setData() says json stream already read????
            displayNewTrip(newTrip)
        })
    // console.log('posted Trip', postedTrip)
    //create new trip and store in variable
    // postTrip(newTrip)
    //post new trip (this function will generate/reassign it's id OR refactor createNewTrip to create it)
    //calculateTripCost(newtrip.id) and store in variable
    //display confirmation window
    //display total trip cost, and confirm posting(then re-set data, and return to home)
}

function displayNewTrip(tripObj) {
    const dest = findDestination(tripObj.destinationID, destinationsData)
    console.log('display new trip dest', dest)
    const costs = calculateEstimate(tripObj, destinationsData)
    console.log('costs for displayNewTrip', costs)
    tripConfirmationMessage.innerText = `You've planned a trip to ${dest.destination}!`;
    tripCosts.innerHTML = `
    Lodging: $${costs.totalLodging}<br>
    Airfare: $${costs.totalAirfare}<br>
    Subtotal: $${costs.subtotal}<br>
    10% Agent Fee: $${costs.agentFee}<br>
    Total Estimate: $${costs.grandTotal}`
}

function clearForm() {
    // document.getElementById('plan-trip-form').reset();
    planTripForm.reset()
}

function displayResults(e) {
    e.preventDefault();
    main.classList.add('hidden');
    tripDetailsSection.classList.add('hidden');
    searchResultsSection.classList.remove('hidden');
};


function backToHome() {
    main.classList.remove('hidden');
    tripDetailsSection.classList.remove('hidden');

    searchResultsSection.classList.add('hidden');
    // tripConfirmation.classList.add('hidden');
    tripConfirmation.close();
};

function handleConfirmation() {
    fetchTrips()
    .then(({trips}) => {
        tripsData = trips;
        renderDom(currentTraveler.id);
    })
    .catch(error => console.log(error))
    backToHome()
}



