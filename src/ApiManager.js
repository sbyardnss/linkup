const localLinkUpUser = localStorage.getItem("linkUp_user")
const linkUpUserObj = JSON.parse(localLinkUpUser)
//get fetches
export const getAllUsers = () => {
    return fetch(`http://localhost:8088/users`)
        .then(res => res.json())
}

export const getAllCourses = () => {
    return fetch(`http://localhost:8088/courses`)
        .then(res => res.json())
}

// export const getAllCourseHoles = () => {
//     return fetch(`http://localhost:8088/courseHoles`)
//         .then(res => res.json())
// }

// export async function getAllMatches() {
//     const response = await fetch(`http://localhost:8088/matches`)
//     return response
//         .then(res => res.json())
// }
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

export const getAllUserFriendsForActiveUser = () => {
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    return fetch(`http://localhost:8088/userFriends?&userId=${linkUpUserObj.id}`)
        .then(res => res.json())
}
// export const getAllScoreCards = () => {
//     return fetch(`http://localhost:8088/scorecards`)
//         .then(res => res.json())
// }

//get all userMatches with scorecards for paticularMatch 
export const getUserMatchesForThisMatch = (matchId) => {
    return fetch(`http://localhost:8088/userMatches?&matchId=${matchId}`)
        .then(res => res.json())
}
//external API fetches


//old weather data fetch
// export const getWeatherInfo = () => {
//     return fetch(`https://api.open-meteo.com/v1/forecast?latitude=36.17&longitude=-86.78&hourly=precipitation_probability&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&forecast_days=14&timezone=America%2FChicago`)
//         .then(res => res.json())
// }


export const getWeatherInfo = () => {
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=36.17&longitude=-86.78&hourly=temperature_2m,precipitation_probability,windspeed_10m&models=best_match&daily=precipitation_hours,precipitation_probability_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&forecast_days=14&timezone=America%2FChicago`)
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

export const addFriend = (newFriendObj) => {
    return fetch(`http://localhost:8088/userFriends`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newFriendObj)
    })
        .then(res => res.json())
}

export const addUserHoleScore = (newHoleScoreObj) => {
    return fetch(`http://localhost:8088/matchUserHoleScores`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newHoleScoreObj)
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

export const deleteCourse = (courseId) => {
    return fetch(`http://localhost:8088/courses/${courseId}`, {
        method: "DELETE"
    })
}

export const deleteFriend = (friendRelationshipId) => {
    return fetch(`http://localhost:8088/userFriends/${friendRelationshipId}`, {
        method: "DELETE"
    })
}


//put fetches

export const changeFriendStatus = (userFriendReplacement, userFriendId) => {
    return fetch(`http://localhost:8088/userFriends/${userFriendId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userFriendReplacement)
    })
        .then(res => res.json())

}

export const setMatchToConfirmed = (matchReplacement, matchId) => {
    return fetch(`http://localhost:8088/matches/${matchId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(matchReplacement)
    })
        .then(res => res.json())

}

export const updateHoleScore = (scoreObjReplacement, holeScoreId) => {
    return fetch(`http://localhost:8088/matchUserHoleScores/${holeScoreId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(scoreObjReplacement)
    })
        .then(res => res.json())

}

export const updateUser = (userObjReplacement, userId) => {
    return fetch(`http://localhost:8088/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObjReplacement)
    })
        .then(res => res.json())

}