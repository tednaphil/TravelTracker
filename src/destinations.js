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

function getDestDisplayInfo(destination) {
  const displayInfo = {
    name: destination.destination,
    image: destination.image,
    alt: destination.alt,
  };
  return displayInfo;
}

export { findDestination, getDestDisplayInfo };
