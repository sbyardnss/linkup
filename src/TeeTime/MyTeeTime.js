import { useContext, useEffect, useState, confirm } from "react"
import { Link } from "react-router-dom"
import { deleteTeeTime, deleteUserMatch } from "../ApiManager"
import { WeatherContext } from "../Weather/WeatherProvider"
import { TeeTimeContext } from "./TeeTimeProvider"
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
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
        return `T${hours}:00`
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
    let precipitationString = ""
    let windString = ""
    let tempString = ""
    if (precipitationHour !== null) {
        precipitationString = `Rain: ${precipitationHour}% chance`
    }
    else {
        precipitationString = " Precipitation data not yet available"

    }
    if (windString !== null) {
        windString = `WindSpeed: ${windHour}mph`
    }
    else {
        windString = "Wind data not yet available"

    }
    if (tempString !== null) {
        tempString = `Temp: ${tempHour}°F`
    }
    else {
        tempString = "Temp data not yet available"

    }
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
            {/* <Card
                direction={{ sm: 'row' }}
                colorScheme='blue'
                // variant={}
                > */}
            <li className="myCreatedTeeTime" key={id}>
                {/* <CardHeader */}

                {/* > */}

                <div>
                    <h4>
                        {courseName}
                    </h4>
                    <div className="teeTimeDate">
                        {date}
                    </div>
                    <div>

                        {time}
                    </div>
                </div>
                {/* </CardHeader>
                    <CardBody> */}

                <div className="weatherContainer">
                    <ul className="weatherInfoList">

                        {/* <div className="tooEarlyWarning">{weatherInfoString}</div> */}
                        {/* <div>Rain: {precipitationHour}% chance</div>
                        <div>Temp: {tempHour}°F</div>
                    <div> WindSpeed: {windHour}mph</div> */}
                        <li key={precipitationString} className="weatherInfo">{precipitationString}</li>
                        <li key={tempString} className="weatherInfo">{tempString}</li>
                        <li key={windString} className="weatherInfo">{windString}</li>
                    </ul>
                </div>
                <div className="otherPlayersContainer"></div>
                <div className="buttonBlock">
                    {/* <button className="scorecardButton">Scorecard</button> */}

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
                {/* </CardBody> */}
            </li>
            {/* </Card> */}

        </>

    }
    else {
        return <>
            <li key={id} className="myJoinedTeeTime">
                <div>
                    <div>
                        {initiatingUser?.name}
                    </div>
                    <h4>
                        {courseName}
                    </h4>
                    <div className="teeTimeDate">
                        {date}
                    </div>
                    <div className="teeTimeWeather">

                        {time}
                    </div>
                </div>
                <div className="weatherContainer">
                    <ul className="weatherInfoList">
                        {/* {weatherInfoString} */}
                        {/* <div>Rain: {precipitationHour}% chance</div>
                        <div>Temp: {tempHour}°F</div>
                        <div> WindSpeed: {windHour}mph</div> */}
                        <li>{precipitationString}</li>
                        <li>{tempString}</li>
                        <li>{windString}</li>
                    </ul>
                </div>
                <div className="otherPlayersContainer"></div>

                <div className="buttonBlock">
                    {/* <button className="scorecardButton">Scorecard</button> */}
                    <button className="bailTeeTimeButton" onClick={
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