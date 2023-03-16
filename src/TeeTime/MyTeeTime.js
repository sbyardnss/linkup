import { useContext, useEffect, useState, confirm } from "react"
import { Link } from "react-router-dom"
import { deleteTeeTime, deleteUserMatch } from "../ApiManager"
import { WeatherContext } from "../Weather/WeatherProvider"
import { TeeTimeContext } from "./TeeTimeProvider"

import "./TeeTime.css"

export const MyTeeTime = ({ id, courseId, courseName, date, time, matchId, scorecardId }) => {
    const { weather14Day, rainChance14Day, next14Dates } = useContext(WeatherContext)
    const { deleteItem, deleteInitiated, users, userMatchesWithMatchInfo, navigate } = useContext(TeeTimeContext)

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
            if (rainChance === null) {
                weatherInfoString = "too early for weather data"
            }
        })

    }

    if (teeTimeDateParsed >= dateTwoWeeksOut) {
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
                        {weatherInfoString}
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
                        {weatherInfoString}
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