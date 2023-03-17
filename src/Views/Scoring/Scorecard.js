import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllScoreCards, getUserMatchesForThisMatch } from "../../ApiManager"
import { TeeTimeContext } from "../../TeeTime/TeeTimeProvider"
import "./Scorecard.css"
import { ScorecardContext } from "./ScorecardContext"


export const Scorecard = ({holes, scores }) => {
    const { users, courses, userMatchesWithMatchInfo, activeUserFriends, navigate } = useContext(TeeTimeContext)
    const { userMatchesForThisMatch } = useContext(ScorecardContext)
    const [scorecards, setScorecards] = useState([])
    const [allMatchScoreCards, setAllMatchScoreCards] = useState([])
    const [scorecardsForThisMatch, setScorecardsForThisMatch] = useState([])
    const matchId = useParams()

    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    

    return <>
        <main id="scorecardContainer">
            {/* <h2>scorecards</h2> */}
            <table className="fullMatchScorecard">
                <tbody className="tableBody">
                    <tr id="tableHead">
                        <th className="playerHead">player</th>
                        <th className="holeScore">1</th>
                        <th className="holeScore">2</th>
                        <th className="holeScore">3</th>
                        <th className="holeScore">4</th>
                        <th className="holeScore">5</th>
                        <th className="holeScore">6</th>
                        <th className="holeScore">7</th>
                        <th className="holeScore">8</th>
                        <th className="holeScore">9</th>
                        <th className="frontNineScore">Front 9</th>
                        <th className="holeScore">10</th>
                        <th className="holeScore">11</th>
                        <th className="holeScore">12</th>
                        <th className="holeScore">13</th>
                        <th className="holeScore">14</th>
                        <th className="holeScore">15</th>
                        <th className="holeScore">16</th>
                        <th className="holeScore">17</th>
                        <th className="holeScore">18</th>
                        <th className="backNineScore">Back 9</th>
                        <th className="totalScore">Total</th>



                    </tr>

                </tbody>
                {
                    userMatchesForThisMatch?.map(userMatch => {
                        const matchingUser = users?.find(user => user.id === userMatch.userId)

                        return <>
                            <tbody key={userMatch.userId}>
                            <tr>

                                <td>{matchingUser.name}</td>
                            </tr>
                            </tbody>
                        </>
                    })
                }
            </table>
        </main>
    </>
}