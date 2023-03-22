import { useState, useEffect, useContext } from "react"
import { Scorecard } from "../Scoring/Scorecard"
import { MyTeeTime } from "../TeeTime/MyTeeTime"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import { WeatherContext } from "../Weather/WeatherProvider"


import "./UserProfile.css"

export const UserProfile = () => {
    const { users, courses, userMatchesWithMatchInfo, activeUserFriends, navigate } = useContext(TeeTimeContext)
    const { next14Dates } = useContext(WeatherContext)
    const [profile, updateProfile] = useState({})

    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    const currentUser = users.find(user => user.id === linkUpUserObj.id)


    const onlyMyUserMatches = userMatchesWithMatchInfo.filter(uME => {
        return uME.userId === linkUpUserObj.id
    })

    const sortedOnlyMyUserMatches = onlyMyUserMatches.sort((a, b) => {
        const aDate = Date.parse(a.match.date)
        const bDate = Date.parse(b.match.date)
        return aDate < bDate ? -1 : aDate > bDate ? +1 : 0
    })


    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1)
    const currentDayOfMonth = currentDate.getDate()
    const currentYear = currentDate.getFullYear()
    const currentDateString = `${currentMonth}-${currentDayOfMonth}-${currentYear}`
    const currentDateParsed = Date.parse(currentDateString)
    const holeNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

    return <>
        <main id="profileContainer">
            <section className="profile__info">
                <div>
                    <div id="profileHeader">
                        <h2>{currentUser?.name}</h2>
                        <button className="editProfileButton">Edit</button>
                    </div>
                    <div>Friends:
                        <ul className="listOfFriends">
                            {
                                activeUserFriends.map(userFriend => {
                                    const friendObj = users.find(user => user.id === userFriend.friendId)
                                    return <>
                                        <li>{friendObj.name}</li>
                                    </>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </section>
            <section className="teeTimesContainer">
                <h3>My Tee Times</h3>
                <ul className="listOfFutureTeeTimes">
                    {
                        sortedOnlyMyUserMatches.map(teeTime => {
                            if (next14Dates) {
                                //string values for teeTime date
                                const [month, day, year] = teeTime?.match?.date.split("/")

                                //numeric values for teeTime date
                                const intYear = parseInt(year)
                                const intMonth = parseInt(month)
                                const intDay = parseInt(day)
                                const teeTimeDateString = `${intMonth}-${intDay}-${intYear}`
                                const teeTimeDateParsed = Date.parse(teeTimeDateString)


                                const matchingCourse = courses.find(course => course.id === teeTime?.match.courseId)
                                const matchingScorecardId = teeTime.scorecardId
                                if (teeTimeDateParsed >= currentDateParsed) {
                                    return <>
                                        <div className="userProfileMatches">
                                            <MyTeeTime key={teeTime.id}
                                                id={teeTime.id}
                                                courseId={matchingCourse.id}
                                                courseName={matchingCourse.name}
                                                date={teeTime.match.date}
                                                time={teeTime.match.time}
                                                matchId={teeTime.matchId}
                                                scorecardId={matchingScorecardId}
                                            />

                                        </div>
                                    </>
                                }


                            }
                        })
                    }
                </ul>
                <h3>Past Tee Times:</h3>
                <ul className="listOfPastTeeTimes">
                    {
                        sortedOnlyMyUserMatches.map(teeTime => {
                            if (next14Dates) {
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


                                const matchingCourse = courses.find(course => course.id === teeTime?.match.courseId)
                                const matchingScorecardId = teeTime.scorecardId

                                if (teeTimeDateParsed < currentDateParsed) {
                                    return <>
                                        <li className="pastTeeTime">
                                            <div className="pastTeeTimeInfo">
                                                <div>{matchingCourse.name}</div>
                                                <div>{teeTime.match.date}</div>
                                                <div>{teeTime.match.time}</div>
                                            </div>

                                            <div className="listOfPlayersOnMatch">Other Players:
                                                {
                                                    otherUserMatchesForGivenMatch.map(userMatch => {
                                                        const matchPlayer = users.find(user => user.id === userMatch.userId)
                                                        return <>
                                                            <div>{matchPlayer.name}</div>
                                                        </>
                                                    })
                                                }
                                            </div>
                                            <div className="profileButtonBlock">
                                                <button className="profileScorecardButton" onClick={
                                                    () => {
                                                        console.log(teeTime.matchId)
                                                        navigate(`/scorecards/${teeTime.matchId}`)
                                                    }
                                                }>Scorecard</button>
                                            </div>
                                        </li>
                                    </>
                                }


                            }
                        })
                    }
                </ul>

            </section>



        </main>
    </>
}