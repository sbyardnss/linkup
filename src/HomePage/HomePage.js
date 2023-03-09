import { useEffect, useState } from "react"
import { getAllCourseHoles, getAllCourses, getAllMatches, getAllMatchUserHoleScores, getAllMatchUsers, getAllUsers } from "../ApiManager"


export const HomePage = () => {
    const [users, setUsers] = useState([])
    const [courses, setCourses] = useState([])
    const [courseHoles, setCourseHoles] = useState([])
    const [matches, setMatches] = useState([])
    const [matchUsers, setMatchUsers] = useState([])
    const [matchUserHoleScores, setMatchUserHoleScores] = useState([])


    useEffect(
        () => {
            getAllUsers()
            .then(
                (data) => {
                    setUsers(data)
                }
            )
        },
        []
    )

    useEffect(
        () => {
            getAllCourses()
            .then(
                (data) => {
                    setCourses(data)
                }
            )
        },
        []
    )

    useEffect(
        () => {
            getAllCourseHoles()
            .then(
                (data) => {
                    setCourseHoles(data)
                }
            )
        },
        []
    )

    useEffect(
        () => {
            getAllMatches()
            .then(
                (data) => {
                    setMatches(data)
                }
            )
        },
        []
    )

    useEffect(
        () => {
            getAllMatchUsers()
            .then(
                (data) => {
                    setMatchUsers(data)
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




    return <>
        
    </>
}