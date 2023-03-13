import { React, useContext, useEffect, useState } from "react"
import { getActiveUserMatchesWithMatchInfo, getActiveUserMatches, getAllCourseHoles, getAllCourses, getAllMatches, getAllMatchUserHoleScores, getAllUserMatches, getAllUsers, deleteTeeTime, deleteUserMatch, sendUserMatch, getWeatherInfo } from "../ApiManager"
import { WeatherContext } from "../Weather/WeatherProvider.js"
import "./HomePage.css"

export const HomePage = () => {
    const [users, setUsers] = useState([])
    const [courses, setCourses] = useState([])
    const [matches, setMatches] = useState([])
    const [userMatchesWithMatchInfo, setUserMatchesWithMatchInfo] = useState([])
    //switches
    const [deleteItem, deleteInitiated] = useState(false)
    const [joinMatch, joinInitiated] = useState([false])
    const { weather14Day, rainChance14Day, next14Dates } = useContext(WeatherContext)
    // console.log(weather14Day)

    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)

    // useEffect(
    //     () => {
    //         Promise.all([getAllUsers(), getAllCourses()]).then(([userData, courseData]) => {
    //             setUsers(userData)
    //             setCourses(courseData)
    //         })
    //     },
    //     []
    // )
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
        [deleteItem]
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





    let myTeeTimes = []
    let othersTeeTimes = []

    const onlyMyUserMatches = userMatchesWithMatchInfo.filter(uME => {
        return uME.userId === linkUpUserObj.id
    })
    const onlyOthersUserMatches = userMatchesWithMatchInfo.filter(uME => {
        return uME.userId !== linkUpUserObj.id && uME.isInitiator === true
    })

    const onlyMyTeeTimes = () => {

        {
            onlyMyUserMatches.map(myUserMatch => {
                const myMatch = matches?.find(match => match.id === myUserMatch.matchId)
                myTeeTimes.push(myMatch)
            })

        }
    }
    onlyMyTeeTimes()
    // console.log(onlyOthersUserMatches)
    const onlyOpenTeeTimes = () => {
        {
            onlyOthersUserMatches.map(othersUserMatch => {
                const haveIJoinedAlready = myTeeTimes.find(teeTime => teeTime?.id === othersUserMatch.matchId)
                if (!haveIJoinedAlready) {
                    const myMatch = matches?.find(match => match.id === othersUserMatch.matchId)
                    othersTeeTimes.push(myMatch)
                }



            })

        }
    }
    onlyOpenTeeTimes()





    //todays generated date for comparison    PASS DOWN AS PROP
    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1)
    const currentDayOfMonth = currentDate.getDate()
    const currentYear = currentDate.getFullYear()
    const currentDateString = `${currentMonth}-${currentDayOfMonth}-${currentYear}`
    const currentDateParsed = Date.parse(currentDateString)
    // console.log(othersTeeTimes)
    // console.log(onlyMyUserMatches)
    if (matches) {
        return <>
            <main id="homepageContainer">
                <section className="myTeeTimesContainer">
                    <h3>My Tee Times</h3>
                    <ul className="listOfTeeTimes">
                        {
                            onlyMyUserMatches.map(teeTime => {




                                if (next14Dates) {
                                    //string values
                                    const [month, day, year] = teeTime?.match?.date.split("/")


                                    //numeric values
                                    const intYear = parseInt(year)
                                    const intMonth = parseInt(month)
                                    const intDay = parseInt(day)
                                    const teeTimeDateString = `${intMonth}-${intDay}-${intYear}`
                                    const teeTimeDateParsed = Date.parse(teeTimeDateString)
                                    // if ((intDay >= currentDayOfMonth && intMonth >= currentMonth && intYear >= currentYear) || (intDay <= currentDayOfMonth && intMonth >= (currentMonth +1) && intYear >= currentYear)) {
                                    if (teeTimeDateParsed >= currentDateParsed) {

                                        const dateTwoWeeksOut = Date.parse(next14Dates[13])
                                        // const [todaysYear, todaysMonth, todaysDay] = next14Dates[0].split("-")
                                        const teeTimeDate = `${year}-${month}-${day}`
                                        let rainChance = 0
                                        let weatherInfoString = ""
                                        {
                                            next14Dates.map((date, indexOfDate) => {
                                                if (date === teeTimeDate) {
                                                    rainChance = rainChance14Day[indexOfDate]
                                                }
                                                else {
                                                    rainChance = ""
                                                }
                                                //line of code below eliminates rain info from days with 0% probability. 
                                                //add !== "" to add the 0% printing. but that also seems to screw up other aspects
                                                if (rainChance) {
                                                    weatherInfoString = `${rainChance}% chance of rain`
                                                }
                                                if (rainChance === 0) {
                                                    weatherInfoString = "0% chance of rain"
                                                }
                                            })

                                        }
                                        // console.log(teeTimeDateParsed)
                                        // console.log(dateTwoWeeksOut)
                                        if (teeTimeDateParsed >= dateTwoWeeksOut) {
                                            weatherInfoString += "too early for weather data"
                                        }


                                        const matchingCourse = courses.find(course => course.id === teeTime?.match.courseId)
                                        let allMatchingUserMatches = []
                                        const matchingUserMatch = userMatchesWithMatchInfo.find(userMatch => userMatch.matchId === teeTime?.match.id)

                                        const matchingUserMatches = userMatchesWithMatchInfo.filter(userMatch => userMatch.matchId === teeTime?.id)
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
                                                            {/* initiating user */}
                                                        </div>
                                                        <div>
                                                            {matchingCourse?.name}
                                                        </div>
                                                        <div>

                                                            {teeTime?.match.time} {teeTime?.match.date}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            {weatherInfoString}

                                                        </div>
                                                    </div>
                                                    <div className="buttonBlock">
                                                        <button key={teeTime.id} className="teeTimeButton" onClick={
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
                                            const initiatingUserMatch = userMatchesWithMatchInfo.find(userMatch => userMatch.matchId === teeTime?.match.id)
                                            const initiatingUser = users.find(user => user.id === initiatingUserMatch?.userId)
                                            return <>
                                                <li key={teeTime?.id} className="myJoinedTeeTime">
                                                    <div>
                                                        <div>
                                                            {initiatingUser?.name}
                                                        </div>
                                                        <div>
                                                            {matchingCourse?.name}
                                                        </div>
                                                        <div>

                                                            {teeTime?.match.time} {teeTime?.match.date}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div>

                                                            {weatherInfoString}

                                                        </div>
                                                    </div>
                                                    <div className="buttonBlock">
                                                        <button className="joinTeeTimeButton" onClick={
                                                            () => {
                                                                deleteUserMatch(teeTime.id)
                                                                deleteInitiated(!deleteItem)
                                                            }
                                                        }>Bail</button>
                                                    </div>
                                                </li>
                                            </>
                                        }



                                    }

                                }
                            })
                        }
                    </ul>

                </section>
                <section className="openTeeTimesContainer">
                    <h3>Open Tee Times</h3>
                    <ul className="listOfTeeTimes">

                        {
                            othersTeeTimes.map(teeTime => {
                                const matchingCourse = courses.find(course => course.id === teeTime?.courseId)
                                const initiatingUserMatch = userMatchesWithMatchInfo?.find(userMatch => userMatch.matchId === teeTime?.id)
                                const initiatingUser = users.find(user => user.id === initiatingUserMatch?.userId)
                                const [month, day, year] = teeTime?.date.split("/") ?? []
                                
                                let rainChance = 0
                                let weatherInfoString = ""




                                //string values
                                // const [openMonth, openDay, openYear] = teeTime?.match?.date.split("/")


                                //numeric values
                                const intYear = parseInt(year)
                                const intMonth = parseInt(month)
                                const intDay = parseInt(day)
                                const teeTimeDateString = `${intMonth}-${intDay}-${intYear}`
                                const teeTimeDateParsed = Date.parse(teeTimeDateString)
                                // if ((intDay >= currentDayOfMonth && intMonth >= currentMonth && intYear >= currentYear) || (intDay <= currentDayOfMonth && intMonth >= (currentMonth +1) && intYear >= currentYear)) {
                                if (teeTimeDateParsed >= currentDateParsed) {
                                    if (next14Dates) {
                                        const dateTwoWeeksOut = Date.parse(next14Dates[13])
                                        // const [todaysYear, todaysMonth, todaysDay] = next14Dates[0].split("-")
                                        const teeTimeDate = `${year}-${month}-${day}`
                                        let rainChance = 0
                                        let weatherInfoString = ""
                                        {
                                            next14Dates?.map((date, indexOfDate) => {
                                                if (date === teeTimeDate) {
                                                    rainChance = rainChance14Day[indexOfDate]
                                                }
                                                else {
                                                    rainChance = ""
                                                }
                                                //line of code below eliminates rain info from days with 0% probability. 
                                                //add !== "" to add the 0% printing. but that also seems to screw up other aspects
                                                if (rainChance) {
                                                    weatherInfoString = `${rainChance}% chance of rain`
                                                }
                                                if (rainChance === 0) {
                                                    weatherInfoString = "0% chance of rain"
                                                }

                                            })

                                        }
                                        // console.log(teeTimeDateParsed)
                                        // console.log(dateTwoWeeksOut)
                                        if (teeTimeDateParsed >= dateTwoWeeksOut) {
                                            weatherInfoString = "too early for weather data"
                                        }




                                        const [todaysYear, todaysMonth, todaysDay] = next14Dates[0].split("-")
                                        if (day >= todaysDay && month >= todaysMonth && year >= todaysYear) {

                                            return <>
                                                <li key={teeTime?.id} className="joinableTeeTimes">
                                                    <div>
                                                        <div>
                                                            {initiatingUser?.name}
                                                        </div>
                                                        <div>
                                                            {matchingCourse?.name}
                                                        </div>
                                                        <div>

                                                            {teeTime?.time} {teeTime?.date}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            {weatherInfoString}
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
                                        }
                                    }

                                }
                            })
                        }
                    </ul>
                </section>
            </main>
            <footer id="homePageFooter">

            </footer>

        </>
    }
}