import { useContext, useState, useEffect } from "react"
import { MyTeeTime } from "../TeeTime/MyTeeTime"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import { WeatherContext } from "../Weather/WeatherProvider"
import { ScorecardContext } from "./ScorecardContext"
import { Scorecard } from "./Scorecard"
import { addUserHoleScore, setMatchToConfirmed } from "../ApiManager"
import "./HoleScore.css"
export const HoleScore = ({ matchId }) => {
    const { matchUserHoleScores, userMatchesForThisMatch, activeMatch, selectedMatch, setSelectedMatch, setMatchConfirmed, activeMatchCourse, updateCard, setUpdateCard, loggedInUserMatch } = useContext(ScorecardContext)
    const { users, courses, matches, userMatchesWithMatchInfo, activeUserFriends, navigate, sortedOthersUserMatchesThatIHaveNotJoined, sortedOnlyMyUserMatches, currentDateParsed } = useContext(TeeTimeContext)
    const [selectedHole, setSelectedHole] = useState(1)
    const [currentHoleData, updateCurrentHoleData] = useState({
        strokes: 0,
        notes: ""
    })
    const [strokes, setStrokes] = useState(0)
    // console.log(matchId)
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    const holeNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    const [userMatchToScoreFor, setUserMatchToScoreFor] = useState(0)

    const onlyLoggedInUserHoleScores = matchUserHoleScores.filter(holeScore => holeScore.matchUserId === loggedInUserMatch?.id)
    const currentHoleInfo = onlyLoggedInUserHoleScores.find(holeScore => holeScore.courseHoleId === selectedHole)

    const possibleScoreValuesWithoutMax = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    // useEffect(
    //     () => {
    //             const userMatchNumberforInitialScoring = loggedInUserMatch?.id//this useEffect is not setting the initial value to what i want yet
    //             setUserMatchToScoreFor(userMatchNumberforInitialScoring)
    //     },
    //     [selectedMatch, activeMatch]
    // )

    const newHoleScoreObjForAPI = {
        matchUserId: parseInt(userMatchToScoreFor), //currently the initial value is not being set to score for logged in user. we dont want users to have to select themselves initially
        strokes: parseInt(strokes),
        courseHoleId: parseInt(selectedHole),
        notes: currentHoleData.notes
    }
    if (activeMatch) {

        if (activeMatch.confirmed === true) {
            return <>
                <main id="holeScoreContainer">
                    <div className="holeScoreArticle">

                        <section id="holeScoreHeader">
                            <div className="matchInfo">
                                <h3>{activeMatchCourse?.name}</h3>
                            </div>


                            <div className="holeSelectExitMatch">
                                <select className="selectHole" onChange={
                                    (evt) => {
                                        setSelectedHole(evt.target.value)

                                        const copy = { ...currentHoleData }
                                        setStrokes(0)
                                        copy.notes = ""
                                        updateCurrentHoleData(copy)

                                    }
                                }>
                                    <option value={0}>select hole</option>
                                    {
                                        holeNumbers.map(hole => {
                                            return <option value={hole}>{hole}</option>
                                        })
                                    }
                                </select>


                                <button className="exitMatchButton" onClick={
                                    () => {
                                        setSelectedMatch(0)
                                    }
                                }>Exit match</button>
                            </div>

                        </section>

                        <section className="scoringSection">
                            <div className="holeInfoHeader">
                                <h2>Hole {selectedHole}</h2>
                                <button className="scoringSubmitButton" onClick={
                                    () => {
                                        if (newHoleScoreObjForAPI.matchUserId !== 0) {

                                            addUserHoleScore(newHoleScoreObjForAPI)
                                            currentHoleData.notes = ""
                                            // currentHoleData.strokes = 0
                                            setStrokes(0)
                                            setUpdateCard(!updateCard)
                                        }

                                    }
                                }>Submit</button>
                                <button className="finishHoleButton" onClick={
                                    () => {
                                        if (newHoleScoreObjForAPI.matchUserId !== 0) {

                                            setSelectedHole(selectedHole + 1)
                                        }

                                    }
                                }>Finish Hole</button>
                            </div>
                            {/* strokes: {currentHoleData.strokes} */}
                            <h4>strokes: {strokes}</h4>

                            <div className="scoringButtonsContainer">


                                {
                                    possibleScoreValuesWithoutMax.map(score => {
                                        if (strokes) {
                                            if (score === parseInt(strokes)) {

                                                return <button className="scoringButtonSelected" value={score} onClick={
                                                    (evt) => {
                                                        // const copy = { ...currentHoleData }
                                                        // copy.strokes = parseInt(evt.target.value)
                                                        // updateCurrentHoleData(copy)
                                                        setStrokes(evt.target.value)
                                                    }
                                                }>{score}</button>

                                            }
                                            else {
                                                return <button className="scoringButton" value={score} onClick={
                                                    (evt) => {
                                                        // const copy = { ...currentHoleData }
                                                        // copy.strokes = parseInt(evt.target.value)
                                                        // updateCurrentHoleData(copy)
                                                        setStrokes(evt.target.value)
                                                    }
                                                }>{score}</button>

                                            }

                                        }
                                        else {
                                            return <button className="scoringButton" value={score} onClick={
                                                (evt) => {
                                                    // const copy = { ...currentHoleData }
                                                    // copy.strokes = parseInt(evt.target.value)
                                                    // updateCurrentHoleData(copy)
                                                    setStrokes(evt.target.value)
                                                }
                                            }>{score}</button>
                                        }
                                    })
                                }
                                {/* <button className="scoringButton" value={10} onClick={
                                    (evt) => {
                                        // const copy = { ...currentHoleData }
                                        // copy.strokes = parseInt(evt.target.value)
                                        // updateCurrentHoleData(copy)
                                        setStrokes(parseInt(evt.target.value))
                                    }
                                }>MAX</button> */}
                            </div>
                            <input className="holeMsgInput" type="text" value={currentHoleData.notes} placeholder="any notes?" onChange={
                                (evt) => {
                                    const copy = { ...currentHoleData }
                                    copy.notes = evt.target.value
                                    updateCurrentHoleData(copy)
                                }
                            }></input>

                        </section>
                        <div className="userButtonsContainer">
                            {
                                userMatchesForThisMatch.map(userMatch => {
                                    const matchingUser = users.find(user => user.id === userMatch.userId)
                                    // return <option value={userMatch.id}>{matchingUser.name}</option>
                                    if (parseInt(userMatchToScoreFor) === parseInt(userMatch.id)) {
                                        return <button className="activeUserButton" value={userMatch.id} >{matchingUser.name}</button>

                                    }
                                    else {
                                        return <button className="inactiveUserButton" value={userMatch.id} onClick={
                                            (evt) => {

                                                setUserMatchToScoreFor(parseInt(evt.target.value))
                                                // setUserMatchToScoreFor(userMatch.id)
                                            }
                                        }>{matchingUser.name}</button>
                                    }



                                })
                            }

                        </div>
                    </div>

                    <section className="scorecardSection">
                        <div>
                            {/* <h2>Scorecard</h2> */}
                            {/* <select id="selectUserToScoreFor" onChange={
                                (evt) => {
                                    setUserMatchToScoreFor(evt.target.value)
                                }
                            }>
                                <option value="0">select user</option> */}
                            {/* </select> */}
                        </div>
                        <Scorecard id="scorecardItem"
                            holes={holeNumbers}
                        />
                    </section>

                </main>
            </>
        }
        else {
            return <>
                <main id="holeScoreContainer">
                    <section id="holeScoreHeader">
                        <div className="matchInfo">
                            <div>{activeMatchCourse?.name}</div>
                        </div>
                        <div>
                            <button onClick={
                                () => {
                                    // {
                                    //     userMatchesForThisMatch.map(userMatch => {
                                    //         const userHoleObjForAPI = {
                                    //             matchUserId: userMatch.id,
                                    //             strokes: 0,
                                    //             courseHoleId: 1,
                                    //             notes: ""
                                    //         }
                                    //         addUserHoleScore(userHoleObjForAPI)
                                    //     })
                                    // }
                                    const copy = { ...activeMatch }
                                    copy.confirmed = true
                                    setMatchToConfirmed(copy, activeMatch.id)
                                        .then(() => setMatchConfirmed(true))
                                }
                            }>Start Match</button>
                            <button onClick={
                                () => {
                                    setSelectedMatch(0)
                                }
                            }>cancel</button>
                        </div>

                    </section>
                </main>
            </>

        }
    }
}