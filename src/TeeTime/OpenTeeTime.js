import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { sendUserMatch } from "../ApiManager"
import { WeatherContext } from "../Weather/WeatherProvider"
import "./TeeTime.css"
import { TeeTimeContext } from "./TeeTimeProvider"

export const OpenTeeTime = ({ id, courseId, courseName, date, time, matchId }) => {
    const { weather14Day, rainChance14Day, next14Dates } = useContext(WeatherContext)
    const { joinMatch, joinInitiated, users, userMatchesWithMatchInfo } = useContext(TeeTimeContext)
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)



    //build weather string here
    const dateTwoWeeksOut = Date.parse(next14Dates[13])
    let rainChance = 0
    let weatherInfoString = ""
    const teeTimeDateParsed = Date.parse(date)
    {
        next14Dates.map((date, indexOfDate) => {
            const [year, month, day] = date.split("-")
            const forCastYear = parseInt(year)
            const forCastMonth = parseInt(month)
            const forCastDay = parseInt(day)
            const forCastDate = `${forCastMonth}-${forCastDay}-${forCastYear}`
            const parsedForCastDate = Date.parse(forCastDate)
            if (parsedForCastDate === teeTimeDateParsed) {
                rainChance = rainChance14Day[indexOfDate]
            }
            else {
                rainChance = ""
            }
            if (rainChance) {
                weatherInfoString = `${rainChance}% chance of rain`
            }
            if (rainChance === 0) {
                weatherInfoString = "0% chance of rain"
            }
        })

    }

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
                    <div>
                        {weatherInfoString}
                    </div>
                </div>
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