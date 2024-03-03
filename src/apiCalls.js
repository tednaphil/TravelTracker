const allData = [
    fetch('http://localhost:3001/api/v1/travelers/'),
    fetch('http://localhost:3001/api/v1/trips'),
    fetch('http://localhost:3001/api/v1/destinations')
];

function fetchData() {
    return Promise.all(allData)
    .then(responses => {
        if (responses.every(response => response.ok)) {
            return responses
        } else {
            let responseText = responses.find(response => !response.ok).statusText
            let responseCode = responses.find(response => !response.ok).status
            console.log('API GET error')
            throw new Error(`${responseCode} : ${responseText}`)
        }
    })
    .then(res => {
        return Promise.all(res.map(obj => obj.json()))
    })
    .then(arr => {
        let dataObject = arr.reduce((obj, set) => {
            let key = Object.keys(set)[0]
            obj[key] = set[key]
            return obj
        }, {})
        return dataObject
    })
    .catch(error => {
        console.log('API GET error caught')
        throw new Error(`${error.message}. Please reload page!`)
    })
};

function postData(tripObj) {
    tripObj.id = Date.now();
    return fetch('http://localhost:3001/api/v1/trips', {
        method: 'POST',
        body: JSON.stringify(tripObj),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            return response
        } else {
            let responseText = response.statusText
            let responseCode = response.status
            console.log('API POST error')
            throw new Error(`${responseCode} : ${responseText}`)
        }
    })
    .then(res => res.json())
    .catch(error => {
        throw new Error(`${error.message}. Please try again!`)
    })
};

function fetchTrips() {
    return fetch('http://localhost:3001/api/v1/trips')
    .then(response => {
        if (response.ok) {
            return response
        } else {
            let responseText = response.statusText
            let responseCode = response.status
            console.log('API GET Trips error')
            throw new Error(`${responseCode} : ${responseText}.`)
        }
    })
    .then(res => res.json())
    .catch(error => {
        throw new Error(error.message)
    })
}

export {
    fetchData,
    postData,
    fetchTrips
}