function setTraveler(id, travelerArray) {
    const currentTraveler = travelerArray.find(traveler => id === traveler.id);
    return currentTraveler;
}

export {
    setTraveler
}