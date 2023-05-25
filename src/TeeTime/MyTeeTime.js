import { useContext } from "react"
import { deleteTeeTime, deleteUserMatch, leaveTeeTime, getAllMatches } from "../ServerManager"
import { WeatherContext } from "../Weather/WeatherProvider"
import { TeeTimeContext } from "./TeeTimeProvider"
import "./TeeTime.css"
import playerIcon from "../images/johnny_automatic_NPS_map_pictographs_part_33 2.png"

export const MyTeeTime = ({ id, courseName, date, time, dateForWeather, creator, golfers }) => {
    const { weatherData } = useContext(WeatherContext)
    const { setMatches } = useContext(TeeTimeContext)
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    
    const [precipitationString, windString, tempString, weatherInfoString] = weatherData(date, time, dateForWeather)
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
    if (initiatingUser && initiatingUser.id === linkUpUserObj.userId) {
        return <>
            <li className="myCreatedTeeTime" key={id}>
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
                                <li>{precipitationString}</li>
                                <li>{tempString}</li>
                                <li>{windString}</li>
                            </ul>
                        </div>
                        <div className="buttonBlock">
                            <button key={id} className="teeTimeButton" onClick={
                                () => {
                                    if (window.confirm("are you sure?")) {
                                        deleteTeeTime(id)
                                            .then(
                                                () => {
                                                    getAllMatches()
                                                        .then(data => setMatches(data))
                                                }
                                            )
                                    }
                                    else {
                                        return null
                                    }
                                }
                            }>Delete</button>
                        </div>
                    </div>
                </div>
            </li>
        </>
    }
    else {
        return <>
            <li key={id} className="myJoinedTeeTime">
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
                                <li>{precipitationString}</li>
                                <li>{tempString}</li>
                                <li>{windString}</li>
                            </ul>
                        </div>
                        <div className="buttonBlock">
                            <button className="bailTeeTimeButton" onClick={
                                () => {
                                    if (window.confirm("are you sure?")) {
                                        leaveTeeTime(id)
                                            .then(
                                                () => {
                                                    getAllMatches(linkUpUserObj.userId)
                                                        .then(data => setMatches(data))
                                                }
                                            )
                                    }
                                }
                            }>Bail</button>
                        </div>
                    </div>
                </div>
            </li>
        </>
    }
}