import { useState, useEffect, createContext, useRef } from "react";
import { useLinkClickHandler, useNavigate } from "react-router-dom";
//new to manager imports: getMyMatches, getMyFriends
import { getAllCourses, getAllMatches, getAllUsers, getAllMessages, getMyMatches, getMyFriends, removeFriend, addFriend } from "../ServerManager"
export const TeeTimeContext = createContext()

export const TeeTimeProvider = (props) => {
    const [users, setUsers] = useState([])
    const [courses, setCourses] = useState([])
    const [matches, setMatches] = useState([])
    // const [userMatchesWithMatchInfo, setUserMatchesWithMatchInfo] = useState([])
    // const [activeUserFriends, setActiveUserFriends] = useState([])
    // const [deleteItem, deleteInitiated] = useState(false)
    // const [joinMatch, joinInitiated] = useState([false])
    // const [matchCreated, setMatchCreated] = useState(false)
    // const [friendChange, setFriendChange] = useState(false)
    // const [profileUpdated, setProfileUpdated] = useState(false)
    const [chatUser, setChatUser] = useState(0)
    const navigate = useNavigate()
    // const [msgsRead, setMsgsRead] = useState(false)
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
        []
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
        []
    )
    useEffect(
        () => {
            if (users.length) {
                const loggedInUser = users.find(user => user.id === linkUpUserObj.userId)
                setCurrentUser(loggedInUser)
            }
        }, [users]
    )
    console.log(currentUser.friends)
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
        }, []
    )
    const myJoinedMatchesFromMatches = []
    const openMatchesIHaveAccessTo = []

    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1)
    const currentDayOfMonth = currentDate.getDate()
    const currentYear = currentDate.getFullYear()
    const currentDateString = `${currentMonth}-${currentDayOfMonth}-${currentYear}`
    const currentDateParsed = Date.parse(currentDateString)
    
    const myPastMatches = []
    const matchesSortedByDate = matches.sort((a, b) => { //KEEP FOR SERVER SIDE
        const aDate = Date.parse(a.date)
        const bDate = Date.parse(b.date)
        return aDate < bDate ? -1 : aDate > bDate ? +1 : 0
    })
    const matchesFilteredByDate = matchesSortedByDate.map(teeTime => { //sorts matches by whether the date has passed or not
        //string values for teeTime date
        const [month, day, year] = teeTime?.date.split("-")
        //numeric values for teeTime date
        const intYear = parseInt(year)
        const intMonth = parseInt(month)
        const intDay = parseInt(day)
        const teeTimeDateString = `${intMonth}-${intDay}-${intYear}`
        const teeTimeDateParsed = Date.parse(teeTimeDateString)
        if (teeTimeDateParsed >= currentDateParsed && currentUser?.friends?.find(friend => friend === teeTime.creator.id && teeTime.joined === 0)) {
            openMatchesIHaveAccessTo.push(teeTime)
        }
        else if (teeTimeDateParsed >= currentDateParsed && teeTime.joined === 1) {
            myJoinedMatchesFromMatches.push(teeTime)
        }
        else if (teeTimeDateParsed < currentDateParsed && teeTime.joined === 1){
            myPastMatches.push(teeTime)
        }
        else {
            return null
        }
    })
    
    //sorter separates matches i have joined from matches i havent and checks to see if open match is available to current user
    // const matchSorter = (matchArr) => {
    //     matchArr.map(match => {
    //         if (match.joined === 1) {
    //             myJoinedMatchesFromMatches.push(match)
    //         }
    //         if (currentUser?.friends?.find(friend => friend === match.creator.id && match.joined === 0)) {
    //             openMatchesIHaveAccessTo.push(match)
    //         }
    //     })
    // }
    // matchSorter(matchesSortedByDate)

    return (
        <TeeTimeContext.Provider value={{
            /*deleteItem, deleteInitiated, joinMatch, joinInitiated, */users, courses, matches, /*userMatchesWithMatchInfo, matchCreated, setMatchCreated, friendChange, setFriendChange, activeUserFriends, setActiveUserFriends, */navigate,
            currentDateParsed, /*profileUpdated, setProfileUpdated, */chatUser, setChatUser, /*msgsRead, setMsgsRead,*/
            setUsers, myJoinedMatchesFromMatches, openMatchesIHaveAccessTo, myPastMatches, setMatches
        }}>
            {props.children}
        </TeeTimeContext.Provider>
    )
}