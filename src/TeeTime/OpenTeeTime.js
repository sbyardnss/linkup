import { useContext } from "react"
import { sendUserMatch } from "../ServerManager"
import { WeatherContext } from "../Weather/WeatherProvider"
import "./TeeTime.css"
import { TeeTimeContext } from "./TeeTimeProvider"
import playerIcon from "../images/johnny_automatic_NPS_map_pictographs_part_33 2.png"


export const OpenTeeTime = ({ id, courseName, date, time, dateForWeather, creator, golfers }) => {
    const { next14Dates, weatherHourArrayForIndex, hourlyWindspeed, hourlyTemp, hourlyPrecipitation } = useContext(WeatherContext)
    const { joinMatch, joinInitiated } = useContext(TeeTimeContext)
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)

    //build weather string here
    const dateTwoWeeksOut = Date.parse(next14Dates[13])
    let weatherInfoString = ""
    const teeTimeDateParsed = Date.parse(date)

    //build hourly weather string here
    const timeBuilder = (time) => {
        let [hours, minutes, seconds] = time.split(":")
        if (parseInt(hours) < 12) {
            hours = parseInt(hours) + 12
        }
        return `T${hours}:00`
    }

    const dateString = dateForWeather
    const exactHourString = `${dateString}${timeBuilder(time)}`
    //find index number for hourly weather arrays
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

    if (teeTimeDateParsed >= dateTwoWeeksOut || tempHour === null || windHour === null || precipitationHour === null) {
        weatherInfoString += "too early for weather data"
    }

    const initiatingUser = creator

    const maxPlayerCount = [0, 1, 2, 3]
    const listOfOtherPlayersOnMatch = () => {
        if (golfers.length > 0) {
            return <>
                <div className="otherPlayersContainer">
                    {
                        maxPlayerCount.map(count => {
                            if (golfers[count]?.id === linkUpUserObj.userId) {
                                return <>
                                    <div className="otherJoinedPlayer"><img id="playericon" src={playerIcon} />{count + 1} - Me</div>
                                </>
                            }
                            else if (golfers[count] === undefined) {
                                return <>
                                    <div className="otherJoinedPlayer">-- Open Slot --</div>
                                </>
                            }
                            else {
                                return <>
                                    <div className="otherJoinedPlayer"><img id="playericon" src={playerIcon} />{count + 1}--{golfers[count].full_name}</div>
                                </>
                            }
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
        if (golfers.length === 4) {
            return <>
                <h4>This match is full</h4>
            </>
        }
        else {
            return <>
                <button className="joinTeeTimeButton" onClick={
                    () => {
                        const userMatchObjToSendToApi = {
                            matchId: id,
                            userId: linkUpUserObj.userId,
                            // isInitiator: false,
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
            <li key={id} className="joinableTeeTimes">
                <div className="teeTimeLogistics">
                    <h3 className="teeTimeCourseTag">
                        {courseName}
                    </h3>
                    <div className="teeTimeDateAndTime">
                        <div className="teeTimeDate">
                            {date}
                        </div>
                        <div>
                            {time}
                        </div>
                    </div>
                </div>
                <div className="playersAndWeather">
                    {listOfOtherPlayersOnMatch()}
                    <div className="weatherAndButton">
                        <div className="weatherContainer">
                            <ul className="weatherInfoList">
                                <div>
                                    <li className="weatherInfo">{precipitationString}</li>
                                    <li className="weatherInfo">{tempString}</li>
                                    <li className="weatherInfo">{windString}</li>
                                </div>
                            </ul>
                        </div>
                        <div className="buttonBlock">
                            {isMatchFull()}
                        </div>
                    </div>
                </div>
            </li>
        </>
    }
}