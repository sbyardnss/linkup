import { useContext, useEffect, useState } from "react"
import { MyTeeTime } from "../TeeTime/MyTeeTime"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import { WeatherContext } from "../Weather/WeatherProvider"
import { ScorecardContext } from "./ScorecardContext"
import "./HoleScore.css"
import { HoleScore } from "./HoleScore"
export const Play = () => {
    const { scorecards, matchUserHoleScores, setMatchUserHoleScores, userMatchesForThisMatch, setUserMatchesForThisMatch, activeMatch, setActiveMatch, selectedMatch, setSelectedMatch } = useContext(ScorecardContext)
    const { users, courses, matches, userMatchesWithMatchInfo, activeUserFriends, navigate, sortedOthersUserMatchesThatIHaveNotJoined, sortedOnlyMyUserMatches, currentDateParsed, myJoinedMatchesFromMatches, dateStringBuilder } = useContext(TeeTimeContext)
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
                        myJoinedMatchesFromMatches.map(teeTime => {

                            // const otherUserMatchesForGivenMatch = userMatchesWithMatchInfo.filter(userMatch => {
                            //     return userMatch.matchId === teeTime.matchId
                            // })
                            const teeTimeDateString = dateStringBuilder(teeTime)
                            const teeTimeDateParsed = Date.parse(teeTimeDateString)
                            if (teeTimeDateParsed >= currentDateParsed) {
                                if (next14Dates) {

                                    // const matchingCourse = courses.find(course => course.id === teeTime?.match.courseId)
                                    return <>

                                        <div className="matchSelection" key={teeTime?.id} id={teeTime?.matchId} value={teeTime?.matchId}>
                                            <div className="placeItemsSideBySide">

                                                <div>
                                                    <div className="matchSelectionCourse">
                                                        {teeTime.course.name}
                                                    </div>

                                                    <div>{teeTime.date}</div>
                                                </div>
                                                <div className="matchSelectionOtherPlayers">

                                                    {
                                                        teeTime.golfers.map(golfer => {
                                                            // const matchPlayer = users.find(user => user.id === golfer.id)
                                                            if (golfer.id !== linkUpUserObj.userId) {
                                                                return (
                                                                    <div>{golfer?.full_name}</div>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </div>

                                                <button className="matchSelectionButton" onClick={
                                                    (evt) => {
                                                        // const selectedMatchId = parseInt(evt.target.value)
                                                        // console.log(selectedMatchId)
                                                        setSelectedMatch(teeTime.id)
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