
//get fetches
export const getAllUsers = () => {
    return fetch(`http://localhost:8088/users`)
        .then(res => res.json())
}

export const getAllCourses = () => {
    return fetch(`http://localhost:8088/courses`)
        .then(res => res.json())
}

export const getAllCourseHoles = () => {
    return fetch(`http://localhost:8088/courseHoles`)
        .then(res => res.json())
}

export const getAllMatches = () => {
    return fetch(`http://localhost:8088/matches`)
        .then(res => res.json())
}

export const getAllUserMatches = () => {
    return fetch(`http://localhost:8088/userMatches`)
        .then(res => res.json())
}

export const getAllMatchUserHoleScores = () => {
    return fetch(`http://localhost:8088/matchUserHoleScores`)
        .then(res => res.json())
}

export const getAllUserFriends = () => {
    return fetch(`http://localhost:8088/userFriends`)
        .then(res => res.json())
}

//external API fetches

export const getWeatherInfo = () => {
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=36.17&longitude=-86.78&hourly=precipitation_probability&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&forecast_days=14&timezone=America%2FChicago`)
    .then(res => res.json())
}


//expanded fetches

export const getActiveUserMatches = () => {
    return fetch(`http://localhost:8088/userMatches?_expand=user&isInitiator=true`)
    .then(res => res.json())
}

export const getActiveUserMatchesWithMatchInfo = () => {
    return fetch(`http://localhost:8088/userMatches?_expand=match`)
    .then(res => res.json())
}




//post fetches

export const sendTeeTime = (teeTimeObj) => {
    return fetch(`http://localhost:8088/matches`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(teeTimeObj)
    })
    .then(res => res.json())
    .then(
        () => {
            getAllMatches()
        }
    )
}

export const sendUserMatch = (userMatchObj) => {
    return fetch(`http://localhost:8088/userMatches`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userMatchObj)
    })
    .then(res => res.json())
    .then(
        () => {
            getAllUserMatches()
        }
    )
}

export const sendNewCourse = (newCourseObj) => {
    return fetch(`http://localhost:8088/courses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCourseObj)
    })
    .then(res => res.json())
}

//delete fetch

export const deleteTeeTime = (teeTimeId) => {
    return fetch(`http://localhost:8088/matches/${teeTimeId}`, {
        method: "DELETE"
    })
}

export const deleteUserMatch = (userMatchId) => {
    return fetch(`http://localhost:8088/userMatches/${userMatchId}`, {
        method: "DELETE"
    })
}