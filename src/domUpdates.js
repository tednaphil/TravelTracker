import { setTraveler, checkLogin } from "./traveler";
import { filterTrips, organizeTrips, calculateTripCost, calculateStats, getTripDisplayInfo, createTrip } from "./trips";
import { findDestination, getDestDisplayInfo, filterDestinations } from "./destinations";
import { fetchData, postData } from "./apiCalls";


// console.log(fetchData())

let travelersData;
let tripsData;
let destinationsData;
// let userID;
let currentTraveler;

window.addEventListener('load', fetchData()
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



function renderDom() {
    currentTraveler = setTraveler(1, travelersData);
    console.log('currentTraveler', currentTraveler)
    let trips = filterTrips(currentTraveler, tripsData);
    console.log('trips', trips);
    let organizedTrips = organizeTrips(trips);
    console.log('organizedTrips', organizedTrips);
    let tripDisplayDetails = getTripDisplayInfo(organizedTrips, destinationsData);
    console.log('Trip Display Info', tripDisplayDetails)
    //get totals next

}



