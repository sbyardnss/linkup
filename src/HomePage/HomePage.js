import { React, useContext, useEffect, useState } from "react"
import Calendar from "react-calendar"
import { MyTeeTime } from "../TeeTime/MyTeeTime"
import { OpenTeeTime } from "../TeeTime/OpenTeeTime"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import { WeatherContext } from "../Weather/WeatherProvider.js"
import "./HomePage.css"
// import 'react-calendar/dist/Calendar.css';
import { UserList } from "../UserList/UserList"
export const HomePage = () => {

    const { users, courses, matches, userMatchesWithMatchInfo, activeUserFriends, navigate, sortedOthersUserMatchesThatIHaveNotJoined, sortedOnlyMyUserMatches, currentDateParsed } = useContext(TeeTimeContext)

    const { next14Dates } = useContext(WeatherContext)

    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)




    const datesForMatchesIHaveJoined = () => {
        const dateArray = []
        {
            sortedOnlyMyUserMatches.map(userMatch => {
                const matchingMatch = matches.find(match => userMatch.matchId === match.id)
                const dateOfJoinedMatch = matchingMatch?.date
                const parsedMatchingDate = Date.parse(matchingMatch?.date)
                if (parsedMatchingDate > currentDateParsed) {
                    dateArray.push(dateOfJoinedMatch)
                }
            })
        }
        return dateArray
    }
    const datesIHaveJoined = datesForMatchesIHaveJoined()
    // console.log(datesIHaveJoined.map(date => {
    //     return Date.parse(date)
    // }))
    const datesForMatchesIHaveNotJoined = () => {
        const dateArray = []
        {
            sortedOthersUserMatchesThatIHaveNotJoined.map(userMatch => {
                const matchingMatch = matches.find(match => userMatch.matchId === match.id)
                const dateOfJoinedMatch = matchingMatch?.date
                dateArray.push(dateOfJoinedMatch)
            })
        }
        return dateArray
    }
    const datesIHaveNotJoined = datesForMatchesIHaveNotJoined()
    const highlightedDate = () => {

    }


    // const onlyMyUserMatches = userMatchesWithMatchInfo.filter(uME => {
    //     return uME.userId === linkUpUserObj.id
    // })
    // //sort matches for my tee times
    // const sortedOnlyMyUserMatches = onlyMyUserMatches.sort((a, b) => {
    //     const aDate = Date.parse(a.match.date)
    //     const bDate = Date.parse(b.match.date)
    //     return aDate < bDate ? -1 : aDate > bDate ? +1 : 0
    // })

    // //sort userMatches so that only matches initiated by friends show in open matches
    // const userMatchesIHaveAccessTo = userMatchesWithMatchInfo.filter(userMatch => {
    //     if (activeUserFriends.find(userFriend => userFriend.friendId === userMatch.userId && userMatch.isInitiator === true)) {
    //         return userMatch
    //     }
    // })

    // const onlyOthersUserMatches = userMatchesIHaveAccessTo.filter(uME => {
    //     return uME.userId !== linkUpUserObj.id && uME.isInitiator === true
    // })



    // const onlyMyTeeTimes = () => {

    //     {
    //         onlyMyUserMatches.map(myUserMatch => {
    //             const myMatch = matches?.find(match => match.id === myUserMatch.matchId)
    //             myTeeTimes.push(myMatch)
    //         })

    //     }
    // }
    // onlyMyTeeTimes()
    // // console.log(onlyOthersUserMatches)
    // const onlyOpenTeeTimes = () => {
    //     {
    //         onlyOthersUserMatches.map(othersUserMatch => {
    //             const haveIJoinedAlready = myTeeTimes.find(teeTime => teeTime?.id === othersUserMatch.matchId)
    //             if (!haveIJoinedAlready) {
    //                 const myMatch = matches?.find(match => match.id === othersUserMatch.matchId)
    //                 othersTeeTimes.push(myMatch)
    //             }



    //         })

    //     }
    // }
    // onlyOpenTeeTimes()

    // const onlyOthersUserMatchesThatIHaveNotJoined = onlyOthersUserMatches.filter(othersUserMatch => {
    //     const haveIJoinedAlready = onlyMyUserMatches.find(myUserMatch => myUserMatch.matchId === othersUserMatch.matchId)
    //     if (haveIJoinedAlready) {
    //         return false
    //     }
    //     else {
    //         return true
    //     }
    // })
    // const sortedOthersUserMatchesThatIHaveNotJoined = onlyOthersUserMatchesThatIHaveNotJoined.sort((a, b) => {
    //     const aDate = Date.parse(a.match.date)
    //     const bDate = Date.parse(b.match.date)
    //     return aDate < bDate ? -1 : aDate > bDate ? +1 : 0
    // })



    //population of open matches based on friend status

    const messageToUserOrOpenMatches = () => {
        if (sortedOthersUserMatchesThatIHaveNotJoined.length === 0) {
            return <li>
                <h3>You really don't have any friends?</h3>
            </li>
        }
        else {
            return <>
                {

                    sortedOthersUserMatchesThatIHaveNotJoined.map(teeTime => {
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

                            if (next14Dates) {


                                return <>
                                    <OpenTeeTime key={teeTime.id}
                                        id={teeTime.id}
                                        courseId={matchingCourse.id}
                                        courseName={matchingCourse.name}
                                        date={teeTime.match.date}
                                        time={teeTime.match.time}
                                        matchId={teeTime.matchId}
                                    />
                                </>

                                // }

                            }

                        }
                    })
                }
            </>
        }
    }







    if (matches) {
        return <>
            <main id="homepageContainer">
                <div id="homepageTeeTimes">

                    <section className="myTeeTimesContainer">
                        <ul className="listOfTeeTimes">
                            <h1 className="teeTimeHeaderTitle">My Tee Times</h1>
                            {
                                sortedOnlyMyUserMatches.map(teeTime => {
                                    if (next14Dates) {
                                        //string values for teeTime date
                                        const [month, day, year] = teeTime?.match?.date.split("/")

                                        //numeric values for teeTime date
                                        const intYear = parseInt(year)
                                        const intMonth = parseInt(month)
                                        const intDay = parseInt(day)
                                        const teeTimeDateString = `${intMonth}-${intDay}-${intYear}`
                                        const teeTimeDateParsed = Date.parse(teeTimeDateString)

                                        if (teeTimeDateParsed >= currentDateParsed) {
                                            const matchingCourse = courses.find(course => course.id === teeTime?.match.courseId)

                                            // let allMatchingUserMatches = []
                                            // const matchingUserMatch = userMatchesWithMatchInfo.find(userMatch => userMatch.matchId === teeTime?.match.id)

                                            // const matchingUserMatches = userMatchesWithMatchInfo.filter(userMatch => userMatch.matchId === teeTime?.id)
                                            // {
                                            //     matchingUserMatches.map(userMatch => {
                                            //         allMatchingUserMatches.push(userMatch)
                                            //     })
                                            // }
                                            return <>
                                                <MyTeeTime
                                                    key={teeTime.id}
                                                    id={teeTime.id}
                                                    courseId={matchingCourse.id}
                                                    courseName={matchingCourse.name}
                                                    date={teeTime.match.date}
                                                    time={teeTime.match.time}
                                                    matchId={teeTime.matchId}
                                                />
                                            </>


                                        }

                                    }
                                })
                            }
                        </ul>

                    </section>
                    <section className="openTeeTimesContainer">
                        <ul className="listOfTeeTimes">
                            <h1 className="teeTimeHeaderTitle">Open Tee Times</h1>
                            {messageToUserOrOpenMatches()}
                        </ul>
                    </section>
                </div>
                <div id="homepageCalendarAndFriends">
                    <div id="calendarContainer">
                        <Calendar
                            id="homepageCalendar"
                            calendarType="US"
                            tileClassName={({ date }) => {
                                // if (datesIHaveJoined.find(x => x === date.format("MM/DD/YYYY"))) {
                                //     return 'highlight'
                                // }
                                const month = date.getUTCMonth()
                                const day = date.getDate()

                                const year = date.getFullYear()
                                const parsedDateString = Date.parse(`${month}/${day}/${year}`)
                                const testparsedDateString = `${month}/${day}/${year}`

                                if (datesIHaveJoined.find(matchDate => Date.parse(date) === Date.parse(matchDate))) {
                                    return "joinedCalendarMatches"
                                }
                                if (datesIHaveNotJoined.find(openMatchDate => Date.parse(date) === Date.parse(openMatchDate))) {
                                    return "openCalendarMatches"
                                }

                            }}

                        />
                        <div id="calendarKey">
                            <div className="calendarKeyItem">
                                <div>Joined</div>
                                <span className="colorCodeGreen"></span>

                            </div>
                            <div className="calendarKeyItem">
                                <div>Open</div>
                                <span className="colorCodePurple"> </span>

                            </div>
                        </div>
                    </div>


                    <UserList
                        contingentId="homepageUserList"
                        contingentContainer="homepageUserListContainer"
                        contingentList="homepageListOfOtherUsers"

                    />

                </div>

            </main>
            <footer id="homePageFooter">

            </footer>

        </>
    }
    // if (matches) {
    //     return <>
    //         <main id="homepageContainer">
    //             <section className="myTeeTimesContainer">
    //                 <h3>My Tee Times</h3>
    //                 <ul className="listOfTeeTimes">
    //                     {
    //                         onlyMyUserMatches.map(teeTime => {
    //                             //send date down
    //                             if (next14Dates) {
    //                                 //string values for teeTime date
    //                                 const [month, day, year] = teeTime?.match?.date.split("/")

    //                                 //numeric values for teeTime date
    //                                 const intYear = parseInt(year)
    //                                 const intMonth = parseInt(month)
    //                                 const intDay = parseInt(day)
    //                                 const teeTimeDateString = `${intMonth}-${intDay}-${intYear}`
    //                                 const teeTimeDateParsed = Date.parse(teeTimeDateString)

    //                                 if (teeTimeDateParsed >= currentDateParsed) {

    //                                     const dateTwoWeeksOut = Date.parse(next14Dates[13])

    //                                     let rainChance = 0
    //                                     let weatherInfoString = ""
    //                                     {
    //                                         next14Dates.map((date, indexOfDate) => {
    //                                             const [year, month, day] = date.split("-")
    //                                             const forCastYear = parseInt(year)
    //                                             const forCastMonth = parseInt(month)
    //                                             const forCastDay = parseInt(day)
    //                                             const forCastDate = `${forCastMonth}-${forCastDay}-${forCastYear}`
    //                                             const parsedForCastDate = Date.parse(forCastDate)
    //                                             if (parsedForCastDate === teeTimeDateParsed) {
    //                                                 console.log(Date.parse(date))
    //                                                 rainChance = rainChance14Day[indexOfDate]
    //                                             }
    //                                             else {
    //                                                 rainChance = ""
    //                                             }
    //                                             //line of code below eliminates rain info from days with 0% probability. 
    //                                             //add !== "" to add the 0% printing. but that also seems to screw up other aspects
    //                                             if (rainChance) {
    //                                                 weatherInfoString = `${rainChance}% chance of rain`
    //                                             }
    //                                             if (rainChance === 0) {
    //                                                 weatherInfoString = "0% chance of rain"
    //                                             }
    //                                         })

    //                                     }

    //                                     if (teeTimeDateParsed >= dateTwoWeeksOut) {
    //                                         weatherInfoString += "too early for weather data"
    //                                     }


    //                                     const matchingCourse = courses.find(course => course.id === teeTime?.match.courseId)
    //                                     let allMatchingUserMatches = []
    //                                     const matchingUserMatch = userMatchesWithMatchInfo.find(userMatch => userMatch.matchId === teeTime?.match.id)

    //                                     const matchingUserMatches = userMatchesWithMatchInfo.filter(userMatch => userMatch.matchId === teeTime?.id)
    //                                     {
    //                                         matchingUserMatches.map(userMatch => {
    //                                             allMatchingUserMatches.push(userMatch)
    //                                         })
    //                                     }
    //                                     if (matchingCourse && teeTime.isInitiator === true) {
    //                                         return <>
    //                                             <li key={teeTime?.id} className="myCreatedTeeTime">
    //                                                 <div>
    //                                                     <div>
    //                                                         {/* initiating user */}
    //                                                     </div>
    //                                                     <div>
    //                                                         {matchingCourse?.name}
    //                                                     </div>
    //                                                     <div>

    //                                                         {teeTime?.match.time} {teeTime?.match.date}
    //                                                     </div>
    //                                                 </div>
    //                                                 <div>
    //                                                     <div>
    //                                                         {weatherInfoString}

    //                                                     </div>
    //                                                 </div>
    //                                                 <div className="buttonBlock">
    //                                                     <button key={teeTime.id} className="teeTimeButton" onClick={
    //                                                         () => {
    //                                                             deleteTeeTime(teeTime.match.id)
    //                                                             {
    //                                                                 allMatchingUserMatches.map(userMatch => {
    //                                                                     deleteUserMatch(userMatch.id)
    //                                                                 })
    //                                                                 deleteInitiated(!deleteItem)
    //                                                             }
    //                                                             // console.log(allMatchingUserMatches)
    //                                                             // console.log(teeTime)
    //                                                         }
    //                                                     }>Delete</button>
    //                                                 </div>
    //                                             </li>
    //                                         </>
    //                                     }
    //                                     else {
    //                                         const initiatingUserMatch = userMatchesWithMatchInfo.find(userMatch => userMatch.matchId === teeTime?.match.id)
    //                                         const initiatingUser = users.find(user => user.id === initiatingUserMatch?.userId)
    //                                         return <>
    //                                             <li key={teeTime?.id} className="myJoinedTeeTime">
    //                                                 <div>
    //                                                     <div>
    //                                                         {initiatingUser?.name}
    //                                                     </div>
    //                                                     <div>
    //                                                         {matchingCourse?.name}
    //                                                     </div>
    //                                                     <div>

    //                                                         {teeTime?.match.time} {teeTime?.match.date}
    //                                                     </div>
    //                                                 </div>
    //                                                 <div>
    //                                                     <div>

    //                                                         {weatherInfoString}

    //                                                     </div>
    //                                                 </div>
    //                                                 <div className="buttonBlock">
    //                                                     <button className="joinTeeTimeButton" onClick={
    //                                                         () => {
    //                                                             deleteUserMatch(teeTime.id)
    //                                                             deleteInitiated(!deleteItem)
    //                                                         }
    //                                                     }>Bail</button>
    //                                                 </div>
    //                                             </li>
    //                                         </>
    //                                     }



    //                                 }

    //                             }
    //                         })
    //                     }
    //                 </ul>

    //             </section>
    //             <section className="openTeeTimesContainer">
    //                 <h3>Open Tee Times</h3>
    //                 <ul className="listOfTeeTimes">

    //                     {
    //                         onlyOthersUserMatches.map(teeTime => {
    //                             const matchingCourse = courses.find(course => course.id === teeTime?.match.courseId)
    //                             const initiatingUserMatch = userMatchesWithMatchInfo?.find(userMatch => userMatch.matchId === teeTime?.match.id)
    //                             const initiatingUser = users.find(user => user.id === initiatingUserMatch?.userId)
    //                             const [month, day, year] = teeTime?.match.date.split("/") ?? []

    //                             let rainChance = 0
    //                             let weatherInfoString = ""




    //                             //string values
    //                             // const [openMonth, openDay, openYear] = teeTime?.match?.date.split("/")


    //                             //numeric values
    //                             // const intYear = parseInt(year)
    //                             // const intMonth = parseInt(month)
    //                             // const intDay = parseInt(day)
    //                             // const teeTimeDateString = `${intMonth}-${intDay}-${intYear}`
    //                             const teeTimeDateParsed = Date.parse(teeTime?.match.date)

    //                             // console.log(Date.parse("03/20/2023"))
    //                             // if ((intDay >= currentDayOfMonth && intMonth >= currentMonth && intYear >= currentYear) || (intDay <= currentDayOfMonth && intMonth >= (currentMonth +1) && intYear >= currentYear)) {
    //                             if (teeTimeDateParsed >= currentDateParsed) {

    //                                 if (next14Dates) {
    //                                     const dateTwoWeeksOut = Date.parse(next14Dates[13])
    //                                     // const [todaysYear, todaysMonth, todaysDay] = next14Dates[0].split("-")
    //                                     // const teeTimeDate = `${year}-${month}-${day}`
    //                                     let rainChance = 0
    //                                     let weatherInfoString = ""
    //                                     {
    //                                         next14Dates?.map((date, indexOfDate) => {
    //                                             const parsedDate = Date.parse(date)
    //                                             if (parsedDate === teeTimeDateParsed) {

    //                                                 // console.log(parsedDate)
    //                                                 rainChance = rainChance14Day[indexOfDate]
    //                                             }
    //                                             else {
    //                                                 rainChance = ""
    //                                             }
    //                                             //line of code below eliminates rain info from days with 0% probability. 
    //                                             //add !== "" to add the 0% printing. but that also seems to screw up other aspects
    //                                             if (rainChance) {
    //                                                 weatherInfoString = `${rainChance}% chance of rain`
    //                                             }
    //                                             if (rainChance === 0) {
    //                                                 weatherInfoString = "0% chance of rain"
    //                                             }

    //                                         })

    //                                     }
    //                                     // console.log(teeTimeDateParsed)
    //                                     // console.log(dateTwoWeeksOut)
    //                                     if (teeTimeDateParsed >= dateTwoWeeksOut) {
    //                                         weatherInfoString = "too early for weather data"
    //                                     }




    //                                     const [todaysYear, todaysMonth, todaysDay] = next14Dates[0].split("-")
    //                                     if (day >= todaysDay && month >= todaysMonth && year >= todaysYear) {

    //                                         return <>
    //                                             <li key={teeTime?.match.id} className="joinableTeeTimes">
    //                                                 <div>
    //                                                     <div>
    //                                                         {initiatingUser?.name}
    //                                                     </div>
    //                                                     <div>
    //                                                         {matchingCourse?.name}
    //                                                     </div>
    //                                                     <div>

    //                                                         {teeTime?.match.time} {teeTime?.match.date}
    //                                                     </div>
    //                                                 </div>
    //                                                 <div>
    //                                                     <div>
    //                                                         {weatherInfoString}
    //                                                     </div>
    //                                                 </div>
    //                                                 <div className="buttonBlock">
    //                                                     <button className="joinTeeTimeButton" onClick={
    //                                                         () => {
    //                                                             const userMatchObjToSendToApi = {
    //                                                                 matchId: teeTime?.match.id,
    //                                                                 userId: linkUpUserObj.id,
    //                                                                 isInitiator: false,
    //                                                                 totalStrokes: 0
    //                                                             }
    //                                                             sendUserMatch(userMatchObjToSendToApi)
    //                                                             joinInitiated(!joinMatch)
    //                                                         }
    //                                                     }>Join</button>
    //                                                 </div>
    //                                             </li>
    //                                         </>
    //                                     }
    //                                 }

    //                             }
    //                         })
    //                     }
    //                 </ul>
    //             </section>
    //         </main>
    //         <footer id="homePageFooter">

    //         </footer>

    //     </>
    // }
}