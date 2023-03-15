import { useState, useEffect, createContext } from "react";
import { getActiveUserMatchesWithMatchInfo, getAllCourses, getAllMatches, getAllUsers, getAllUserFriendsForActiveUser } from "../ApiManager"
export const TeeTimeContext = createContext()

export const TeeTimeProvider = (props) => {
    const [users, setUsers] = useState([])
    const [courses, setCourses] = useState([])
    const [matches, setMatches] = useState([])
    const [userMatchesWithMatchInfo, setUserMatchesWithMatchInfo] = useState([])
    const [activeUserFriends, setActiveUserFriends] = useState([])
    const [deleteItem, deleteInitiated] = useState(false)
    const [joinMatch, joinInitiated] = useState([false])
    const [matchCreated, setMatchCreated] = useState(false)
    const [friendChange, setFriendChange] = useState(false)
    useEffect(
        () => {
            getAllUsers()
                .then(
                    (userData) => {
                        setUsers(userData)
                    }
                )

        },
        []
    )
    useEffect(
        () => {
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
            getAllUserFriendsForActiveUser()
            .then(
                (data) => {
                    setActiveUserFriends(data)
                }
            )
        },
        [friendChange]
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
        [deleteItem, joinMatch, matchCreated, friendChange]
    )
    




    

    return (
        <TeeTimeContext.Provider value={{
            deleteItem, deleteInitiated, joinMatch, joinInitiated, users, courses, matches, userMatchesWithMatchInfo, matchCreated, setMatchCreated, friendChange, setFriendChange, activeUserFriends, setActiveUserFriends
        }}>
            {props.children}
        </TeeTimeContext.Provider>
    )


}