import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCourses, getAllMatches, sendTeeTime, sendUserMatch } from "../ApiManager"
import "./TeeTimeForm.css"
export const TeeTimeForm = () => {
    const [courses, setCourses] = useState([])
    const [matches, setMatches] = useState([])


    const [newMatch, updateNewMatch] = useState({

        message: ""
    })
    const [newUserMatch, updateNewUserMatch] = useState({})
    const navigate = useNavigate()
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)


    useEffect(
        () => {
            getAllCourses()
                .then(
                    (data) => {
                        setCourses(data)
                    }
                )
        },
        []
    )

    useEffect(
        () => {
            getAllMatches()
                .then(
                    (data) => {
                        setMatches(data)
                    }
                )
        },
        []
    )
    



    const teeTimeObjToSendToApi = {
        courseId: parseInt(newMatch.course),
        date: newMatch.date,
        time: newMatch.time,
        message: newMatch.message,
        confirmed: false
    }

    const userMatchObjToSendToApi = {
        matchId: matches.length + 1,
        userId: linkUpUserObj.id,
        isInitiator: true,
        totalStrokes: 0
    }
// console.log(newMatch)
    return <>
        <main id="createTeeTimeContainer">

            <div className="newTeeTime">
                <form>

                    <fieldset className="newTeeTime_input">

                        <div  >
                            <input type="date" id="title" placeholder="title" onChange={
                                (evt) => {
                                    const [year, month, day] = evt.target.value.split("-")

                                    const copy = { ...newMatch }
                                    copy.date = `${month}/${day}/${year}`
                                    updateNewMatch(copy)
                                }
                            } />
                        </div>

                        <div  >
                            <input type="time" defaultValue={"00:00"} id="title" onChange={
                                (evt) => {
                                    let timeString = ""
                                    let [hour,] = evt.target.value.split(":")
                                    let [,minutes] = evt.target.value.split(":")
                                    if (hour > 12) {
                                        hour = hour - 12
                                        timeString = hour+":"+minutes+" pm"
                                    }
                                    else {
                                        timeString = hour+":"+minutes+" am"
                                    }
                                    
                                    const copy = { ...newMatch }
                                    copy.time = timeString
                                    updateNewMatch(copy)
                                }
                            } />
                        </div>



                        <div className="newTeeTime_input">
                            <select id="courseSelect" onChange={
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



                        <div>
                            <button onClick={() => {
                                if(newMatch.time && newMatch.date && newMatch.course) {

                                    sendTeeTime(teeTimeObjToSendToApi)
                                    sendUserMatch(userMatchObjToSendToApi)
                                    navigate("/")
                                }
                                else {
                                    alert("please fill out the form")
                                }

                            }} id="savePost" >Save</button>
                            <button id="cancelPost" onClick={()=> navigate("/")}>Cancel</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </main>


    </>
}