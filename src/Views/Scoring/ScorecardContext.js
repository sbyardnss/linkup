import { useState, useEffect, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllMatchUserHoleScores, getAllScoreCards, getUserMatchesForThisMatch } from "../../ApiManager";

export const ScorecardContext = createContext()

export const ScorecardProvider = (props) => {
    const [scorecards, setScorecards] = useState([])
    const [matchUserHoleScores, setMatchUserHoleScores] = useState([])
    const [userMatchesForThisMatch, setUserMatchesForThisMatch] = useState([])
    const [activeMatch, setActiveMatch] = useState([])


    const matchId = useParams()

    useEffect(
        () => {
            getUserMatchesForThisMatch(matchId.scorecardId)
                .then(
                    (data) => {
                        setUserMatchesForThisMatch(data)
                    }
                )
        },
        []
    )
    useEffect(
        () => {
            getAllScoreCards()
                .then(
                    (data) => {
                        setScorecards(data)
                    }
                )
        },
        []
    )
    useEffect(
        () => {
            getAllMatchUserHoleScores()
            .then(
                (data) => {
                    setMatchUserHoleScores(data)
                }
            )
        },
        []
    )


    return (
        <ScorecardContext.Provider value={{
            scorecards, matchUserHoleScores, setMatchUserHoleScores, userMatchesForThisMatch, setUserMatchesForThisMatch, activeMatch, setActiveMatch
        }}>
            {props.children}
        </ScorecardContext.Provider>

    )
}