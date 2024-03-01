import { setTraveler, checkLogin } from "./traveler";
import { filterTrips, organizeTrips, calculateTripCost, calculateStats, getTripDisplayInfo, createTrip } from "./trips";
import { findDestination, getDestDisplayInfo, filterDestinations } from "./destinations";
import { fetchData, postData } from "./apiCalls";

// QUERY SELECTORS

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
}))

// GLOBAL VARIABLES
let travelersData;
let tripsData;
let destinationsData;
// let userID;
let currentTraveler;



function renderDom() {
    //add paramater to accept traveler id to pass to setTraveler
    currentTraveler = setTraveler(1, travelersData);
    console.log('currentTraveler', currentTraveler)
    let trips = filterTrips(currentTraveler, tripsData);
    console.log('trips', trips);
    let organizedTrips = organizeTrips(trips);
    console.log('organizedTrips', organizedTrips);
    let tripDisplayDetails = getTripDisplayInfo(organizedTrips, destinationsData);
    console.log('Trip Display Info', tripDisplayDetails)
    let stats = calculateStats(organizedTrips, tripsData, destinationsData);
    console.log('stats', stats)
    displayTrips();
    displayStats();

}

function displayTrips() {

}

function displayStats() {

}



