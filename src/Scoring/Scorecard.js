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

    const frontNineHoleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const backNineHoleNumbers = [10, 11, 12, 13, 14, 15, 16, 17, 18]

    return <>
        <main id="scorecardContainer">

            <div className="table-container">
                <div>
                    <table id="fullScorecardTable">
                        <thead>
                            <tr className="tableHeaderRow">
                                <th>player</th>
                                {/* <th className="frontNineScore">Front 9</th>
                                <th className="backNineScore">Back 9</th>
                                <th className="totalScore">Total</th> */}
                                <th className="holeScore" width="100px"> -1- </th>
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
                                userMatchesForThisMatch?.map(userMatch => {
                                    const matchingUser = users?.find(user => user.id === userMatch.userId)
                                    const userMatchUserHoleScores = matchUserHoleScores?.filter(userHoleScore => userHoleScore.matchUserId === userMatch.id)

                                    const frontNineArray = userMatchUserHoleScores.filter(holeScore => {
                                        return holeScore.courseHoleId <= 9
                                    })

                                    const frontNineScore = () => {
                                        let userScore = 0
                                        frontNineArray.map(score => {
                                            userScore += score?.strokes
                                        })

                                        return userScore
                                    }
                                    const backNineArray = userMatchUserHoleScores.filter(holeScore => {
                                        return holeScore.courseHoleId > 9
                                    })
                                    const backNineScore = () => {
                                        let userScore = 0
                                        backNineArray.map(score => {
                                            userScore += score?.strokes
                                        })

                                        return userScore
                                    }
                                    const totalScore = frontNineScore() + backNineScore()
                                    return <>
                                        <tr className="userRow">
                                            <td>{matchingUser.name}</td>
                                            {
                                                frontNineHoleNumbers.map(holeNumber => {
                                                    const matchingUserScore = userMatchUserHoleScores?.find(holeScore => holeScore.courseHoleId === holeNumber)
                                                    return <>
                                                        <td key={"hole" + holeNumber} className="holeScore">{matchingUserScore?.strokes}</td>
                                                    </>
                                                })
                                            }
                                            <td>{frontNineScore()}</td>
                                            {
                                                backNineHoleNumbers.map(holeNumber => {
                                                    const matchingUserScore = userMatchUserHoleScores?.find(holeScore => holeScore.courseHoleId === holeNumber)
                                                    return <>
                                                        <td key={"hole" + holeNumber} className="holeScore">{matchingUserScore?.strokes}</td>
                                                    </>
                                                })
                                            }
                                            <td>{backNineScore()}</td>
                                            <td>{totalScore}</td>
{/*                                             
                                            {
                                                frontNineArray?.map(score => {
                                                    if (score.strokes === 0) {
                                                        return <td className="didNotFinish">{score.strokes}</td>
                                                        
                                                    }
                                                    else {

                                                        return <td>{score.strokes}</td>
                                                    }

                                                })
                                            }
                                            {
                                                backNineArray?.map(score => {

                                                    return <td>{score.strokes}</td>

                                                })
                                            } */}

                                        </tr>

                                    </>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                
            </div>
        </main >
    </>

}
