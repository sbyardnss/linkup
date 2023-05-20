import { color } from "framer-motion"
import { useState, useEffect, useContext } from "react"
import { deleteFriend, updateUser } from "../ServerManager"
import { Messages } from "../Messages/Messages"
import { Scorecard } from "../Scoring/Scorecard"
import { ScorecardContext } from "../Scoring/ScorecardContext"
import { MyTeeTime } from "../TeeTime/MyTeeTime"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import { WeatherContext } from "../Weather/WeatherProvider"


import "./UserProfile.css"

export const UserProfile = () => {
    const { users, courses, /*userMatchesWithMatchInfo, activeUserFriends, */navigate, /*setFriendChange, friendChange, profileUpdated, setProfileUpdated, */setChatUser, currentUser, myJoinedMatchesFromMatches, openMatchesIHaveAccessTo, setMatche, myPastMatches } = useContext(TeeTimeContext)
    const { selectedMatch, setSelectedMatch } = useContext(ScorecardContext)
    const { next14Dates } = useContext(WeatherContext)
    const [profileEdit, editProfile] = useState(false)
    const [profile, updateProfile] = useState({})
    const [futureTimes, setFutureTimes] = useState([])
    const [pastTimes, setPastTimes] = useState([])

    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = localLinkUpUser
    // const currentUser = users.find(user => user.id === linkUpUserObj.id)
    // console.log(currentUser)
    useEffect(
        () => {
            updateProfile(currentUser)
        },
        [profileEdit]
    )
    // const onlyMyUserMatches = userMatchesWithMatchInfo.filter(uME => {
    //     return uME.userId === linkUpUserObj.id
    // })

    // const sortedOnlyMyUserMatches = onlyMyUserMatches.sort((a, b) => {
    //     const aDate = Date.parse(a.match.date)
    //     const bDate = Date.parse(b.match.date)
    //     return aDate < bDate ? -1 : aDate > bDate ? +1 : 0
    // })


    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1)
    const currentDayOfMonth = currentDate.getDate()
    const currentYear = currentDate.getFullYear()
    const currentDateString = `${currentMonth}-${currentDayOfMonth}-${currentYear}`
    const currentDateParsed = Date.parse(currentDateString)
    const holeNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

    const updatedUserForAPI = {
        name: profile?.name,
        email: profile?.email,
        password: profile?.password
    }

    const updateProfileSection = () => {
        if (profileEdit) {
            return <>
                <section id="updateProfileSection">
                    <h4>update profile</h4>
                    <label className="editProfileInputLabel" htmlFor="name">name</label>
                    <input className="editProfileInput" type="text" value={profile?.name} onChange={
                        (evt) => {
                            const copy = { ...currentUser }
                            copy.name = evt.target.value
                            updateProfile(copy)
                        }
                    }></input>
                    <label className="editProfileInputLabel" htmlFor="email">email</label>
                    <input className="editProfileInput" type="text" value={profile?.email} onChange={
                        (evt) => {
                            const copy = { ...currentUser }
                            copy.email = evt.target.value
                            updateProfile(copy)
                        }
                    }></input>
                    <label className="editProfileInputLabel" htmlFor="password">password</label>
                    <input className="editProfileInput" type="text" value={profile?.password} onChange={
                        (evt) => {
                            const copy = { ...currentUser }
                            copy.password = evt.target.value
                            updateProfile(copy)
                        }
                    }></input>
                    <div id="submitCancelProfileChanges">
                        <button type="submit" className="cancelProfileEditButton" onClick={
                            () => {
                                updateUser(updatedUserForAPI, linkUpUserObj.id)
                                // setProfileUpdated(!profileUpdated)
                                editProfile(false)

                            }
                        }>submit</button>
                        <button className="cancelProfileEditButton" onClick={
                            () => {
                                editProfile(false)
                            }
                        }>cancel</button>
                    </div>
                </section>

            </>
        }
        else {
            return null
        }
    }



    return <>
        <div id="profileContainer">
            <article id="profileTop">

                <div id="profileHeader">
                    <div>

                        <h2>{currentUser?.full_name}</h2>
                        <h4>{currentUser?.email}</h4>
                    </div>
                    {updateProfileSection()}
                    <button className="editProfileButton" onClick={
                        () => {
                            editProfile(true)
                        }
                    }>Edit</button>
                </div>

                <div id="profileFriendsAndMatches">

                    <div className="friendsAndMessages">

                        <ul className="listOfFriends">
                            <h4>Friends</h4>
                            {
                                currentUser?.friends.map(userFriend => {
                                    const friendObj = users.find(user => user.id === userFriend.friendId)
                                    return <>
                                        <li className="friendListItem">
                                            <div className="profileFriendListName">
                                                {friendObj?.name}
                                            </div>
                                            <button className="friendMessagesButton" onClick={
                                                () => {
                                                    navigate("/messages")
                                                    setChatUser(friendObj?.id)
                                                }
                                            }>Messages</button>
                                        </li>
                                    </>
                                })
                            }
                        </ul>

                        <div className="futureTeeTimesContainer">

                            <ul className="listOfFutureTeeTimes">
                                <h3 className="headerLabels">My Tee Times</h3>

                                {
                                    myJoinedMatchesFromMatches.map(teeTime => {

                                        if (next14Dates) {
                                            //string values for teeTime date
                                            const [month, day, year] = teeTime?.date.split("-")

                                            //numeric values for teeTime date
                                            const intYear = parseInt(year)
                                            const intMonth = parseInt(month)
                                            const intDay = parseInt(day)
                                            const teeTimeDateString = `${intMonth}-${intDay}-${intYear}`
                                            const teeTimeDateParsed = Date.parse(teeTimeDateString)


                                            // const matchingCourse = courses.find(course => course.id === teeTime?.match.courseId)
                                            const matchingScorecardId = teeTime.scorecardId
                                            if (teeTimeDateParsed >= currentDateParsed) {

                                                return <>
                                                    <div className="userProfileMatches">
                                                        <MyTeeTime
                                                            key={teeTime.id}
                                                            id={teeTime.id}
                                                            courseId={teeTime.course.id}
                                                            courseName={teeTime.course.name}
                                                            date={teeTimeDateString}
                                                            time={teeTime.time}
                                                            dateForWeather={teeTime.date}
                                                            creator={teeTime.creator}
                                                            golfers={teeTime.golfers}
                                                            scorecardId={matchingScorecardId}

                                                        />
                                                        {/* <MyTeeTime key={teeTime.id}
                                                            id={teeTime.id}
                                                            courseId={matchingCourse?.id}
                                                            courseName={matchingCourse?.name}
                                                            date={teeTime.match.date}
                                                            time={teeTime.match.time}
                                                            matchId={teeTime.matchId}
                                                            scorecardId={matchingScorecardId}
                                                        /> */}

                                                    </div>
                                                </>
                                            }


                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                </div>
            </article>
            <article className="pastTeeTimesContainer">

                <ul className="listOfPastTeeTimes">
                    <h3>Past Tee Times:</h3>
                    {
                        myPastMatches.map(teeTime => {

                            if (next14Dates) {

                                // const otherUserMatchesForGivenMatch = userMatchesWithMatchInfo.filter(userMatch => {
                                //     return userMatch.matchId === teeTime.matchId
                                // })
                                //string values for teeTime date
                                const [month, day, year] = teeTime?.date.split("-")

                                //numeric values for teeTime date
                                const intYear = parseInt(year)
                                const intMonth = parseInt(month)
                                const intDay = parseInt(day)
                                const teeTimeDateString = `${intMonth}-${intDay}-${intYear}`
                                const teeTimeDateParsed = Date.parse(teeTimeDateString)


                                // const matchingCourse = courses.find(course => course.id === teeTime?.match.courseId)
                                const matchingScorecardId = teeTime.scorecardId



                                // if (teeTimeDateParsed < currentDateParsed) {
                                if (selectedMatch === teeTime.id) {
                                    return <>
                                        <li className="pastTeeTime">
                                            <div className="pastTeeTimeHeader">

                                                <div className="pastTeeTimeCourse">{teeTime.course.name}</div>
                                                <div className="pastTeeTimeInfo">
                                                    <div>{teeTime.date}</div>
                                                    <div>{teeTime.time}</div>
                                                </div>

                                                <div className="listOfPlayersOnMatch">Other Players:
                                                    {
                                                        teeTime.golfers.map(golfer => {
                                                            // const matchPlayer = users.find(user => user.id === golfer.userId)
                                                            return <>
                                                                <div>{golfer.full_name}</div>
                                                            </>
                                                        })
                                                    }
                                                </div>
                                                <div className="profileButtonBlock">
                                                    <button className="profileScorecardButton" onClick={
                                                        () => {
                                                            setSelectedMatch(0)
                                                        }
                                                    }>exit</button>
                                                </div>
                                            </div>
                                            <div id="scoreCardOnPastTeeTime">

                                                <Scorecard
                                                    profileOrPlayTable={"profileTable-container"}
                                                    profileOrPlayContainer={"profileScorecardContainer"}
                                                />
                                            </div>
                                        </li>
                                    </>
                                }
                                else {


                                    return <>
                                        <li className="pastTeeTime">
                                            <div className="pastTeeTimeHeader">

                                                <div className="pastTeeTimeInfo">
                                                    <div className="pastTeeTimeCourse">{teeTime.course.name}</div>
                                                    <div className="pastTeeTimeInfo">
                                                        <div>{teeTime.date}</div>
                                                        <div>{teeTime.time}</div>
                                                    </div>

                                                </div>

                                                <div className="listOfPlayersOnMatch">Other Players:
                                                    {
                                                        teeTime.golfers.map(golfer => {
                                                            // const matchPlayer = users.find(user => user.id === userMatch.userId && user.id !== linkUpUserObj.id)
                                                            return <>
                                                                <div>{golfer.full_name}</div>
                                                            </>
                                                        })
                                                    }
                                                </div>
                                                <div className="profileButtonBlock">
                                                    <button className="profileScorecardButton" onClick={
                                                        () => {
                                                            setSelectedMatch(teeTime?.matchId)
                                                        }
                                                    }>Scorecard</button>
                                                </div>
                                            </div>
                                        </li>
                                    </>
                                }

                                // }


                            }
                        })
                    }
                </ul>

            </article>



        </div>
    </>
}