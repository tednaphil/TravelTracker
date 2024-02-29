import { setTraveler, checkLogin } from "./traveler";
import { filterTrips, organizeTrips, calculateTripCost, calculateStats, getTripDisplayInfo, createTrip } from "./trips";
import { findDestination, getDestDisplayInfo, filterDestinations } from "./destinations";
import { fetchData, postData } from "./apiCalls";


// console.log(fetchData())

// let travelersData;
let tripsData;
let destinationsData;
// let userID;
let currentTraveler;

window.addEventListener('load', renderDom)

function renderDom() {
    fetchData()
        .then(({travelers, destinations, trips}) => {
            currentTraveler = setTraveler(1, travelers);
            // console.log(currentTraveler)
            trips = tripsData
            destinationsData = destinations
        })
        .catch(error => {
            console.log(error)
            return error
        })
}

console.log(currentTraveler)
console.log(tripsData)

