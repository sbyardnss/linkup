import { React, useContext, useEffect, useState } from "react"
import { MyTeeTime } from "../TeeTime/MyTeeTime"
import { OpenTeeTime } from "../TeeTime/OpenTeeTime"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import { WeatherContext } from "../Weather/WeatherProvider.js"
import "./HomePage.css"

export const HomePage = () => {

    const { users, courses, matches, userMatchesWithMatchInfo, activeUserFriends, navigate, sortedOthersUserMatchesThatIHaveNotJoined, sortedOnlyMyUserMatches, currentDateParsed} = useContext(TeeTimeContext)

    const { next14Dates } = useContext(WeatherContext)

    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)





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
                                // const [todaysYear, todaysMonth, todaysDay] = next14Dates[0].split("-")
                                // if (day >= todaysDay && month >= todaysMonth && year >= todaysYear) {

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




    // //todays generated date for comparison    PASS DOWN AS PROP
    // const currentDate = new Date();
    // const currentMonth = (currentDate.getMonth() + 1)
    // const currentDayOfMonth = currentDate.getDate()
    // const currentYear = currentDate.getFullYear()
    // const currentDateString = `${currentMonth}-${currentDayOfMonth}-${currentYear}`
    // const currentDateParsed = Date.parse(currentDateString)



    if (matches) {
        return <>
            <main id="homepageContainer">
                <section className="myTeeTimesContainer">
                    <h3>My Tee Times</h3>
                    <ul className="listOfTeeTimes">
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
                    <h3>Open Tee Times</h3>
                    <ul className="listOfTeeTimes">
                        {messageToUserOrOpenMatches()}
                    </ul>
                </section>
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