import { useEffect, useState } from "react"
import { getActiveUserMatches, getAllCourseHoles, getAllCourses, getAllMatches, getAllMatchUserHoleScores, getAllUserMatches, getAllUsers } from "../ApiManager"
import "./HomePage.css"

export const HomePage = () => {
    const [users, setUsers] = useState([])
    const [courses, setCourses] = useState([])
    const [courseHoles, setCourseHoles] = useState([])
    const [matches, setMatches] = useState([])
    const [userMatches, setUserMatches] = useState([])
    const [matchUserHoleScores, setMatchUserHoleScores] = useState([])
    const [userMatchesExpanded, setUserMatchesExpanded] = useState([])

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

    // useEffect(
    //     () => {
    //         getAllCourseHoles()
    //         .then(
    //             (data) => {
    //                 setCourseHoles(data)
    //             }
    //         )
    //     },
    //     []
    // )

    useEffect(
        () => {
            getAllMatches()
                .then(
                    (data) => {
                        setMatches(data)
                    }
                )
        },
        []
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
            getActiveUserMatches()
                .then(
                    (data) => {
                        setUserMatchesExpanded(data)
                    }
                )
        },
        []
    )

    // useEffect(
    //     () => {
    //         getAllMatchUserHoleScores()
    //         .then(
    //             (data) => {
    //                 setMatchUserHoleScores(data)
    //             }
    //         )
    //     },
    //     []
    // )

    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1)
    const currentDayOfMonth = currentDate.getDate()
    const currentYear = currentDate.getFullYear()

    let myTeeTimes = []
    let othersTeeTimes = []

    const onlyMyUserMatches = userMatchesExpanded.filter(uME => {
        return uME.user.id === linkUpUserObj.id
    })
    const onlyOthersUserMatches = userMatchesExpanded.filter(uME => {
        return uME.user.id !== linkUpUserObj.id
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

    const onlyOthersTeeTimes = () => {
        let matchingTeeTimes = []
        {
            onlyOthersUserMatches.map(othersUserMatch => {
                const myMatch = matches.find(match => match.id === othersUserMatch.matchId)
                othersTeeTimes.push(myMatch)
            })

        }
    }
    onlyOthersTeeTimes()


    return <>
        <main id="homepageContainer">
            <section className="teeTimesContainer">
                <h3>My Tee Times</h3>
                <ul className="listOfTeeTimes">

                    {
                        myTeeTimes.map(teeTime => {
                            const matchingCourse = courses.find(course => course.id === teeTime.courseId)
                            return <>
                                <li key={teeTime.id} className="teeTimeListItem">
                                    <div>
                                        <div>
                                            {matchingCourse.name}
                                        </div>
                                        <div>

                                            {teeTime.time} {teeTime.date}
                                        </div>
                                    </div>
                                    <div className="buttonBlock">
                                        <button className="teeTimeButton">Delete</button>
                                    </div>
                                </li>
                            </>
                        })
                    }
                </ul>

            </section>
            <section className="teeTimesContainer">
                <h3>Open Tee Times</h3>
                <ul className="listOfTeeTimes">

                    {
                        othersTeeTimes.map(teeTime => {
                            const matchingCourse = courses.find(course => course.id === teeTime.courseId)
                            return <>
                            <li key={teeTime.id} className="teeTimeListItem">
                                    <div>
                                        <div>
                                            {matchingCourse.name}
                                        </div>
                                        <div>

                                            {teeTime.time} {teeTime.date}
                                        </div>
                                    </div>
                                    <div className="buttonBlock">
                                        <button className="teeTimebutton">Join</button>
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