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

function getDestDisplayInfo(tripObj) {
  const dateArray = tripObj.date.split('/');
  const date = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
  const displayInfo = {
    name: tripObj.destination.destination,
    image: tripObj.destination.image,
    alt: tripObj.destination.alt,
    date,
  };
  return displayInfo;
}

export { findDestination, getDestDisplayInfo };
