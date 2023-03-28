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





    const timeBuilder = (time) => {
        const [timeString,] = time.split(" ")
        let [hours, minutes] = timeString.split(":")
        if (parseInt(hours) < 12) {
            hours = parseInt(hours) + 12
        }
        return `T${hours}:00`
    }
    // console.log(timeBuilder(time))//T16:00

    const [month, day, year] = date.split("/")
    const dateString = `${year}-${month}-${day}`
    const exactHourString = `${dateString}${timeBuilder(time)}`
    //find index number for hourly weather arrays
    const hourIndex = weatherHourArrayForIndex.findIndex(hour => hour === exactHourString)
    const precipitationHour = hourlyPrecipitation[hourIndex]//works
    const windHour = hourlyWindspeed[hourIndex]//works
    const tempHour = hourlyTemp[hourIndex]//works
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



    if (teeTimeDateParsed >= dateTwoWeeksOut || tempHour === null || windHour === null || precipitationHour === null) {
        weatherInfoString += "too early for weather data"
    }


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

    const listOfOtherPlayersOnMatch = () => {

        if (matchingUserMatches.length > 0) {

            return <>
                <div className="otherPlayersContainer">
                    {
                        matchingUserMatches.map(userMatch => {
                            const matchingPlayer = users.find(user => user.id === userMatch.userId && userMatch.userId !== linkUpUserObj.id)

                            return <>
                                <div className="otherJoinedPlayer">{matchingPlayer?.name}</div>
                            </>
                        })
                    }

                </div>
            </>
        }
        else {
            return <>
                <h5>no other players yet</h5>
            </>
        }



    }

    if (initiatingUser && initiatingUser.id === linkUpUserObj.id) {
        return <>

            <li className="myCreatedTeeTime" key={id}>


                <div>

                    <h5>
                        {courseName}
                    </h5>
                    <div className="teeTimeDate">
                        {date}
                    </div>
                    <div>

                        {time}
                    </div>
                </div>

                <div>

                    <div className="weatherContainer">
                        <ul className="weatherInfoList">


                            <li key={precipitationString} className="weatherInfo">{precipitationString}</li>
                            <li key={tempString} className="weatherInfo">{tempString}</li>
                            <li key={windString} className="weatherInfo">{windString}</li>
                        </ul>
                    </div>
                    {listOfOtherPlayersOnMatch()}
                </div>


                <div className="buttonBlock">

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
            <li key={id} className="myJoinedTeeTime">
                <div>
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
                <div>
                    <div className="weatherContainer">
                        <ul className="weatherInfoList">

                            <li>{precipitationString}</li>
                            <li>{tempString}</li>
                            <li>{windString}</li>
                        </ul>
                    </div>
                    {listOfOtherPlayersOnMatch()}
                </div>

                <div className="buttonBlock">
                    <button className="bailTeeTimeButton" onClick={
                        () => {
                            if (window.confirm("are you sure?")) {
                                deleteUserMatch(id).then(() => {

                                    deleteInitiated(!deleteItem)
                                })
                            }
                        }
                    }>Bail</button>
                </div>
            </li>
        </>
    }

}