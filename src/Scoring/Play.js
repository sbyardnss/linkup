import { useContext, useEffect, useState } from "react"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import { WeatherContext } from "../Weather/WeatherProvider"
import { ScorecardContext } from "./ScorecardContext"
import "./HoleScore.css"
import { HoleScore } from "./HoleScore"
export const Play = () => {
    const { selectedMatch, setSelectedMatch } = useContext(ScorecardContext)
    const { currentDateParsed, myJoinedMatchesFromMatches, dateStringBuilder } = useContext(TeeTimeContext)
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
                            const teeTimeDateString = dateStringBuilder(teeTime)
                            const teeTimeDateParsed = Date.parse(teeTimeDateString)
                            if (teeTimeDateParsed >= currentDateParsed) {
                                if (next14Dates) {
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