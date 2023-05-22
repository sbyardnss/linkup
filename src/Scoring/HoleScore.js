import { useContext, useState, useEffect } from "react"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import { ScorecardContext } from "./ScorecardContext"
import { Scorecard } from "./Scorecard"
import { addUserHoleScore, updateHoleScore } from "../ServerManager"
import "./HoleScore.css"
export const HoleScore = ({ matchId }) => {
    const { matchUserHoleScores, userMatchesForThisMatch, activeMatch, selectedMatch, setSelectedMatch, activeMatchCourse, updateCard, setUpdateCard } = useContext(ScorecardContext)
    const { users } = useContext(TeeTimeContext)
    const [selectedHole, setSelectedHole] = useState(1)
    const [currentHoleData, updateCurrentHoleData] = useState({
        notes: ""
    })
    const [strokes, setStrokes] = useState("")
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    const holeNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    const [userMatchToScoreFor, setUserMatchToScoreFor] = useState(0)
    // const onlyLoggedInUserHoleScores = matchUserHoleScores.filter(holeScore => holeScore.matchUserId === loggedInUserMatch?.id)
    // const currentHoleInfo = onlyLoggedInUserHoleScores.find(holeScore => holeScore.courseHoleId === selectedHole)
    const possibleScoreValuesWithoutMax = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const newHoleScoreObjForAPI = {
        matchUserId: parseInt(userMatchToScoreFor), //currently the initial value is not being set to score for logged in user. we dont want users to have to select themselves initially
        strokes: strokes,
        courseHoleId: parseInt(selectedHole),
        notes: currentHoleData.notes
    }

    const holeScoresForThisHole = () => {
        const holeScoresForThisHole = []
        const holeScoreFinder = userMatchesForThisMatch.map(userMatch => {
            const targetHoleScore = matchUserHoleScores.find(holeScore => holeScore.matchUserId === userMatch.id && holeScore.courseHoleId === selectedHole)
            holeScoresForThisHole.push(targetHoleScore)
        })
        return holeScoresForThisHole
    }
    

    if (activeMatch) {
        return <>
            <main id="holeScoreContainer">
                <div className="holeScoreArticle">

                    <section id="holeScoreHeader">
                        <div className="matchInfo">
                            <h3>{activeMatch.course.name}</h3>
                        </div>
                        <div className="holeSelectExitMatch">
                            <select value={selectedHole} className="selectHole" onChange={
                                (evt) => {
                                    if (evt.target.value !== "") {
                                        setSelectedHole(evt.target.value)
                                        const copy = { ...currentHoleData }
                                        setStrokes("")
                                        copy.notes = ""
                                        updateCurrentHoleData(copy)
                                    }
                                }
                            }>
                                <option className="selectHoleOption" value={0} >select hole</option>
                                {
                                    holeNumbers.map(hole => {
                                        return <option className="selectHoleOption" value={hole}>{hole}</option>
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
                                        const alreadyScoredThisUserForThisHole = matchUserHoleScores.find(holeScore => holeScore.courseHoleId === parseInt(selectedHole) && holeScore.matchUserId === userMatchToScoreFor)
                                        // console.log(alreadyScoredThisUserForThisHole)
                                        if (alreadyScoredThisUserForThisHole) {

                                            if (window.confirm("You already scored this user. Would you like to update it?")) {
                                                updateHoleScore(newHoleScoreObjForAPI, alreadyScoredThisUserForThisHole.id)
                                                currentHoleData.notes = ""
                                                setStrokes("")
                                                setUpdateCard(!updateCard)
                                            }
                                        }
                                        else {
                                            addUserHoleScore(newHoleScoreObjForAPI)
                                            currentHoleData.notes = ""
                                            setStrokes("")
                                            setUpdateCard(!updateCard)
                                        }
                                    }
                                }
                            }>Submit</button>
                            <button className="finishHoleButton" onClick={
                                () => {
                                    const strokesForThisHolePerUser = holeScoresForThisHole()

                                    {
                                        userMatchesForThisMatch.map(userMatch => {
                                            let didNotFinishArray = []
                                            const userMatchStrokes = strokesForThisHolePerUser.find(holeScore => holeScore?.matchUserId === userMatch.id)
                                            if (userMatchStrokes === undefined) {
                                                const unfinishedHoleScoreForAPI = {
                                                    matchUserId: userMatch.id, //currently the initial value is not being set to score for logged in user. we dont want users to have to select themselves initially
                                                    strokes: "DNF",
                                                    courseHoleId: parseInt(selectedHole),
                                                    notes: "did not finish"
                                                }
                                                addUserHoleScore(unfinishedHoleScoreForAPI)


                                            }
                                            else {
                                                return undefined
                                            }
                                        })
                                    }

                                    setUpdateCard(!updateCard)

                                    setUserMatchToScoreFor(0)
                                    currentHoleData.notes = ""
                                    setStrokes("")
                                    setSelectedHole(parseInt(selectedHole) + 1)
                                }
                            }>Finish Hole</button>
                        </div>
                        <h2>strokes: {strokes}</h2>
                        <div className="scoringButtonsContainer">
                            {
                                possibleScoreValuesWithoutMax.map(score => {
                                    if (strokes) {
                                        if (score === parseInt(strokes)) {
                                            return <button className="scoringButtonSelected" value={score} onClick={
                                                (evt) => {
                                                    setStrokes(evt.target.value.toString())
                                                }
                                            }>{score}</button>
                                        }
                                        else {
                                            return <button className="scoringButton" value={score} onClick={
                                                (evt) => {
                                                    setStrokes(evt.target.value)
                                                }
                                            }>{score}</button>
                                        }
                                    }
                                    else {
                                        return <button className="scoringButton" value={score} onClick={
                                            (evt) => {

                                                setStrokes(evt.target.value)
                                            }
                                        }>{score}</button>
                                    }
                                })
                            }
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
                            activeMatch.golfers.map(golfer => {
                                // const matchingUser = users.find(user => user.id === userMatch.userId)
                                if (parseInt(userMatchToScoreFor) === parseInt(golfer.id)) {
                                    return <button className="activeUserButton" value={golfer.id} >{golfer.full_name}</button>
                                }
                                else {
                                    return <button className="inactiveUserButton" value={golfer.id} onClick={
                                        (evt) => {
                                            setUserMatchToScoreFor(parseInt(evt.target.value))
                                        }
                                    }>{golfer.full_name}</button>
                                }
                            })
                        }
                    </div>
                </div>
                <section className="scorecardSection">

                    <Scorecard
                        profileOrPlayTable={"table-container"}
                        profileOrPlayContainer={"scorecardContainer"}
                        activeMatch={activeMatch}
                    />
                </section>
            </main>
        </>
        
    }
}