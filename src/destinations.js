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


// function getDestinationCosts(locationID, destinationsArray) {
        //MIGHT BE UNNECCESARY
// }

// function getDestinationDisplayInfo(destination) {
    // return an object with image src, alt tag, and destination name
// }

// function filterDestinations() {
    // return array of destinations that meet search criteria submitted by user
// }

export {
    findDestination,
    // getDestinationCosts,
    // addDestinationDisplayInfo,
    // filterDestinations
}