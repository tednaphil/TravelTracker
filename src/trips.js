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
    const foundTrip = tripsArray.find(trip => trip.id === tripID);
    // console.log('trip', foundTrip)
    const tripDest = destinationsArray.find(dest => foundTrip.destinationID === dest.id);
    // console.log('destination', tripDest)
    const totalLodging = tripDest.estimatedLodgingCostPerDay * foundTrip.duration;
    const totalAirfare = tripDest.estimatedFlightCostPerPerson * foundTrip.travelers;
    const subtotal = totalLodging + totalAirfare;
    const agentFee = subtotal * .1;
    const grandTotal = subtotal + agentFee
    const tripCost = {
        totalLodging,
        totalAirfare,
        subtotal,
        agentFee,
        grandTotal
    }
    return tripCost
}

// function createTrip() {

// }

export {
    filterTrips,
    organizeTrips,
    calculateTripCost,
    // createTrip
}