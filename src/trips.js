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
        const year = foundTrip.date.split('/')[0];
        const tripDest = destinationsArray.find(dest => foundTrip.destinationID === dest.id);
        const totalLodging = tripDest.estimatedLodgingCostPerDay * foundTrip.duration;
        const totalAirfare = tripDest.estimatedFlightCostPerPerson * foundTrip.travelers;
        const subtotal = totalLodging + totalAirfare;
        const agentFee = Math.round(subtotal * .1);
        const grandTotal = Math.round(subtotal + agentFee)
        const tripCost = {
            year,
            totalLodging,
            totalAirfare,
            subtotal,
            agentFee,
            grandTotal
        }
        return tripCost
    }
}

function findCurrentYear({approved}) {
    const dates = approved.map(trip => trip.date)
    const years = [];
    dates.forEach(date => {
        years.push((date.split('/')[0]))
    })
    const sortedYears = years.sort((a, b) => b - a)
    return sortedYears[0]

}

function calculateStats({approved}, tripsArray, destinationsArray, year) {
    const tripCosts = approved.map(trip => calculateTripCost(trip.id, tripsArray, destinationsArray));
    const travStats = tripCosts.reduce((obj, trip) => {
        if (trip.year === year) {
            obj.lodging += trip.totalLodging;
            obj.airfare += trip.totalAirfare;
            obj.subtotal += trip.subtotal;
            obj.agentFee += trip.agentFee;
            obj.grandTotal += trip.grandTotal;
            obj.tripsTaken ++;
            obj.year = year;
        }
        return obj
    }, {
        lodging: 0,
        airfare: 0,
        subtotal: 0,
        agentFee: 0,
        grandTotal: 0,
        tripsTaken: 0,
        year: ''
    })
    return travStats

}

function getTripDisplayInfo({approved, pending}, destinationsArray) {
    const pastDestinations = approved.map(trip => findDestination(trip.destinationID, destinationsArray));
    const pendingDestinations = pending.map(trip => findDestination(trip.destinationID, destinationsArray));
    const allDisplayInfo = {
        past: pastDestinations.length ? pastDestinations.map(dest => getDestDisplayInfo(dest)) : 'No Trips 🌍',
        pending: pendingDestinations.length ? pendingDestinations.map(dest => getDestDisplayInfo(dest)) : 'No Pending Trips 🌍'
    }
    return allDisplayInfo
}

function createTrip({date, duration, travelers}, {id}, traveler) {
    const formattedDate = date.split('-').join('/');
    const newTrip = {
        date: formattedDate,
        destinationID: id,
        duration: Number(duration),
        id: null,
        status: 'pending',
        suggestedActivities: [],
        travelers: Number(travelers),
        userID: traveler.id
    }
    return newTrip
}

function calculateEstimate(newTripObj, destinationsArray) {
    const tripDest = destinationsArray.find(dest => newTripObj.destinationID === dest.id);
    const totalLodging = tripDest.estimatedLodgingCostPerDay * newTripObj.duration;
    const totalAirfare = tripDest.estimatedFlightCostPerPerson * newTripObj.travelers;
    const subtotal = totalLodging + totalAirfare;
    const agentFee = Math.round(subtotal * .1);
    const grandTotal = Math.round(subtotal + agentFee)
    const tripEstimate = {
        totalLodging,
        totalAirfare,
        subtotal,
        agentFee,
        grandTotal
    }
    return tripEstimate
}

export {
    filterTrips,
    organizeTrips,
    calculateTripCost,
    findCurrentYear,
    calculateStats,
    getTripDisplayInfo,
    createTrip,
    calculateEstimate,
}