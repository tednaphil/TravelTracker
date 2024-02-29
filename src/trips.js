function filterTrips(id, tripsArray) {
    const trips = tripsArray.filter(trip => trip.userID === id)
    return trips
}

export {
    filterTrips
}