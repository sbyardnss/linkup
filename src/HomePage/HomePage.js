import { React, useEffect, useState } from "react"
import { getActiveUserMatchesWithMatchInfo, getActiveUserMatches, getAllCourseHoles, getAllCourses, getAllMatches, getAllMatchUserHoleScores, getAllUserMatches, getAllUsers, deleteTeeTime, deleteUserMatch, sendUserMatch, getWeatherInfo } from "../ApiManager"
import "./HomePage.css"

export const HomePage = () => {
    const [users, setUsers] = useState([])
    const [courses, setCourses] = useState([])
    const [courseHoles, setCourseHoles] = useState([])
    const [matches, setMatches] = useState([])
    const [userMatches, setUserMatches] = useState([])
    const [matchUserHoleScores, setMatchUserHoleScores] = useState([])
    const [userMatchesExpanded, setUserMatchesExpanded] = useState([])
    const [userMatchesWithMatchInfo, setUserMatchesWithMatchInfo] = useState([])
    //switches
    const [deleteItem, deleteInitiated] = useState(false)
    const [joinMatch, joinInitiated] = useState([false])


    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)

    useEffect(
        () => {
            getAllUsers()
                .then(
                    (data) => {
                        setUsers(data)
                    }
                )
        },
        []
    )

    useEffect(
        () => {
            getAllCourses()
                .then(
                    (data) => {
                        setCourses(data)
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
        [deleteItem]
    )

    useEffect(
        () => {
            getAllUserMatches()
                .then(
                    (data) => {
                        setUserMatches(data)
                    }
                )
        },
        []
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
        [deleteItem, joinMatch]
    )

    


    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1)
    const currentDayOfMonth = currentDate.getDate()
    const currentYear = currentDate.getFullYear()

    let myTeeTimes = []
    let othersTeeTimes = []

    const onlyMyUserMatches = userMatches.filter(uME => {
        return uME.userId === linkUpUserObj.id
    })
    const onlyOthersUserMatches = userMatches.filter(uME => {
        return uME.userId !== linkUpUserObj.id && uME.isInitiator === true
    })

    const onlyMyTeeTimes = () => {
        let matchingTeeTimes = []
        {
            onlyMyUserMatches.map(myUserMatch => {
                const myMatch = matches.find(match => match.id === myUserMatch.matchId)
                myTeeTimes.push(myMatch)
            })

        }
    }
    onlyMyTeeTimes()
    console.log(onlyOthersUserMatches)
    const onlyOpenTeeTimes = () => {
        let matchingTeeTimes = []
        {
            onlyOthersUserMatches.map(othersUserMatch => {
                const myMatch = matches.find(match => match.id === othersUserMatch.matchId)
                othersTeeTimes.push(myMatch)
            })

        }
    }
    onlyOpenTeeTimes()


    const myActiveUserMatchesWithMatchInfo = userMatchesWithMatchInfo.filter(userMatch => userMatch.userId === linkUpUserObj.id)



    // console.log(myActiveUserMatchesWithMatchInfo)


    return <>
        <main id="homepageContainer">
            <section className="teeTimesContainer">
                <h3>My Tee Times</h3>
                <ul className="listOfTeeTimes">
                    {
                        myActiveUserMatchesWithMatchInfo.map(teeTime => {
                            const matchingCourse = courses.find(course => course.id === teeTime?.match.courseId)
                            let allMatchingUserMatches = []
                            const matchingUserMatch = userMatches.find(userMatch => userMatch.matchId === teeTime?.match.id)
                            // console.log(teeTime)

                            const matchingUserMatches = userMatches.filter(userMatch => userMatch.matchId === teeTime?.id)
                            {
                                matchingUserMatches.map(userMatch => {
                                    allMatchingUserMatches.push(userMatch)
                                })
                            }
                            if (matchingCourse && teeTime.isInitiator === true) {
                                return <>
                                    <li key={teeTime?.id} className="myCreatedTeeTime">
                                        <div>
                                            <div>
                                                {matchingCourse?.name}
                                            </div>
                                            <div>

                                                {teeTime?.match.time} {teeTime?.match.date}
                                            </div>
                                        </div>
                                        <div className="buttonBlock">
                                            <button className="teeTimeButton" onClick={
                                                () => {
                                                    deleteTeeTime(teeTime.match.id)
                                                    {
                                                        allMatchingUserMatches.map(userMatch => {
                                                            deleteUserMatch(userMatch.id)
                                                        })
                                                        deleteInitiated(!deleteItem)
                                                    }
                                                    // console.log(allMatchingUserMatches)
                                                    // console.log(teeTime)
                                                }
                                            }>Delete</button>
                                        </div>
                                    </li>
                                </>
                            }
                            else {
                                return <>
                                    <li key={teeTime?.id} className="myJoinedTeeTime">
                                        <div>
                                            <div>
                                                {matchingCourse?.name}
                                            </div>
                                            <div>

                                                {teeTime?.match.time} {teeTime?.match.date}
                                            </div>
                                        </div>
                                        <div className="buttonBlock">
                                            <button className="teeTimeButton" onClick={
                                                () => {
                                                    deleteUserMatch(teeTime.id)
                                                    deleteInitiated(!deleteItem)
                                                }
                                            }>Bail</button>
                                        </div>
                                    </li>
                                </>
                            }
                        })
                    }
                </ul>

            </section>
            <section className="teeTimesContainer">
                <h3>Open Tee Times</h3>
                <ul className="listOfTeeTimes">

                    {
                        othersTeeTimes.map(teeTime => {
                            const matchingCourse = courses.find(course => course.id === teeTime?.courseId)
                            const matchingUserMatch = userMatches.find(userMatch => userMatch?.matchId === teeTime?.match?.id)
                            console.log(teeTime)
                            return <>
                                <li key={teeTime?.id} className="joinableTeeTimes">
                                    <div>
                                        <div>
                                            {matchingCourse?.name}
                                        </div>
                                        <div>

                                            {teeTime?.time} {teeTime?.date}
                                        </div>
                                    </div>
                                    <div className="buttonBlock">
                                        <button className="joinTeeTimeButton" onClick={
                                            () => {
                                                const userMatchObjToSendToApi = {
                                                    matchId: teeTime?.id,
                                                    userId: linkUpUserObj.id,
                                                    isInitiator: false,
                                                    totalStrokes: 0
                                                }
                                                sendUserMatch(userMatchObjToSendToApi)
                                                joinInitiated(!joinMatch)
                                            }
                                        }>Join</button>
                                    </div>
                                </li>
                            </>
                        })
                    }
                </ul>
            </section>
        </main>

    </>
}