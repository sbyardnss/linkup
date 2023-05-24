import { useContext } from "react"
import { getMyMatches, joinTeeTime, sendUserMatch, getAllMatches } from "../ServerManager"
import { WeatherContext } from "../Weather/WeatherProvider"
import "./TeeTime.css"
import { TeeTimeContext } from "./TeeTimeProvider"
import playerIcon from "../images/johnny_automatic_NPS_map_pictographs_part_33 2.png"


export const OpenTeeTime = ({ id, courseName, date, time, dateForWeather, creator, golfers }) => {
    const { weatherData } = useContext(WeatherContext)
    const { setMatches } = useContext(TeeTimeContext)
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    const initiatingUser = creator
    const [precipitationString, windString, tempString, weatherInfoString] = weatherData(date, time, dateForWeather)
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
                        joinTeeTime(id)
                        .then(
                            () => {
                                getAllMatches(linkUpUserObj.userId)
                                .then(data => setMatches(data))
                            }
                        )
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