function findDestination(locationID, destinationsArray) {
    const destinationIDs = destinationsArray.map(dest => dest.id);
    if (!destinationIDs.includes(locationID)) {
        return false
    } else {
        const destination = destinationsArray.find(dest => dest.id === locationID)
        return destination
    }
}
//refactor to destructure locationID parameter to {destinationID} and pass trip object instead?


// function getDestCostDisplay(locationID, destinationsArray) {
//         // calculate cost estimate of a tentative trip
// }

function getDestDisplayInfo(destination) {
    const displayInfo = {
        name: destination.destination,
        image: destination.image,
        alt: destination.alt,
        // lodging: destination.estimatedLodgingCostPerDay,
        // airfare: destination.estimatedFlightCostPerPerson,
    }
    return displayInfo
}

// function filterDestinations(inputObj) {
//     // return array of destination objects that meet search criteria submitted by user
// }

export {
    findDestination,
    // getDestCostDisplay,
    getDestDisplayInfo,
}