function filterTrips(id, tripsArray) {
    const trips = tripsArray.filter(trip => trip.userID === id)
    return trips
}

function organizeTrips(userTrips) {
    
}

export {
    filterTrips,
    organizeTrips
}