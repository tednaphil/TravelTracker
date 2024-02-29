function setTraveler(id, travelerArray) {
    if (id >= travelerArray.length || id === 0) {
        return false
    } else {
        const currentTraveler = travelerArray.find(traveler => id === traveler.id);
    return currentTraveler;
    }
}

function checkLogin() {

}

export {
    setTraveler,
    checkLogin
}