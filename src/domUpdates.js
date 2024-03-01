import { setTraveler, checkLogin } from "./traveler";
import { filterTrips, organizeTrips, calculateTripCost, findCurrentYear, calculateStats, getTripDisplayInfo, createTrip, makeTentativeTrips, getResultsDisplayInfo } from "./trips";
import { findDestination, getDestCostDisplay, getDestDisplayInfo, filterDestinations } from "./destinations";
import { fetchData, postData } from "./apiCalls";

// QUERY SELECTORS
const main = document.querySelector('main');
const tripDetailsSection = document.querySelector('#trip-details-container');

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



// EVENT LISTENERS
window.addEventListener('load', fetchData()
//refactor to take in traveler id to pass into renderDom
.then(({travelers, destinations, trips}) => {
    travelersData =travelers;
    tripsData = trips;
    destinationsData = destinations;
    renderDom()
})
.catch(error => {
    console.log(error)
    return error
}));
searchButton.addEventListener('click', handleSearch);
searchCloseButton.addEventListener('click', backToHome);
searchResultsSection.addEventListener('click', function(e) {
    console.log('event log', e.target.value)
})

// GLOBAL VARIABLES
let travelersData;
let tripsData;
let destinationsData;
// let userID;
let currentTraveler;



function renderDom() {
    //add paramater to accept traveler id to pass to setTraveler
    // console.log('trips data', tripsData)
    currentTraveler = setTraveler(3, travelersData);
    console.log('currentTraveler', currentTraveler)
    let trips = filterTrips(currentTraveler, tripsData);
    console.log('trips', trips);
    let organizedTrips = organizeTrips(trips);
    console.log('organizedTrips', organizedTrips);
    let tripDisplayDetails = getTripDisplayInfo(organizedTrips, destinationsData);
    console.log('Trip Display Info', tripDisplayDetails)
    let currentYear = findCurrentYear(trips);
    let stats = calculateStats(organizedTrips, tripsData, destinationsData, currentYear);
    console.log('stats', stats)
    displayTrips(tripDisplayDetails);
    displayStats(stats);
}

function displayTrips({past, pending}) {
    if (typeof past === 'object') {
        pastPlaceholder.classList.add('hidden');
        // pastTrips.innerHTML = ''
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
        // pendingTrips.innerHTML = ''
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
    
    //add trip display card elements to search results section
    //should include destination  name, airfare and lodging costs per day
    //make selector for results container
    //iterate through destinationsarray += inner HTML of results container dest cost, lodging, name, etc
    //see result card html placeholer template
}

function planTrip(inputObj, destinationObj, traveler) {
    //create new trip and store in variable
    //post new trip (this function will generate/reassign it's id OR refactor createNewTrip to create it)
    //calculateTripCost(newtrip.id) and store in variable
    //display confirmation window
    //display total trip cost, and confirm posting(then re-fetch, renderDom, and return to home)
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
    // searchResultsSection.classList.add('hidden');
};



