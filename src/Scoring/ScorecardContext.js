import { useState, useEffect, createContext, useContext } from "react";
import { getAllMatches, getHoleScoresForMatch, retrieveMatch } from "../ServerManager";
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider";

export const ScorecardContext = createContext()

export const ScorecardProvider = (props) => {
    const [matchUserHoleScores, setMatchUserHoleScores] = useState([])
    const [allMatches, setAllMatches] = useState([])
    const [userMatchesForThisMatch, setUserMatchesForThisMatch] = useState([])
    const [activeMatch, setActiveMatch] = useState({})
    const [selectedMatch, setSelectedMatch] = useState(0)
    const [matchConfirmed, setMatchConfirmed] = useState(false)
    const [updateCard, setUpdateCard] = useState(false)
    const localLinkUpUser = localStorage.getItem("linkUp_user") 
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    useEffect(
        () => {
            getAllMatches()
            .then(
                (data) => {
                        setAllMatches(data)
                    }
                )
        },
        [matchConfirmed]
    )
    useEffect(
        () => {
            if (selectedMatch !== 0) {
                getHoleScoresForMatch(selectedMatch)
                .then(data => setMatchUserHoleScores(data))
            }
        },[selectedMatch]
    )
    useEffect(
        () => {
            if (selectedMatch !== 0) {
                retrieveMatch(selectedMatch)
                .then(data => setActiveMatch(data))
            }
        },
        [selectedMatch, allMatches]
    )
    return (
        <ScorecardContext.Provider value={{
            matchUserHoleScores, setMatchUserHoleScores, activeMatch, setActiveMatch, selectedMatch, setSelectedMatch
        }}>
            {props.children}
        </ScorecardContext.Provider>
    )
}

