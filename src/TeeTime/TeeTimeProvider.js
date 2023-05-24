import { useState, useEffect, createContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
//new to manager imports: getMyMatches, getMyFriends
import { getAllCourses, getAllMatches, getAllUsers } from "../ServerManager"
export const TeeTimeContext = createContext()

export const TeeTimeProvider = (props) => {
    const [users, setUsers] = useState([])
    const [courses, setCourses] = useState([])
    const [matches, setMatches] = useState([])
    const [chatUser, setChatUser] = useState(0)
    const navigate = useNavigate()
    const [msgsRead, setMsgsRead] = useState(false)
    //state variables below added for server conversion
    const [currentUser, setCurrentUser] = useState({})


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
                const loggedInUser = users?.find(user => user.id === linkUpUserObj.userId)
                setCurrentUser(loggedInUser)
            }
        }, [users]
    )
    const myJoinedMatchesFromMatches = []
    const openMatchesIHaveAccessTo = []
    const myPastMatches = []
    //code below gets current date an formats. probably a better way
    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1)
    const currentDayOfMonth = currentDate.getDate()
    const currentYear = currentDate.getFullYear()
    const currentDateString = `${currentMonth}-${currentDayOfMonth}-${currentYear}`
    const currentDateParsed = Date.parse(currentDateString)

    const dateStringBuilder = (teeTime) => { //builds string for comparison to current day
        const [year, month, day] = teeTime?.date.split("-")
        //numeric values for teeTime date
        const intYear = parseInt(year)
        const intMonth = parseInt(month)
        const intDay = parseInt(day)
        return `${intMonth}-${intDay}-${intYear}`
    }
    const matchesSortedByDate = matches.sort((a, b) => { //KEEP FOR SERVER SIDE
        const aDate = Date.parse(a.date)
        const bDate = Date.parse(b.date)
        return aDate < bDate ? -1 : aDate > bDate ? +1 : 0
    })
    const matchesFilteredByDate = (matchArr) => {
        matchArr.map(teeTime => { //sorts matches by whether the date has passed or not
            const teeTimeDateString = dateStringBuilder(teeTime)
            const teeTimeDateParsed = Date.parse(teeTimeDateString)
            if (teeTimeDateParsed >= currentDateParsed && currentUser?.friends?.find(friend => friend.id === teeTime.creator.id && teeTime.joined === 0)) {
                openMatchesIHaveAccessTo.push(teeTime)
            }
            else if (teeTimeDateParsed >= currentDateParsed && teeTime.joined === 1) {
                myJoinedMatchesFromMatches.push(teeTime)
            }
            else if (teeTimeDateParsed < currentDateParsed && teeTime.joined === 1) {
                myPastMatches.push(teeTime)
            }
            else {
                return null
            }
        })
    }
    matchesFilteredByDate(matchesSortedByDate)

    return (
        <TeeTimeContext.Provider value={{
            users, setUsers, courses, setCourses, matches, navigate,currentDateParsed, chatUser, setChatUser, msgsRead, setMsgsRead,
            setUsers, myJoinedMatchesFromMatches, openMatchesIHaveAccessTo, myPastMatches, setMatches, dateStringBuilder, currentDateString, currentUser
        }}>
            {props.children}
        </TeeTimeContext.Provider>
    )
}