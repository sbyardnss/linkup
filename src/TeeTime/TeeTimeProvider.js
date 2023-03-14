import { useState, useEffect, createContext } from "react";
import { getActiveUserMatchesWithMatchInfo, getActiveUserMatches, getAllCourseHoles, getAllCourses, getAllMatches, getAllMatchUserHoleScores, getAllUserMatches, getAllUsers, deleteTeeTime, deleteUserMatch, sendUserMatch, getWeatherInfo } from "../ApiManager"
export const TeeTimeContext = createContext()

export const TeeTimeProvider = (props) => {
    const [users, setUsers] = useState([])
    const [courses, setCourses] = useState([])
    const [matches, setMatches] = useState([])
    const [userMatchesWithMatchInfo, setUserMatchesWithMatchInfo] = useState([])

    const [deleteItem, deleteInitiated] = useState(false)
    const [joinMatch, joinInitiated] = useState([false])
    const [matchCreated, setMatchCreated] = useState(false)

    useEffect(
        () => {
            getAllUsers()
                .then(
                    (userData) => {
                        setUsers(userData)
                    }
                )
            getAllCourses()
                .then(
                    (courseData) => {
                        setCourses(courseData)
                    }
                )
        },
        []
    )
    useEffect(
        () => {
            getAllMatches()
                .then(
                    (data) => {
                        setMatches(data)
                    }
                )
        },
        [deleteItem, matchCreated]
    )


    useEffect(
        () => {
            getActiveUserMatchesWithMatchInfo()
                .then(
                    (data) => {
                        setUserMatchesWithMatchInfo(data)
                    }
                )
        },
        [deleteItem, joinMatch, matchCreated]
    )


    return (
        <TeeTimeContext.Provider value={{
            deleteItem, deleteInitiated, joinMatch, joinInitiated, users, courses, matches, userMatchesWithMatchInfo, matchCreated, setMatchCreated
        }}>
            {props.children}
        </TeeTimeContext.Provider>
    )
    
    
}