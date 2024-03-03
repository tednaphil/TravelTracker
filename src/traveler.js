function setTraveler(id, travelerArray) {
    if (id > travelerArray.length || id === 0) {
        return false
    } else {
        const currentTraveler = travelerArray.find(traveler => id === traveler.id);
    return currentTraveler;
    }
}

function checkLogin({username, password}) {
    const id = Number(username.replace('traveler', ''))
    if (password === 'travel' && id > 0 && id < 51 && username.includes('traveler')) {
        return true
    } else {
        return false
    }

}

export {
    setTraveler,
    checkLogin
}