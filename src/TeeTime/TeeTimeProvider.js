import { useState, useEffect, createContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getActiveUserMatchesWithMatchInfo, getAllCourses, getAllMatches, getAllUsers, getAllUserFriendsForActiveUser, getAllMessages } from "../ApiManager"
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
    const [profileUpdated, setProfileUpdated] = useState(false)
    const [chatUser, setChatUser] = useState(0)
    const navigate = useNavigate()
    const [msgsRead, setMsgsRead] = useState(false)



    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)



    useEffect(
        () => {
            getAllUsers()
                .then(
                    (userData) => {
                        setUsers(userData)
                    }
                )

        },
        [profileUpdated]
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



    const onlyMyUserMatches = userMatchesWithMatchInfo.filter(uME => {
        return uME.userId === linkUpUserObj.id
    })
    //sort matches for my tee times
    const sortedOnlyMyUserMatches = onlyMyUserMatches.sort((a, b) => {
        const aDate = Date.parse(a.match.date)
        const bDate = Date.parse(b.match.date)
        return aDate < bDate ? -1 : aDate > bDate ? +1 : 0
    })

    const userMatchesIHaveAccessTo = userMatchesWithMatchInfo.filter(userMatch => {
        if (activeUserFriends.find(userFriend => userFriend.friendId === userMatch.userId && userMatch.isInitiator === true)) {
            return userMatch
        }
    })

    const onlyOthersUserMatches = userMatchesIHaveAccessTo.filter(uME => {
        return uME.userId !== linkUpUserObj.id && uME.isInitiator === true
    })




    const onlyOthersUserMatchesThatIHaveNotJoined = onlyOthersUserMatches.filter(othersUserMatch => {
        const haveIJoinedAlready = onlyMyUserMatches.find(myUserMatch => myUserMatch.matchId === othersUserMatch.matchId)
        if (haveIJoinedAlready) {
            return false
        }
        else {
            return true
        }
    })
    const sortedOthersUserMatchesThatIHaveNotJoined = onlyOthersUserMatchesThatIHaveNotJoined.sort((a, b) => {
        const aDate = Date.parse(a.match.date)
        const bDate = Date.parse(b.match.date)
        return aDate < bDate ? -1 : aDate > bDate ? +1 : 0
    })

    //todays generated date for comparison    PASS DOWN AS PROP
    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1)
    const currentDayOfMonth = currentDate.getDate()
    const currentYear = currentDate.getFullYear()
    const currentDateString = `${currentMonth}-${currentDayOfMonth}-${currentYear}`
    const currentDateParsed = Date.parse(currentDateString)

    const onlyOthersSortedFutureMatchesThatIHaveNotJoined = sortedOthersUserMatchesThatIHaveNotJoined.filter(teeTime => {
        //string values for teeTime date
        const [month, day, year] = teeTime?.match?.date.split("/")

        //numeric values for teeTime date
        const intYear = parseInt(year)
        const intMonth = parseInt(month)
        const intDay = parseInt(day)
        const teeTimeDateString = `${intMonth}-${intDay}-${intYear}`
        const teeTimeDateParsed = Date.parse(teeTimeDateString)
        const matchingCourse = courses.find(course => course.id === teeTime?.match.courseId)
        const initiatingUserMatch = userMatchesWithMatchInfo?.find(userMatch => userMatch.matchId === teeTime?.match.id)
        const initiatingUser = users.find(user => user.id === initiatingUserMatch?.userId)
        if (teeTimeDateParsed >= currentDateParsed) {
            return true
            
        }
        else {
            return false
        }
    })


    return (
        <TeeTimeContext.Provider value={{
            deleteItem, deleteInitiated, joinMatch, joinInitiated, users, courses, matches, userMatchesWithMatchInfo, matchCreated, setMatchCreated, friendChange, setFriendChange, activeUserFriends, setActiveUserFriends, navigate,
            sortedOthersUserMatchesThatIHaveNotJoined, onlyOthersSortedFutureMatchesThatIHaveNotJoined, userMatchesWithMatchInfo, sortedOnlyMyUserMatches, currentDateParsed, profileUpdated, setProfileUpdated, chatUser, setChatUser, msgsRead, setMsgsRead
        }}>
            {props.children}
        </TeeTimeContext.Provider>
    )


}