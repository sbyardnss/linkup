const getToken = () => {
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    return linkUpUserObj
}
const apiKey = process.env.REACT_APP_API;

//get fetches
export const getAllUsers = () => { //check
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/golfers`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
}

export const getAllCourses = () => { //check
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/courses`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`
        }
    })
        .then(res => res.json())
}
export const getAllMatches = () => {
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/matches`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`
        }
    })
        .then(res => res.json())
}
export const retrieveMatch = (matchId) => {
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/matches/${matchId}`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
}
//NEW BELOW
export const getMyMatches = () => {
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/matches/joined`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
}
export const getOpenMatches = () => {
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/matches/joined`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
}

export const addFriend = (userId) => {
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/golfers/${userId}/add_friend`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
}
export const removeFriend = (userId) => {
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/golfers/${userId}/remove_friend`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
}
export const joinTeeTime = (matchId) => {
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/matches/${matchId}/join_tee_time`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
}
export const leaveTeeTime = (matchId) => {
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/matches/${matchId}/leave_tee_time`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
}
export const addHoleScore = (holeScoreObj) => {
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/scores`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(holeScoreObj)
    })
}
export const updateHoleScore = (scoreObjReplacement, holeScoreId) => {
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/scores/${holeScoreId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(scoreObjReplacement)
    })
}
export const sendNewMessage = (newMsgObj) => {
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/messages`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMsgObj)
    })
}
export const setMsgsToRead = (msgObjReplacement, msgId) => {
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/messages/${msgId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(msgObjReplacement)
    })
}
export const sendNewCourse = (newCourseObj) => { //check
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/courses`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCourseObj)
    })
}
export const deleteCourse = (courseId) => {
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/courses/${courseId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
        }
    })
}
export const updateUser = (userObjReplacement, userId) => {
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/golfers/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${linkUpUserObj.token}`,
        },
        body: JSON.stringify(userObjReplacement)
    })
}
export const getAllMessages = () => {
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/messages`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`
        }
    })
        .then(res => res.json())

}
export const getUnreadMessages = () => {
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/messages/unread`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`
        }
    })
        .then(res => res.json())
}
//get all userMatches with scorecards for paticularMatch 
//NEW VERSION
export const getHoleScoresForMatch = (matchId) => {
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/scores?match=${matchId}`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}

//external API fetches
export const getWeatherInfo = () => {
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=36.17&longitude=-86.78&hourly=temperature_2m,precipitation_probability,windspeed_10m&models=best_match&daily=precipitation_hours,precipitation_probability_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&forecast_days=14&timezone=America%2FChicago`)
        .then(res => res.json())
}


//post fetches

export const sendTeeTime = (teeTimeObj) => {
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/matches`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(teeTimeObj)
    })
        .then(res => res.json())
        .then(
            () => {
                getMyMatches(linkUpUserObj.userId)
            }
        )
}
//delete fetch

export const deleteTeeTime = (teeTimeId) => {
    const linkUpUserObj = getToken()
    return fetch(`${apiKey}/matches/${teeTimeId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`
        }
    })
}

// export const deleteUserMatch = (userMatchId) => {
//     return fetch(`${apiKey}/userMatches/${userMatchId}`, {
//         method: "DELETE"
//     })
// }

// // export const deleteCourse = (courseId) => {
// //     return fetch(`${apiKey}/courses/${courseId}`, {
// //         method: "DELETE"
// //     })
// // }

// export const deleteFriend = (friendRelationshipId) => {
//     return fetch(`${apiKey}/userFriends/${friendRelationshipId}`, {
//         method: "DELETE"
//     })
// }


//put fetches

export const changeFriendStatus = (userFriendReplacement, userFriendId) => {
    return fetch(`${apiKey}/userFriends/${userFriendId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userFriendReplacement)
    })
        .then(res => res.json())

}



// new python authorization fetches

export const loginUser = (user) => {
    return fetch(`${apiKey}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const registerUser = (user) => {
    return fetch(`${apiKey}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}
