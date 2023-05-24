import { useState, useContext } from "react"
import "./Scorecard.css"
import { ScorecardContext } from "./ScorecardContext"


export const Scorecard = ({ profileOrPlayTable, profileOrPlayContainer }) => {
    const { matchUserHoleScores, activeMatch } = useContext(ScorecardContext)
    const [match, setMatch] = useState({})
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    const frontNineHoleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const backNineHoleNumbers = [10, 11, 12, 13, 14, 15, 16, 17, 18]
    if (match) {
        return <>
            <main id={profileOrPlayContainer}>
                <div className={profileOrPlayTable}>
                    <div>
                        <table id="fullScorecardTable">
                            <thead>
                                <tr className="tableHeaderRow">
                                    <th>player</th>
                                    <th className="holeScore"> -1- </th>
                                    <th className="holeScore"> -2- </th>
                                    <th className="holeScore"> -3- </th>
                                    <th className="holeScore"> -4- </th>
                                    <th className="holeScore"> -5- </th>
                                    <th className="holeScore"> -6- </th>
                                    <th className="holeScore"> -7- </th>
                                    <th className="holeScore"> -8- </th>
                                    <th className="holeScore"> -9- </th>
                                    <th className="frontNineScore">Front 9</th>
                                    <th className="holeScore">10 </th>
                                    <th className="holeScore">11 </th>
                                    <th className="holeScore">12 </th>
                                    <th className="holeScore">13 </th>
                                    <th className="holeScore">14 </th>
                                    <th className="holeScore">15 </th>
                                    <th className="holeScore">16 </th>
                                    <th className="holeScore">17 </th>
                                    <th className="holeScore">18 </th>
                                    <th className="backNineScore">Back 9</th>
                                    <th className="totalScore">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    activeMatch.golfers?.map(golferInMatch => {
                                        if (matchUserHoleScores) {
                                            const frontNineArray = matchUserHoleScores.filter(holeScore => {
                                                return golferInMatch.id === holeScore.golfer && holeScore.course_hole <= 9 && holeScore.strokes !== 'DNF'
                                            })
                                            const frontNineScore = () => {
                                                let userScore = 0
                                                frontNineArray.map(score => {
                                                    userScore += parseInt(score?.strokes)
                                                })
                                                return userScore
                                            }
                                            const backNineArray = matchUserHoleScores.filter(holeScore => {
                                                return golferInMatch.id === holeScore.golfer && holeScore.course_hole > 9 && holeScore.strokes !== 'DNF'
                                            })
                                            const backNineScore = () => {
                                                let userScore = 0
                                                backNineArray.map(score => {
                                                    userScore += parseInt(score?.strokes)
                                                })
                                                return userScore
                                            }
                                            const totalScore = frontNineScore() + backNineScore()
                                            return <>
                                                <tr className="userRow">
                                                    <td>{golferInMatch.full_name}</td>
                                                    {
                                                        frontNineHoleNumbers.map(holeNumber => {
                                                            const matchingUserScore = matchUserHoleScores?.find(holeScore => holeScore.course_hole === holeNumber && holeScore.golfer === golferInMatch.id)
                                                            if (matchingUserScore?.strokes === "DNF") {
                                                                return <>
                                                                    <td key={"hole" + holeNumber} className="didNotFinish">{matchingUserScore?.strokes}</td>
                                                                </>
                                                            }
                                                            return <>
                                                                <td key={"hole" + holeNumber} className="holeScore">{matchingUserScore?.strokes}</td>
                                                            </>
                                                        })
                                                    }
                                                    <td>{frontNineScore()}</td>
                                                    {
                                                        backNineHoleNumbers.map(holeNumber => {
                                                            const matchingUserScore = matchUserHoleScores?.find(holeScore => holeScore.course_hole === holeNumber && holeScore.golfer === golferInMatch.id)
                                                            return <>
                                                                <td key={"hole" + holeNumber} className="holeScore">{matchingUserScore?.strokes}</td>
                                                            </>
                                                        })
                                                    }
                                                    <td>{backNineScore()}</td>
                                                    <td>{totalScore}</td>
                                                </tr>
                                            </>
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </main >
        </>
    }
    else {
        return <h2>You didn't score your match!</h2>
    }
}
