import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllScoreCards, getUserMatchesForThisMatch } from "../ApiManager"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import "./Scorecard.css"
import { ScorecardContext } from "./ScorecardContext"


export const Scorecard = ({ holes, scores }) => {
    const { users, courses, userMatchesWithMatchInfo, activeUserFriends, navigate } = useContext(TeeTimeContext)
    const { userMatchesForThisMatch, matchUserHoleScores } = useContext(ScorecardContext)
    const matchId = useParams()

    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    // console.log(matchUserHoleScores)
    const frontNineTotal = 0;
    const backNineTotal = 0;
    const matchTotal = 0;

    return <>
        <main id="scorecardContainer">

            <div className="table-container">
                {/* <table class="unfixed-table"> */}
                <thead>
                    <tr className="tableHeaderRow">
                        <th>player</th>
                        <th className="holeScore">1</th>
                        <th className="holeScore">2</th>
                        <th className="holeScore">3</th>
                        <th className="holeScore">4</th>
                        <th className="holeScore">5</th>
                        <th className="holeScore">6</th>
                        <th className="holeScore">7</th>
                        <th className="holeScore">8</th>
                        <th className="holeScore">9</th>
                        <th className="holeScore">10</th>
                        <th className="holeScore">11</th>
                        <th className="holeScore">12</th>
                        <th className="holeScore">13</th>
                        <th className="holeScore">14</th>
                        <th className="holeScore">15</th>
                        <th className="holeScore">16</th>
                        <th className="holeScore">17</th>
                        <th className="holeScore">18</th>
                        <th className="frontNineScore">Front 9</th>
                        <th className="backNineScore">Back 9</th>
                        <th className="totalScore">Total</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        userMatchesForThisMatch?.map(userMatch => {
                            const matchingUser = users?.find(user => user.id === userMatch.userId)
                            const userMatchUserHoleScores = matchUserHoleScores?.filter(userHoleScore => userHoleScore.matchUserId === userMatch.id)
                            // console.log(userMatchUserHoleScores)
                            if(userMatchUserHoleScores.length >= 9) {
                                const frontNineArray = userMatchUserHoleScores.filter(holeScore => {
                                    return holeScore.courseHoleId <= 9
                                })
                                console.log(frontNineArray)
                            }
                            return <>
                                <tr className="userRow">
                                    <td>{matchingUser.name}</td>
                                    {
                                        userMatchUserHoleScores?.map(score => {
                                            const emptyCellCompensation = 18 - userMatchUserHoleScores.length
                                            const compensationArray = []
                                            compensationArray.fill()
                                            return <td>{score.strokes}</td>

                                        })
                                    }
                                </tr>
                            </>
                        })
                    }
                </tbody>
                {/* </table> */}
            </div>
        </main >
    </>

}
