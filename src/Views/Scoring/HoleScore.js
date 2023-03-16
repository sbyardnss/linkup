import { useContext } from "react"
import { MyTeeTime } from "../../TeeTime/MyTeeTime"
import { TeeTimeContext } from "../../TeeTime/TeeTimeProvider"
import { WeatherContext } from "../../Weather/WeatherProvider"
import { ScorecardContext } from "./ScorecardContext"
import "./HoleScore.css"
export const HoleScore = () => {
    const { scorecards, matchUserHoleScores, setMatchUserHoleScores, userMatchesForThisMatch, setUserMatchesForThisMatch, activeMatch, setActiveMatch } = useContext(ScorecardContext)
    const { users, courses, matches, userMatchesWithMatchInfo, activeUserFriends, navigate, sortedOthersUserMatchesThatIHaveNotJoined, sortedOnlyMyUserMatches, currentDateParsed } = useContext(TeeTimeContext)
    const { next14Dates } = useContext(WeatherContext)
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)

    return <>
        <main id="holeScoreContainer">
            <select id="selectMatch">
                <option key="0" value="0">Which Match are you playing?</option>
                {
                    sortedOnlyMyUserMatches.map(teeTime => {

                        const otherUserMatchesForGivenMatch = userMatchesWithMatchInfo.filter(userMatch => {
                            return userMatch.matchId === teeTime.matchId
                        })

                        //string values for teeTime date
                        const [month, day, year] = teeTime?.match?.date.split("/")

                        //numeric values for teeTime date
                        const intYear = parseInt(year)
                        const intMonth = parseInt(month)
                        const intDay = parseInt(day)
                        const teeTimeDateString = `${intMonth}-${intDay}-${intYear}`
                        const teeTimeDateParsed = Date.parse(teeTimeDateString)
                        if (teeTimeDateParsed >= currentDateParsed) {
                            if (next14Dates) {

                                const matchingCourse = courses.find(course => course.id === teeTime?.match.courseId)
                                return <>
                                    <option key={teeTime.id} value={teeTime.id}>
                                        {matchingCourse.name} - with:
                                        <ul>
                                            {
                                                otherUserMatchesForGivenMatch.map(userMatch => {
                                                    const matchPlayer = users.find(user => user.id === userMatch.userId)
                                                    if (matchPlayer.id !== linkUpUserObj.id) {
                                                        return <>
                                                            <li>{" " + matchPlayer.name + "     "}</li>

                                                        </>

                                                    }
                                                })
                                            }

                                        </ul>
                                    </option>
                                </>
                            }
                        }
                    })
                }

            </select>

        </main>
    </>
}