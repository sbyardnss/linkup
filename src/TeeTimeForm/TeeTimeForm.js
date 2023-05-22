import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { getAllMatches, sendTeeTime, sendUserMatch } from "../ServerManager"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import "./TeeTimeForm.css"
export const TeeTimeForm = () => {
    const { courses, matches, setMatchCreated, matchCreated, setMatches } = useContext(TeeTimeContext)


    const [newMatch, updateNewMatch] = useState({

        message: ""
    })
    const [newUserMatch, updateNewUserMatch] = useState({})
    const navigate = useNavigate()
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)

    const lastMatchIndex = matches.length
    const lastMatchInMatches = matches[lastMatchIndex - 1]

    const teeTimeObjToSendToApi = {
        courseId: parseInt(newMatch.course),
        date: newMatch.date,
        time: newMatch.time,
        message: newMatch.message,
        creator: linkUpUserObj.userId
        // confirmed: false
    }
    let newMatchId = lastMatchInMatches?.id + 1
    if (!lastMatchInMatches) {
        newMatchId = 1
    }
    const userMatchObjToSendToApi = {
        matchId: newMatchId,
        userId: linkUpUserObj.id,
        isInitiator: true,
        totalStrokes: 0
    }
    return <>
        <main id="createTeeTimeContainer">

            <div className="newTeeTime">
                <form className="teeTimeForm">
                    <h2>When We Playin'?</h2>
                    <fieldset className="newTeeTime_input">

                        <div>
                            <input type="date" className="dateTimeSelectors" id="title" placeholder="title" onChange={
                                (evt) => {
                                    const [year, month, day] = evt.target.value.split("-")
                                    const copy = { ...newMatch }
                                    copy.date = evt.target.value
                                    updateNewMatch(copy)
                                }
                            } />
                        </div>
                        <div  >
                            <input type="time" className="dateTimeSelectors" defaultValue={"00:00"} id="title" onChange={
                                (evt) => {
                                    const copy = { ...newMatch }
                                    copy.time = evt.target.value
                                    updateNewMatch(copy)
                                }
                            } />
                        </div>
                        <div className="newTeeTime_input">
                            <select className="courseSelector" id="courseSelect" onChange={
                                (evt) => {
                                    const copy = { ...newMatch }
                                    copy.course = evt.target.value
                                    updateNewMatch(copy)
                                }
                            }>
                                <option className="courseSelectOption" key={0} value={0}>select course</option>
                                {
                                    courses.map(
                                        (course) => {
                                            return <>
                                                <option className="courseSelectOption" key={course.id} value={course.id}>{course.name}</option>
                                            </>
                                        }
                                    )
                                }
                            </select>
                        </div>
                        <div className="newTeeTime_input">
                            <textarea id="messageSection" className="message__section" placeholder="Message to players" onChange={
                                (evt) => {
                                    const copy = { ...newMatch }
                                    copy.message = evt.target.value
                                    updateNewMatch(copy)
                                }
                            }></textarea>
                        </div>
                        <div className="teeTimeFormButtonBlock">
                            <button onClick={() => {
                                if (newMatch.time && newMatch.date && newMatch.course) {
                                    sendTeeTime(teeTimeObjToSendToApi)
                                        .then(
                                            () => {
                                                getAllMatches()
                                                    .then(data => setMatches(data))
                                            }
                                        )
                                    navigate("/")
                                }
                                else {
                                    alert("please fill out the form")
                                }
                            }} className="teeTimeSaveButton" >Save</button>
                            <button className="teeTimeCancelButton" onClick={() => navigate("/")}>Cancel</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </main>
    </>
}