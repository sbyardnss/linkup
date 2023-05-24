const getToken = () => {
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    return linkUpUserObj
}
//get fetches
export const getAllUsers = () => { //check
    // if (linkUpUserObj?.token) {
    const linkUpUserObj = getToken()
    return fetch(`http://localhost:8000/golfers`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())

    // }
}

export const getAllCourses = () => { //check
    // if (linkUpUserObj?.token){
    const linkUpUserObj = getToken()
    return fetch(`http://localhost:8000/courses`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`
        }
    })
        .then(res => res.json())

    // }
}
export const getAllMatches = () => {
    const linkUpUserObj = getToken()
    return fetch(`http://localhost:8000/matches`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`
        }
    })
        .then(res => res.json())
}
export const retrieveMatch = (matchId) => {
    const linkUpUserObj = getToken()
    return fetch(`http://localhost:8000/matches/${matchId}`, {
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
    return fetch(`http://localhost:8000/matches/joined`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
}
export const getOpenMatches = () => {
    const linkUpUserObj = getToken()
    return fetch(`http://localhost:8000/matches/joined`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
}

export const addFriend = (userId) => {
    const linkUpUserObj = getToken()
    return fetch(`http://localhost:8000/golfers/${userId}/add_friend`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
}
export const removeFriend = (userId) => {
    const linkUpUserObj = getToken()
    return fetch(`http://localhost:8000/golfers/${userId}/remove_friend`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
}
export const joinTeeTime = (matchId) => {
    const linkUpUserObj = getToken()
    return fetch(`http://localhost:8000/matches/${matchId}/join_tee_time`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
}
export const leaveTeeTime = (matchId) => {
    const linkUpUserObj = getToken()
    return fetch(`http://localhost:8000/matches/${matchId}/leave_tee_time`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
}
export const addHoleScore = (holeScoreObj) => {
    const linkUpUserObj = getToken()
    return fetch(`http://localhost:8000/scores`, {
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
    return fetch(`http://localhost:8000/scores/${holeScoreId}`, {
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
    return fetch(`http://localhost:8000/messages`, {
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
    return fetch(`http://localhost:8000/messages/${msgId}`, {
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
    return fetch(`http://localhost:8000/courses`, {
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
    return fetch(`http://localhost:8000/courses/${courseId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
        }
    })
}
export const updateUser = (userObjReplacement, userId) => {
    const linkUpUserObj = getToken()
    return fetch(`http://localhost:8000/golfers/${userId}`, {
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
    return fetch(`http://localhost:8000/messages`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`
        }
    })
        .then(res => res.json())

}
export const getUnreadMessages = () => {
    const linkUpUserObj = getToken()
    return fetch(`http://localhost:8000/messages/unread`, {
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
    return fetch(`http://localhost:8000/scores?match=${matchId}`, {
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
    return fetch(`http://localhost:8000/matches`, {
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
    return fetch(`http://localhost:8000/matches/${teeTimeId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`
        }
    })
}

// export const deleteUserMatch = (userMatchId) => {
//     return fetch(`http://localhost:8000/userMatches/${userMatchId}`, {
//         method: "DELETE"
//     })
// }

// // export const deleteCourse = (courseId) => {
// //     return fetch(`http://localhost:8000/courses/${courseId}`, {
// //         method: "DELETE"
// //     })
// // }

// export const deleteFriend = (friendRelationshipId) => {
//     return fetch(`http://localhost:8000/userFriends/${friendRelationshipId}`, {
//         method: "DELETE"
//     })
// }


//put fetches

export const changeFriendStatus = (userFriendReplacement, userFriendId) => {
    return fetch(`http://localhost:8000/userFriends/${userFriendId}`, {
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
    return fetch("http://localhost:8000/login", {
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
    return fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}
