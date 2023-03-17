import { useContext, useState, useEffect } from "react"
import { MyTeeTime } from "../../TeeTime/MyTeeTime"
import { TeeTimeContext } from "../../TeeTime/TeeTimeProvider"
import { WeatherContext } from "../../Weather/WeatherProvider"
import { ScorecardContext } from "./ScorecardContext"
import { Scorecard } from "./Scorecard"
import { addUserHoleScore, setMatchToConfirmed } from "../../ApiManager"
import "./HoleScore.css"
export const HoleScore = () => {
    const { scorecards, matchUserHoleScores, setMatchUserHoleScores, userMatchesForThisMatch, setUserMatchesForThisMatch, activeMatch, setActiveMatch, selectedMatch, setSelectedMatch, matchConfirmed, setMatchConfirmed, activeMatchCourse } = useContext(ScorecardContext)
    const { users, courses, matches, userMatchesWithMatchInfo, activeUserFriends, navigate, sortedOthersUserMatchesThatIHaveNotJoined, sortedOnlyMyUserMatches, currentDateParsed } = useContext(TeeTimeContext)
    const [selectedHole, setSelectedHole] = useState(1)

    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    const holeNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    const currentHoleInfo = matchUserHoleScores?.find(holeScore => holeScore.coursHoleId === selectedHole)
    // console.log(currentHoleInfo)
    // console.log(activeMatch)

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
                                }
                            }>
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
                            <div>{currentHoleInfo?.coursHoleId}</div>
                        </section>
                    </article>

                    <section className="scorecardSection">
                        <h2>Scorecard</h2>
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
                                    //             matchUserId: userMatch.userId,
                                    //             strokes: 0,
                                    //             courseHoleId: 1,
                                    //             notes: ""
                                    //         }
                                    //         addUserHoleScore(userHoleObjForAPI)

                                    //     })
                                    // }
                                    const copy = {...activeMatch}
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