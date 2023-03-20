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

    //establish initiating user
    const initiatingUserMatch = userMatchesWithMatchInfo.find(userMatch => userMatch.matchId === matchId)
    const initiatingUser = users.find(user => user.id === initiatingUserMatch?.userId)

    if (teeTimeDateParsed >= dateTwoWeeksOut) {
        weatherInfoString += "too early for weather data"
    }






    if (initiatingUser) {

        return <>
            <li key={matchId} className="joinableTeeTimes">
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
                    <div>
                        {time}
                    </div>
                </div>
                
                <div className="weatherContainer">
                    <ul className="weatherInfoList">
                        <div>
                            {/* {weatherInfoString} */}
                            {/* <div>Rain: {precipitationHour}% chance</div>
                        <div>Temp: {tempHour}°F</div>
                        <div> WindSpeed: {windHour}mph</div> */}
                            <li className="weatherInfo">{precipitationString}</li>
                            <li className="weatherInfo">{tempString}</li>
                            <li className="weatherInfo">{windString}</li>
                        </div>
                    </ul>
                </div>
                <div className="otherPlayersContainer">other</div>
                <div className="buttonBlock">
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
                </div>
            </li>
        </>
    }
}