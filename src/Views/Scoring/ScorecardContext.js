import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllMatchUserHoleScores, getAllScoreCards, getUserMatchesForThisMatch, getAllMatches } from "../../ApiManager";
import { TeeTimeContext } from "../../TeeTime/TeeTimeProvider";

export const ScorecardContext = createContext()

export const ScorecardProvider = (props) => {
    const [scorecards, setScorecards] = useState([])
    const [matchUserHoleScores, setMatchUserHoleScores] = useState([])
    const [allMatches, setAllMatches] = useState([])
    const [userMatchesForThisMatch, setUserMatchesForThisMatch] = useState([])
    const [activeMatch, setActiveMatch] = useState({})
    const [activeMatchCourse, setActiveMatchCourse] = useState({})
    const [selectedMatch, setSelectedMatch] = useState(0)
    const [matchConfirmed, setMatchConfirmed] = useState(false)
    const { courses } = useContext(TeeTimeContext)


    useEffect(
        () => {
            getUserMatchesForThisMatch(selectedMatch)
                .then(
                    (data) => {
                        setUserMatchesForThisMatch(data)
                    }
                )
        },
        [selectedMatch]
    )
    useEffect(
        () => {
            getAllMatches()
            .then(
                (data) => {
                        console.log(data)
                        setAllMatches(data)
                    }
                )
        },
        [matchConfirmed]
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
    useEffect(
        () => {
            const matchObj = allMatches.find(match => match.id === selectedMatch)
            setActiveMatch(matchObj)
        },
        [selectedMatch, allMatches]
    )
    useEffect(
        () => {
            const matchingCourse = courses.find(course => course.id === activeMatch?.courseId)
            setActiveMatchCourse(matchingCourse)
        },
        [activeMatch]
    )
    // console.log(userMatchesForThisMatch)


    return (
        <ScorecardContext.Provider value={{
            matchUserHoleScores, setMatchUserHoleScores, userMatchesForThisMatch, setUserMatchesForThisMatch, activeMatch, setActiveMatch,
            selectedMatch, setSelectedMatch, matchConfirmed, setMatchConfirmed, activeMatchCourse
        }}>
            {props.children}
        </ScorecardContext.Provider>

    )
}