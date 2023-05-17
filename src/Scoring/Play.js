import { useContext, useEffect, useState } from "react"
import { MyTeeTime } from "../TeeTime/MyTeeTime"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import { WeatherContext } from "../Weather/WeatherProvider"
import { ScorecardContext } from "./ScorecardContext"
import "./HoleScore.css"
import { HoleScore } from "./HoleScore"
export const Play = () => {
    const { scorecards, matchUserHoleScores, setMatchUserHoleScores, userMatchesForThisMatch, setUserMatchesForThisMatch, activeMatch, setActiveMatch, selectedMatch, setSelectedMatch } = useContext(ScorecardContext)
    const { users, courses, matches, userMatchesWithMatchInfo, activeUserFriends, navigate, sortedOthersUserMatchesThatIHaveNotJoined, sortedOnlyMyUserMatches, currentDateParsed } = useContext(TeeTimeContext)
    const { next14Dates } = useContext(WeatherContext)
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    useEffect(
        () => {
            setSelectedMatch(0)
        },
        []
    )
    if (!selectedMatch) {

        return <>
            <main id="holeScoreContainer">
                <section className="matchSelect">
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

                                        <div className="matchSelection" key={teeTime?.id} id={teeTime?.matchId} value={teeTime?.matchId}>
                                            <div className="placeItemsSideBySide">

                                                <div>
                                                    <div className="matchSelectionCourse">
                                                        {matchingCourse?.name}
                                                    </div>

                                                    <div>{teeTime.match.date}</div>
                                                </div>
                                                <div className="matchSelectionOtherPlayers">

                                                    {
                                                        otherUserMatchesForGivenMatch.map(userMatch => {
                                                            const matchPlayer = users.find(user => user.id === userMatch.userId)
                                                            if (matchPlayer.id !== linkUpUserObj.id) {
                                                                return (
                                                                    <div>{matchPlayer?.name}</div>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </div>

                                                <button className="matchSelectionButton" onClick={
                                                    (evt) => {
                                                        // const selectedMatchId = parseInt(evt.target.value)
                                                        // console.log(selectedMatchId)
                                                        setSelectedMatch(teeTime?.matchId)
                                                    }

                                                }>Select Match</button>
                                            </div >
                                        </div>
                                    </>
                                }
                            }
                        })
                    }
                </section>

            </main>
        </>
    }
    else {
        return <HoleScore
            matchId={selectedMatch}
            setMatch={setSelectedMatch} />
    }
}