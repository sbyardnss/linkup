import { useContext, useState, useEffect } from "react"
import { MyTeeTime } from "../../TeeTime/MyTeeTime"
import { TeeTimeContext } from "../../TeeTime/TeeTimeProvider"
import { WeatherContext } from "../../Weather/WeatherProvider"
import { ScorecardContext } from "./ScorecardContext"
import { Scorecard } from "./Scorecard"
import { addUserHoleScore, setMatchToConfirmed } from "../../ApiManager"
import "./HoleScore.css"
export const HoleScore = ({ matchId }) => {
    const { matchUserHoleScores, userMatchesForThisMatch, activeMatch, selectedMatch, setSelectedMatch, setMatchConfirmed, activeMatchCourse, updateCard, setUpdateCard, loggedInUserMatch } = useContext(ScorecardContext)
    const { users, courses, matches, userMatchesWithMatchInfo, activeUserFriends, navigate, sortedOthersUserMatchesThatIHaveNotJoined, sortedOnlyMyUserMatches, currentDateParsed } = useContext(TeeTimeContext)
    const [selectedHole, setSelectedHole] = useState(1)
    const [currentHoleData, updateCurrentHoleData] = useState({
        strokes: 0,
        notes: ""
    })
    // console.log(matchId)
    const localLinkUpUser = localStorage.getItem("linkUp_user") 
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    const holeNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    const [userMatchToScoreFor, setUserMatchToScoreFor] = useState(0)
 
    const onlyLoggedInUserHoleScores = matchUserHoleScores.filter(holeScore => holeScore.matchUserId === loggedInUserMatch?.id)
    const currentHoleInfo = onlyLoggedInUserHoleScores.find(holeScore => holeScore.courseHoleId === selectedHole)

    const possibleScoreValuesWithoutMax = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    // useEffect(
    //     () => {
    //             const userMatchNumberforInitialScoring = loggedInUserMatch?.id//this useEffect is not setting the initial value to what i want yet
    //             setUserMatchToScoreFor(userMatchNumberforInitialScoring)
    //     },
    //     [selectedMatch, activeMatch]
    // )

    const newHoleScoreObjForAPI = {
        matchUserId: parseInt(userMatchToScoreFor), //currently the initial value is not being set to score for logged in user. we dont want users to have to select themselves initially
        strokes: currentHoleData.strokes,
        courseHoleId: selectedHole,
        notes: currentHoleData.notes
    }
    if (activeMatch) {

        if (activeMatch.confirmed === true) {

            return <>
                <main id="holeScoreContainer">
                    <section id="holeScoreHeader">
                        <div className="matchInfo">
                            <div>{activeMatchCourse?.name}</div>
                        </div>
                        <div >
                            <select className="selectHole" onChange={
                                (evt) => {
                                    setSelectedHole(evt.target.value)

                                    const copy = { ...currentHoleData }
                                    copy.strokes = 0
                                    copy.notes = ""
                                    updateCurrentHoleData(copy)

                                }
                            }>
                                <option value={0}>need to go back?</option>
                                {
                                    holeNumbers.map(hole => {
                                        return <option value={hole}>{hole}</option>
                                    })
                                }
                            </select>

                        </div>

                        <button className="exitMatchButton" onClick={
                            () => {
                                setSelectedMatch(0)
                            }
                        }>Exit match</button>
                    </section>

                    <article className="holeScoreArticle">
                        <section>
                            <div className="holeInfoHeader">
                                <h2>Hole {selectedHole}</h2>
                                <button onClick={
                                    () => {
                                        addUserHoleScore(newHoleScoreObjForAPI)
                                        setSelectedHole(selectedHole + 1)

                                        currentHoleData.notes = ""
                                        currentHoleData.strokes = 0
                                        setUpdateCard(!updateCard)

                                    }
                                }>Submit</button>
                            </div>
                            strokes: {currentHoleData.strokes}
                            <div className="scoringButtonsContainer">


                                {
                                    possibleScoreValuesWithoutMax.map(score => {
                                        return <button className="scoringButton" value={score} onClick={
                                            (evt) => {
                                                const copy = { ...currentHoleData }
                                                copy.strokes = parseInt(evt.target.value)
                                                updateCurrentHoleData(copy)
                                            }
                                        }>{score}</button>
                                    })
                                }
                                <button className="scoringButton" value={10} onClick={
                                    (evt) => {
                                        const copy = { ...currentHoleData }
                                        copy.strokes = parseInt(evt.target.value)
                                        updateCurrentHoleData(copy)
                                    }
                                }>MAX</button>
                            </div>
                            <input type="text" value={currentHoleData.notes} placeholder="any notes?" onChange={
                                (evt) => {
                                    const copy = { ...currentHoleData }
                                    copy.notes = evt.target.value
                                    updateCurrentHoleData(copy)
                                }
                            }></input>

                        </section>
                    </article>

                    <section className="scorecardSection">
                        <div>
                            <h2>Scorecard</h2>
                            {/* <select id="selectUserToScoreFor" onChange={
                                (evt) => {
                                    setUserMatchToScoreFor(evt.target.value)
                                }
                            }>
                                <option value="0">select user</option> */}
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
                                                console.log(evt.target.value)
                                                console.log(userMatchToScoreFor)
                                                setUserMatchToScoreFor(parseInt(evt.target.value))
                                                // setUserMatchToScoreFor(userMatch.id)
                                            }
                                        }>{matchingUser.name}</button> 
                                    }



                                })
                            }
                            {/* </select> */}
                        </div>
                        <Scorecard
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