import { useState, useEffect, createContext, useRef } from "react";
import { useLinkClickHandler, useNavigate } from "react-router-dom";
//new to manager imports: getMyMatches, getMyFriends
import { getAllCourses, getAllMatches, getAllUsers, getAllMessages, getMyMatches, getMyFriends, removeFriend, addFriend } from "../ServerManager"
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
    //state variables below added for server conversion
    const [currentUser, setCurrentUser] = useState({})
    const [userMatches, setUserMatches] = useState([])
    const [myJoinedMatches, setMyJoinedMatches] = useState([])


    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)

    // useEffect(
    //     () => {
    //         Promise.all([getAllUsers, getAllCourses, getAllMatches]).then(([userData, courseData, matchData]) => {
    //             setUsers(userData)
    //             setCourses(courseData)
    //             setMatches(matchData);
    //         });
    //     },[]
    // )
    useEffect(
        () => {
            if (linkUpUserObj.token) {
                Promise.resolve(getAllUsers())
                    .then(
                        (userData) => {
                            setUsers(userData)
                        }
                    )

            }
        },
        [profileUpdated]
    )
    useEffect(
        () => {
            if (linkUpUserObj.token) {
                Promise.resolve(getAllCourses())
                    .then(
                        (courseData) => {
                            setCourses(courseData)
                        }
                    )

            }
        },
        []
    )
    useEffect(
        () => {
            if (linkUpUserObj.token) {
                Promise.resolve(getAllMatches())
                    .then(
                        (data) => {
                            setMatches(data)
                        }
                    )

            }
        },
        [deleteItem, matchCreated]
    )

    useEffect(
        () => {
            if (users.length) {
                const loggedInUser = users.find(user => user.id === linkUpUserObj.userId)
                setCurrentUser(loggedInUser)
            }
        }, [users]
    )
    // useEffect(
    //     () => {
    //         setUserMatches(currentUser?.matches)
    //     },[currentUser]
    // )
    useEffect(
        () => {
            if (linkUpUserObj.token) {
                Promise.resolve(getMyMatches(linkUpUserObj.userId))
                    .then(
                        (data) => {
                            setMyJoinedMatches(data)
                        }
                    )
            }
        },[]
    )
    const myJoinedMatchesFromMatches = []
    const openMatchesIHaveAccessTo = []

    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1)
    const currentDayOfMonth = currentDate.getDate()
    const currentYear = currentDate.getFullYear()
    const currentDateString = `${currentMonth}-${currentDayOfMonth}-${currentYear}`
    const currentDateParsed = Date.parse(currentDateString)

    const matchesFilteredByDate = matches.filter(teeTime => {
        //string values for teeTime date
        const [month, day, year] = teeTime?.date.split("-")

        //numeric values for teeTime date
        const intYear = parseInt(year)
        const intMonth = parseInt(month)
        const intDay = parseInt(day)
        const teeTimeDateString = `${intMonth}-${intDay}-${intYear}`
        const teeTimeDateParsed = Date.parse(teeTimeDateString)
        const matchingCourse = courses.find(course => course.id === teeTime?.course.id)
        const initiatingUserMatch = userMatchesWithMatchInfo?.find(userMatch => userMatch.matchId === teeTime?.match.id)
        const initiatingUser = users.find(user => user.id === initiatingUserMatch?.userId)
        if (teeTimeDateParsed >= currentDateParsed) {
            return true

        }
        else {
            return false
        }
    })
    const matchesSortedByDate = matchesFilteredByDate.sort((a, b) => { //KEEP FOR SERVER SIDE
        const aDate = Date.parse(a.date)
        const bDate = Date.parse(b.date)
        return aDate < bDate ? -1 : aDate > bDate ? +1 : 0
    })
    //sorter separates matches i have joined from matches i havent and checks to see if open match is available to current user
    const matchSorter = (matchArr) => {
        matchArr.map(match => {
            if (match.joined === 1) {
                myJoinedMatchesFromMatches.push(match)
            }
            if (currentUser?.friends?.find(friend => friend === match.creator.id && match.joined === 0)) {
                openMatchesIHaveAccessTo.push(match)
            }
        })
    }
    matchSorter(matchesSortedByDate)
    // const sortedOnlyMyUserMatches = myJoinedMatches.sort((a, b) => { //KEEP FOR SERVER SIDE
    //     const aDate = Date.parse(a.date)
    //     const bDate = Date.parse(b.date)
    //     return aDate < bDate ? -1 : aDate > bDate ? +1 : 0
    // })
    // const userMatchesIHaveAccessTo = matches.filter(match => {//KEEP FOR SERVER SIDE
    //         if (currentUser?.friends?.find(friend => friend === match.creator.id)) {
    //             return match
    //     }
    // })
    // const onlyOthersUserMatches = userMatchesIHaveAccessTo.filter(uME => {
    //     return uME.userId !== linkUpUserObj.id && uME.isInitiator === true
    // })




    // const onlyOthersUserMatchesThatIHaveNotJoined = userMatchesIHaveAccessTo.filter(match => {
    //     // const haveIJoinedAlready = myJoinedMatches.find(myUserMatch => myUserMatch.matchId === match.matchId)
    //     if (match.golfers.find(golfer => golfer.id === linkUpUserObj.userId && match.joined===1)) {
    //         return false
    //     }
    //     else {
    //         return true
    //     }
    // })
    // console.log(onlyOthersUserMatchesThatIHaveNotJoined)
    // const sortedOthersUserMatchesThatIHaveNotJoined = onlyOthersUserMatchesThatIHaveNotJoined.sort((a, b) => {
    //     const aDate = Date.parse(a.match.date)
    //     const bDate = Date.parse(b.match.date)
    //     return aDate < bDate ? -1 : aDate > bDate ? +1 : 0
    // })

    //todays generated date for comparison    PASS DOWN AS PROP
    // const currentDate = new Date();
    // const currentMonth = (currentDate.getMonth() + 1)
    // const currentDayOfMonth = currentDate.getDate()
    // const currentYear = currentDate.getFullYear()
    // const currentDateString = `${currentMonth}-${currentDayOfMonth}-${currentYear}`
    // const currentDateParsed = Date.parse(currentDateString)

    // const onlyOthersSortedFutureMatchesThatIHaveNotJoined = sortedOthersUserMatchesThatIHaveNotJoined.filter(teeTime => {
    //     //string values for teeTime date
    //     const [month, day, year] = teeTime?.date.split("-")

    //     //numeric values for teeTime date
    //     const intYear = parseInt(year)
    //     const intMonth = parseInt(month)
    //     const intDay = parseInt(day)
    //     const teeTimeDateString = `${intMonth}-${intDay}-${intYear}`
    //     const teeTimeDateParsed = Date.parse(teeTimeDateString)
    //     const matchingCourse = courses.find(course => course.id === teeTime?.course.id)
    //     const initiatingUserMatch = userMatchesWithMatchInfo?.find(userMatch => userMatch.matchId === teeTime?.match.id)
    //     const initiatingUser = users.find(user => user.id === initiatingUserMatch?.userId)
    //     if (teeTimeDateParsed >= currentDateParsed) {
    //         return true

    //     }
    //     else {
    //         return false
    //     }
    // })


    return (
        <TeeTimeContext.Provider value={{
            deleteItem, deleteInitiated, joinMatch, joinInitiated, users, courses, matches, userMatchesWithMatchInfo, matchCreated, setMatchCreated, friendChange, setFriendChange, activeUserFriends, setActiveUserFriends, navigate,
            /*sortedOthersUserMatchesThatIHaveNotJoined, onlyOthersSortedFutureMatchesThatIHaveNotJoined,*/ userMatchesWithMatchInfo, /*sortedOnlyMyUserMatches, */currentDateParsed, profileUpdated, setProfileUpdated, chatUser, setChatUser, msgsRead, setMsgsRead,
            setUsers, myJoinedMatchesFromMatches, openMatchesIHaveAccessTo, setMatches
        }}>
            {props.children}
        </TeeTimeContext.Provider>
    )


}