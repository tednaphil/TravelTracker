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

function findCurrentYear(userTrips) {
    const dates = userTrips.map(trip => trip.date)
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
    // argument is the destructured organizedTrips return object)
    const pastDestinations = approved.map(trip => findDestination(trip.destinationID, destinationsArray));
    const pendingDestinations = pending.map(trip => findDestination(trip.destinationID, destinationsArray));
    const allDisplayInfo = {
        past: pastDestinations.length ? pastDestinations.map(dest => getDestDisplayInfo(dest)) : 'No Trips 🌍',
        pending: pendingDestinations.length ? pendingDestinations.map(dest => getDestDisplayInfo(dest)) : 'No Pending Trips 🌍'
    }
    return allDisplayInfo
}

function createTrip({date, duration, travelers}, {id}, tripsArray, traveler) {
    //take in input obj
    //should I destructure to just take the destination id property
    //return an object that includes all trip properties

    const formattedDate = date.split('-').join('/');
    // console.log(formattedDate)
    const newTrip = {
        date: formattedDate,
        destinationID: id,
        duration: Number(duration),
        id: (tripsArray.length + 1),
        status: 'pending',
        suggestedActivities: [],
        travelers: Number(travelers),
        userID: traveler.id
    }
    console.log(newTrip)
    return newTrip
}

function makeTentativeTrips(inputObj) {
    //return an array of trip objects based on search results
    //iterate through destinations
    // invoke createTrip on each object
    //sort trips from lowest cost to highest price
}

function confirmTrip() {
    //update id of trip for it to be POSTed
}

export {
    filterTrips,
    organizeTrips,
    calculateTripCost,
    findCurrentYear,
    calculateStats,
    getTripDisplayInfo,
    createTrip,
    makeTentativeTrips,
    confirmTrip
}