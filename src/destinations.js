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
  const dateArray = tripsArray.find(trip => trip.destinationID === destination.id).date.split('/');
  const date = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
  const displayInfo = {
    name: destination.destination,
    image: destination.image,
    alt: destination.alt,
    date,
  };
  return displayInfo;
}

export { findDestination, getDestDisplayInfo };
