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

export const getAllUserMatches = () => {
    return fetch(`http://localhost:8000/userMatches`)
        .then(res => res.json())
}

export const getAllMatchUserHoleScores = () => {
    return fetch(`http://localhost:8000/matchUserHoleScores`)
        .then(res => res.json())
}
//NEW BELOW
export const getMyMatches = (userId) => {
    const linkUpUserObj = getToken()
    return fetch(`http://localhost:8000/matches?my_matches=${userId}`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
}
// export const getMyFriends = (userId) => {
//     const linkUpUserObj = getToken()
//     return fetch(`http://localhost:8000/golfers?friends=${userId}`, {
//         headers: {
//             "Authorization": `Token ${linkUpUserObj.token}`,
//             "Content-Type": "application/json"
//         }
//     })
//         .then(res => res.json())
// }
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


//OLD BELOW DELETE AT END
// export const getAllUserFriends = () => {
//     return fetch(`http://localhost:8000/friendships`, {
//         headers: {
//             "Authorization": `Token ${localStorage.getItem("linkUp_user")}`
//         }
//     })
//         .then(res => res.json())
// }

// export const getAllUserFriendsForActiveUser = () => {
//     const localLinkUpUser = localStorage.getItem("linkUp_user")
//     const linkUpUserObj = localLinkUpUser
//     return fetch(`http://localhost:8000/userFriends?&userId=${linkUpUserObj.id}`)
//         .then(res => res.json())
// }
export const getAllMessages = () => {
        const linkUpUserObj = getToken()
        return fetch(`http://localhost:8000/messages`, {
            headers: {
                "Authorization": `Token ${linkUpUserObj.token}`
            }
        })
            .then(res => res.json())
    
}

//get all userMatches with scorecards for paticularMatch 
export const getUserMatchesForThisMatch = (matchId) => {
    const linkUpUserObj = getToken()
    return fetch(`http://localhost:8000/golfer_matches?match_id=${matchId}`, {
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`
        }
    })
        .then(res => res.json())
}
//external API fetches
export const getWeatherInfo = () => {
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=36.17&longitude=-86.78&hourly=temperature_2m,precipitation_probability,windspeed_10m&models=best_match&daily=precipitation_hours,precipitation_probability_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&forecast_days=14&timezone=America%2FChicago`)
        .then(res => res.json())
}

//expanded fetches
export const getActiveUserMatches = () => {
    return fetch(`http://localhost:8000/userMatches?_expand=user&isInitiator=true`)
        .then(res => res.json())
}

// export const getActiveUserMatchesWithMatchInfo = () => {
//     return fetch(`http://localhost:8000/userMatches?_expand=match`)
//         .then(res => res.json())
// }




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

export const sendUserMatch = (userMatchObj) => {
    const linkUpUserObj = getToken()
    return fetch(`http://localhost:8000/userMatches`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${linkUpUserObj.token}`,
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

export const sendNewCourse = (newCourseObj) => { //check
    return fetch(`http://localhost:8000/courses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCourseObj)
    })
        .then(res => res.json())
}
// OLD ADDFRIEND FUNCTION
// export const addFriend = (newFriendObj) => {
//     return fetch(`http://localhost:8000/userFriends`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newFriendObj)
//     })
//         .then(res => res.json())
// }

export const addUserHoleScore = (newHoleScoreObj) => {
    return fetch(`http://localhost:8000/matchUserHoleScores`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newHoleScoreObj)
    })
        .then(res => res.json())
}
export const sendNewMessage = (newMsgObj) => {
    return fetch(`http://localhost:8000/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMsgObj)
    })
        .then(res => res.json())
}

//delete fetch

export const deleteTeeTime = (teeTimeId) => {
    return fetch(`http://localhost:8000/matches/${teeTimeId}`, {
        method: "DELETE"
    })
}

export const deleteUserMatch = (userMatchId) => {
    return fetch(`http://localhost:8000/userMatches/${userMatchId}`, {
        method: "DELETE"
    })
}

export const deleteCourse = (courseId) => {
    return fetch(`http://localhost:8000/courses/${courseId}`, {
        method: "DELETE"
    })
}

export const deleteFriend = (friendRelationshipId) => {
    return fetch(`http://localhost:8000/userFriends/${friendRelationshipId}`, {
        method: "DELETE"
    })
}


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

export const setMatchToConfirmed = (matchReplacement, matchId) => {
    return fetch(`http://localhost:8000/matches/${matchId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(matchReplacement)
    })
        .then(res => res.json())

}

export const updateHoleScore = (scoreObjReplacement, holeScoreId) => {
    return fetch(`http://localhost:8000/matchUserHoleScores/${holeScoreId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(scoreObjReplacement)
    })
        .then(res => res.json())

}

export const updateUser = (userObjReplacement, userId) => {
    return fetch(`http://localhost:8000/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObjReplacement)
    })
        .then(res => res.json())

}

export const setMsgsToRead = (msgObjReplacement, msgId) => {
    return fetch(`http://localhost:8000/messages/${msgId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(msgObjReplacement)
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
