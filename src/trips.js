import { findDestination, getDestDisplayInfo } from "./destinations";

function filterTrips({id}, tripsArray) {
    const trips = tripsArray.filter(trip => trip.userID === id)
    return trips
}

function organizeTrips(userTrips) {
    const tripsObject = userTrips.reduce((obj, trip) => {
        if (trip.status === "approved") {
            obj.approved.push(trip)
        } else {
            obj.pending.push(trip)
        }
        return obj
    }, {
        approved: [],
        pending: []
    })
    return tripsObject
}

function calculateTripCost(tripID, tripsArray, destinationsArray) {
    const tripIDs = tripsArray.map(trip => trip.id);
    if (!tripIDs.includes(tripID)) {
        return false
    } else {
        const foundTrip = tripsArray.find(trip => trip.id === tripID);
        const tripDest = destinationsArray.find(dest => foundTrip.destinationID === dest.id);
        const totalLodging = tripDest.estimatedLodgingCostPerDay * foundTrip.duration;
        const totalAirfare = tripDest.estimatedFlightCostPerPerson * foundTrip.travelers;
        const subtotal = totalLodging + totalAirfare;
        const agentFee = subtotal * .1;
        const grandTotal = Math.round(subtotal + agentFee)
        const tripCost = {
            totalLodging,
            totalAirfare,
            subtotal,
            agentFee,
            grandTotal
        }
        return tripCost
    }
}

function calculateStats({approved}, tripsArray, destinationsArray) {
    const tripCosts = approved.map(trip => calculateTripCost(trip.id, tripsArray, destinationsArray));
    const travStats = tripCosts.reduce((obj, trip) => {
        obj.lodging += trip.totalLodging;
        obj.airfare += trip.totalAirfare;
        obj.subtotal += trip.subtotal;
        obj.agentFee += trip.agentFee;
        obj.grandTotal += trip.grandTotal;
        obj.tripsTaken ++;

        return obj
    }, {
        lodging: 0,
        airfare: 0,
        subtotal: 0,
        agentFee: 0,
        grandTotal: 0,
        tripsTaken: 0
    })
    return travStats

}

function getTripDisplayInfo({approved, pending}, destinationsArray) {
    // argument is the destructured organizedTrips return object)
    const pastDestinations = approved.map(trip => findDestination(trip.id, destinationsArray));
    const pendingDestinations = pending.map(trip => findDestination(trip.id, destinationsArray));
    const allDisplayInfo = {
        past: pastDestinations.length ? pastDestinations.map(dest => getDestDisplayInfo(dest)) : 'No Trips 🌍',
        pending: pendingDestinations.length ? pendingDestinations.map(dest => getDestDisplayInfo(dest)) : 'No Trips 🌍'
    }
    return allDisplayInfo
}

// function createTrip() {

// }

export {
    filterTrips,
    organizeTrips,
    calculateTripCost,
    calculateStats,
    getTripDisplayInfo,
    // createTrip
}