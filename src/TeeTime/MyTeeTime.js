import { useContext, useEffect, useState, confirm } from "react"
import { Link } from "react-router-dom"
import { deleteTeeTime, deleteUserMatch } from "../ApiManager"
import { WeatherContext } from "../Weather/WeatherProvider"
import { TeeTimeContext } from "./TeeTimeProvider"

import "./TeeTime.css"

export const MyTeeTime = ({ id, courseId, courseName, date, time, matchId, scorecardId }) => {
    const { rainChance14Day, next14Dates, weatherHourArrayForIndex, hourlyWindspeed, hourlyTemp, hourlyPrecipitation } = useContext(WeatherContext)
    const { deleteItem, deleteInitiated, users, userMatchesWithMatchInfo, navigate } = useContext(TeeTimeContext)

    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)

    //build weather string here
    const dateTwoWeeksOut = Date.parse(next14Dates[13])
    let rainChance = 0
    let weatherInfoString = ""
    const teeTimeDateParsed = Date.parse(date)
    const testTeeTimeTime = "2023-03-28T12:00"




    // console.log(time)//2:00 pm
    // console.log(date)//03/17/2023
    const timeBuilder = (time) => {
        const [timeString,] = time.split(" ")
        // console.log(timeString)//4:00
        let [hours, minutes] = timeString.split(":")
        if (parseInt(hours) < 12) {
            hours = parseInt(hours) + 12
        }
        return `T${hours}:${minutes}`
    }
    // console.log(timeBuilder(time))//T16:00

    const [month, day, year] = date.split("/")
    const dateString = `${year}-${month}-${day}`
    // console.log(dateString)//2023-03-20
    const exactHourString = `${dateString}${timeBuilder(time)}`
    // console.log(exactHourString)//2023-03-17T14:00
    //find index number for hourly weather arrays
    const hourIndex = weatherHourArrayForIndex.findIndex(hour => hour === exactHourString)
    // console.log(hourIndex)//works
    const precipitationHour = hourlyPrecipitation[hourIndex]//works
    const windHour = hourlyWindspeed[hourIndex]//works
    const tempHour = hourlyTemp[hourIndex]//works
    // console.log(tempHour)
    const weatherData = `Rain: ${precipitationHour}% chance${"\n"}Temp: ${tempHour}°F${"\n"}WindSpeed: ${windHour}mph`

    //old daily value for weather
    // {
    //     next14Dates.map((date, indexOfDate) => {

    //         const [year, month, day] = date.split("-")
    //         const forCastYear = parseInt(year)
    //         const forCastMonth = parseInt(month)
    //         const forCastDay = parseInt(day)
    //         const forCastDate = `${forCastMonth}-${forCastDay}-${forCastYear}`
    //         const parsedForCastDate = Date.parse(forCastDate)
    //         if (parsedForCastDate === teeTimeDateParsed) {
    //             rainChance = rainChance14Day[indexOfDate]
    //         }
    //         else {
    //             rainChance = ""
    //         }
    //         if (rainChance) {
    //             weatherInfoString = `${rainChance}% chance of rain`
    //         }
    //         if (rainChance === 0) {
    //             weatherInfoString = "0% chance of rain"
    //         }
    //         if (rainChance === null) {
    //             weatherInfoString = "too early for weather data"
    //         }
    //     })

    // }


    if (teeTimeDateParsed >= dateTwoWeeksOut || tempHour === null || windHour === null || precipitationHour === null) {
        weatherInfoString += "too early for weather data"
    }
    // else {
    //     weatherInfoString = weatherData
    // }

    //find all userMatches corresponding to a match that you initiated. this is for the delete button
    let allMatchingUserMatches = []
    const matchingUserMatch = userMatchesWithMatchInfo.find(userMatch => userMatch.matchId === matchId)

    const matchingUserMatches = userMatchesWithMatchInfo.filter(userMatch => userMatch.matchId === matchId)
    {
        matchingUserMatches.map(userMatch => {
            allMatchingUserMatches.push(userMatch)
        })
    }


    //establish initiating user
    const initiatingUserMatch = userMatchesWithMatchInfo.find(userMatch => userMatch.matchId === matchId)
    const initiatingUser = users.find(user => user.id === initiatingUserMatch?.userId)



    if (initiatingUser && initiatingUser.id === linkUpUserObj.id) {
        return <>
            <li className="myCreatedTeeTime" key={`TeeTime--${id}`}>
                <div>
                    <div>
                        {courseName}
                    </div>
                    <div className="teeTimeDate">
                        {date}
                    </div>
                    <div>

                        {time}
                    </div>
                </div>
                <div className="weatherContainer">
                    <div className="teeTimeWeather">
                        <div className="tooEarlyWarning">{weatherInfoString}</div>
                        <div>Rain: {precipitationHour}% chance</div>
                        <div>Temp: {tempHour}°F</div>
                        <div> WindSpeed: {windHour}mph</div>

                    </div>
                </div>
                <div className="buttonBlock">
                    <button className="scorecardButton" onClick={
                        () => {

                        }
                    }>Scorecard</button>

                    <button key={id} className="teeTimeButton" onClick={
                        () => {
                            if (window.confirm("are you sure?")) {

                                deleteTeeTime(matchId)
                                {
                                    allMatchingUserMatches.map(userMatch => {
                                        deleteUserMatch(userMatch.id)
                                    })
                                    deleteInitiated(!deleteItem)
                                }
                            }
                            else {
                                return null
                            }
                        }
                    }>Delete</button>
                </div>

            </li>
        </>

    }
    else {
        return <>
            <li className="myJoinedTeeTime">
                <div>
                    <div>
                        {initiatingUser?.name}
                    </div>
                    <div>
                        {courseName}
                    </div>
                    <div className="teeTimeDate">
                        {date}
                    </div>
                    <div className="teeTimeWeather">

                        {time}
                    </div>
                </div>
                <div className="weatherContainer">
                    <div>
                        {/* {weatherInfoString} */}
                        <div>Rain: {precipitationHour}% chance</div>
                        <div>Temp: {tempHour}°F</div>
                        <div> WindSpeed: {windHour}mph</div>
                    </div>
                </div>
                <div className="buttonBlock">
                    <button className="scorecardButton">Scorecard</button>
                    <button className="joinTeeTimeButton" onClick={
                        () => {
                            if (window.confirm("are you sure?")) {
                                deleteUserMatch(id)
                                deleteInitiated(!deleteItem)
                            }
                        }
                    }>Bail</button>
                </div>
            </li>
        </>
    }

}