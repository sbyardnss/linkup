import { useContext, useState } from "react"
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

    if (!selectedMatch) {

        return <>
            <main id="holeScoreContainer">
                {/* <select id="matchSelectorDropdown" onChange={
                    (evt) => {
                        const selectedMatchId = parseInt(evt.target.value)
                        // console.log(selectedMatchId)
                        setSelectedMatch(selectedMatchId)
                        // console.log(selectedMatchId)
                    }
                }>
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
                                        <option key={teeTime?.id} id={teeTime?.matchId} value={teeTime?.matchId}>
                                            {matchingCourse.name}
                                            --
                                            {
                                                otherUserMatchesForGivenMatch.map(userMatch => {
                                                    const matchPlayer = users.find(user => user.id === userMatch.userId)
                                                    if (matchPlayer.id !== linkUpUserObj.id) {
                                                        return (
                                                            " " + matchPlayer?.name + "     "
                                                        )
                                                    }
                                                })
                                            }
                                            --  {teeTime.match.date}

                                        </option>
                                    </>
                                }
                            }
                        })
                    }

                </select> */}
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
                                    
                                                    {matchingCourse.name}

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
                                                    <div>{teeTime.match.date}</div>
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