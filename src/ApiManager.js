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




//expanded fetches

export const getActiveUserMatches = () => {
    return fetch(`http://localhost:8088/userMatches?_expand=user&isInitiator=true`)
    .then(res => res.json())
}