const getToken = () => {
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    return linkUpUserObj
}
//get fetches
export const getAllUsers = () => { //check
    const linkUpUserObj = getToken()
    return fetch(`https://linkup-server.herokuapp.com/golfers`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
}

export const getAllCourses = () => { //check
    const linkUpUserObj = getToken()
    return fetch(`https://linkup-server.herokuapp.com/courses`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`
        }
    })
        .then(res => res.json())
}
export const getAllMatches = () => {
    const linkUpUserObj = getToken()
    return fetch(`https://linkup-server.herokuapp.com/matches`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`
        }
    })
        .then(res => res.json())
}
export const retrieveMatch = (matchId) => {
    const linkUpUserObj = getToken()
    return fetch(`https://linkup-server.herokuapp.com/matches/${matchId}`, {
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
    return fetch(`https://linkup-server.herokuapp.com/matches/joined`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
}
export const getOpenMatches = () => {
    const linkUpUserObj = getToken()
    return fetch(`https://linkup-server.herokuapp.com/matches/joined`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
}

export const addFriend = (userId) => {
    const linkUpUserObj = getToken()
    return fetch(`https://linkup-server.herokuapp.com/golfers/${userId}/add_friend`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
}
export const removeFriend = (userId) => {
    const linkUpUserObj = getToken()
    return fetch(`https://linkup-server.herokuapp.com/golfers/${userId}/remove_friend`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
}
export const joinTeeTime = (matchId) => {
    const linkUpUserObj = getToken()
    return fetch(`https://linkup-server.herokuapp.com/matches/${matchId}/join_tee_time`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
}
export const leaveTeeTime = (matchId) => {
    const linkUpUserObj = getToken()
    return fetch(`https://linkup-server.herokuapp.com/matches/${matchId}/leave_tee_time`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
}
export const addHoleScore = (holeScoreObj) => {
    const linkUpUserObj = getToken()
    return fetch(`https://linkup-server.herokuapp.com/scores`, {
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
    return fetch(`https://linkup-server.herokuapp.com/scores/${holeScoreId}`, {
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
    return fetch(`https://linkup-server.herokuapp.com/messages`, {
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
    return fetch(`https://linkup-server.herokuapp.com/messages/${msgId}`, {
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
    return fetch(`https://linkup-server.herokuapp.com/courses`, {
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
    return fetch(`https://linkup-server.herokuapp.com/courses/${courseId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
        }
    })
}
export const updateUser = (userObjReplacement, userId) => {
    const linkUpUserObj = getToken()
    return fetch(`https://linkup-server.herokuapp.com/golfers/${userId}`, {
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
    return fetch(`https://linkup-server.herokuapp.com/messages`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`
        }
    })
        .then(res => res.json())

}
export const getUnreadMessages = () => {
    const linkUpUserObj = getToken()
    return fetch(`https://linkup-server.herokuapp.com/messages/unread`, {
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
    return fetch(`https://linkup-server.herokuapp.com/scores?match=${matchId}`, {
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
    return fetch(`https://linkup-server.herokuapp.com/matches`, {
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
    return fetch(`https://linkup-server.herokuapp.com/matches/${teeTimeId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`
        }
    })
}

// export const deleteUserMatch = (userMatchId) => {
//     return fetch(`https://linkup-server.herokuapp.com/userMatches/${userMatchId}`, {
//         method: "DELETE"
//     })
// }

// // export const deleteCourse = (courseId) => {
// //     return fetch(`https://linkup-server.herokuapp.com/courses/${courseId}`, {
// //         method: "DELETE"
// //     })
// // }

// export const deleteFriend = (friendRelationshipId) => {
//     return fetch(`https://linkup-server.herokuapp.com/userFriends/${friendRelationshipId}`, {
//         method: "DELETE"
//     })
// }


//put fetches

export const changeFriendStatus = (userFriendReplacement, userFriendId) => {
    return fetch(`https://linkup-server.herokuapp.com/userFriends/${userFriendId}`, {
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
    return fetch("https://linkup-server.herokuapp.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Access-Control-Allow-Origin': 'https://linkup-server.herokuapp.com/'
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const registerUser = (user) => {
    return fetch("https://linkup-server.herokuapp.com/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Access-Control-Allow-Origin': 'https://linkup-server.herokuapp.com/'
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}
