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

function getDestDisplayInfo(destination) {
    const displayInfo = {
        name: destination.destination,
        image: destination.image,
        alt: destination.alt
    }
    return displayInfo
}

// function filterDestinations(inputObj) {
//     // return array of destination objects that meet search criteria submitted by user
// }

export {
    findDestination,
    // getDestinationCosts,
    getDestDisplayInfo,
    // filterDestinations
}