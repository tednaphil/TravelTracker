function findDestination(locationID, destinationsArray) {
  const destinationIDs = destinationsArray.map((dest) => dest.id);
  if (!destinationIDs.includes(locationID)) {
    return false;
  } else {
    const destination = destinationsArray.find(
      (dest) => dest.id === locationID
    );
    return destination;
  }
}

function getDestDisplayInfo(destination, tripsArray) {
  const displayInfo = {
    name: destination.destination,
    image: destination.image,
    alt: destination.alt,
    date: tripsArray.find(trip => trip.destinationID === destination.id).date
  };
  return displayInfo;
}

export { findDestination, getDestDisplayInfo };
