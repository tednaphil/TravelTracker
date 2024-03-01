import { setTraveler, checkLogin } from "./traveler";
import { filterTrips, organizeTrips, calculateTripCost, findCurrentYear, calculateStats, getTripDisplayInfo, createTrip } from "./trips";
import { findDestination, getDestDisplayInfo, filterDestinations } from "./destinations";
import { fetchData, postData } from "./apiCalls";

// QUERY SELECTORS
const main = document.querySelector('main');
const tripDetailsSection = document.querySelector('#trip-details-container');

const searchButton = document.querySelector('#trip-search-button');

const lodgingTotal = document.querySelector('#lodging-total');
const airfareTotal = document.querySelector('#airfare-total');
const agentFeesTotal = document.querySelector('#agent-fee-total');
const grandTotal = document.querySelector('#grand-total');
const pendingTrips = document.querySelector('#pending-trips');
const pastTrips = document.querySelector('#past-trips');
const pendingPlaceholder = document.querySelector('#no-pending');
const pastPlaceholder = document.querySelector('#no-past');

const searchResultsSection = document.querySelector('#search-results')
const searchCloseButton = document.querySelector('#close-button');



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
searchButton.addEventListener('click', displayResults);
searchCloseButton.addEventListener('click', backToLanding);

// GLOBAL VARIABLES
let travelersData;
let tripsData;
let destinationsData;
// let userID;
let currentTraveler;



function renderDom() {
    //add paramater to accept traveler id to pass to setTraveler
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

function displayResults(e) {
    e.preventDefault();
    main.classList.add('hidden');
    tripDetailsSection.classList.add('hidden');
    searchResultsSection.classList.remove('hidden');
};

function backToLanding() {
    main.classList.remove('hidden');
    tripDetailsSection.classList.remove('hidden');


};



