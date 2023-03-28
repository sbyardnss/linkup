import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { sendUserMatch } from "../ApiManager"
import { WeatherContext } from "../Weather/WeatherProvider"
import "./TeeTime.css"
import { TeeTimeContext } from "./TeeTimeProvider"

export const OpenTeeTime = ({ id, courseId, courseName, date, time, matchId }) => {
    const { rainChance14Day, next14Dates, weatherHourArrayForIndex, hourlyWindspeed, hourlyTemp, hourlyPrecipitation } = useContext(WeatherContext)
    const { joinMatch, joinInitiated, users, userMatchesWithMatchInfo } = useContext(TeeTimeContext)
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)



    //build weather string here
    const dateTwoWeeksOut = Date.parse(next14Dates[13])
    let rainChance = 0
    let weatherInfoString = ""
    const teeTimeDateParsed = Date.parse(date)




    //build hourly weather string here
    const timeBuilder = (time) => {
        const [timeString,] = time.split(" ")
        // console.log(timeString)//4:00
        let [hours, minutes] = timeString.split(":")
        if (parseInt(hours) < 12) {
            hours = parseInt(hours) + 12
        }
        return `T${hours}:00`
    }
    const [month, day, year] = date.split("/")
    const dateString = `${year}-${month}-${day}`
    const exactHourString = `${dateString}${timeBuilder(time)}`
    const hourIndex = weatherHourArrayForIndex.findIndex(hour => hour === exactHourString)
    const precipitationHour = hourlyPrecipitation[hourIndex]//works
    const windHour = hourlyWindspeed[hourIndex]//works
    const tempHour = hourlyTemp[hourIndex]//works
    let precipitationString = ""
    let windString = ""
    let tempString = ""
    if (precipitationHour !== null && precipitationHour !== undefined) {
        precipitationString = `Rain: ${precipitationHour}% chance`
    }
    else {
        precipitationString = " Precipitation data not yet available"

    }
    if (windHour !== null && windHour !== undefined) {
        windString = `WindSpeed: ${windHour}mph`
    }
    else {
        windString = "Wind data not yet available"

    }
    if (tempHour !== null && tempHour !== undefined) {
        tempString = `Temp: ${tempHour}°F`
    }
    else {
        tempString = "Temp data not yet available"

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

    if (teeTimeDateParsed >= dateTwoWeeksOut) {
        weatherInfoString += "too early for weather data"
    }


    const listOfOtherPlayersOnMatch = () => {
        if (matchingUserMatches.length > 0) {

            return <>
                <div className="otherPlayersContainer">

                    {
                        matchingUserMatches.map(userMatch => {
                            const matchingPlayer = users.find(user => user.id === userMatch.userId)

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
    const isMatchFull = () => {
        if (matchingUserMatches.length === 4) {
            return <>
                <h4>This match is full</h4>
            </>
        }
        else {
            return <>
                <button className="joinTeeTimeButton" onClick={
                    () => {
                        const userMatchObjToSendToApi = {
                            matchId: matchId,
                            userId: linkUpUserObj.id,
                            isInitiator: false,
                            totalStrokes: 0
                        }
                        sendUserMatch(userMatchObjToSendToApi)
                        joinInitiated(!joinMatch)
                    }
                }>Join</button>
            </>
        }
    }



    if (initiatingUser) {

        return <>
            <li key={matchId} className="joinableTeeTimes">
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
                            <div>
                                <li className="weatherInfo">{precipitationString}</li>
                                <li className="weatherInfo">{tempString}</li>
                                <li className="weatherInfo">{windString}</li>
                            </div>
                        </ul>
                    </div>
                    {listOfOtherPlayersOnMatch()}
                </div>

                <div className="buttonBlock">
                    {isMatchFull()}
                </div>
            </li>
        </>
    }
}