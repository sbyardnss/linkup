import { useState, useEffect, useContext } from "react"
import { getAllUsers, getUserProfileInfo, updateUser } from "../ServerManager"
import { Scorecard } from "../Scoring/Scorecard"
import { ScorecardContext } from "../Scoring/ScorecardContext"
import { MyTeeTime } from "../TeeTime/MyTeeTime"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import { WeatherContext } from "../Weather/WeatherProvider"


import "./UserProfile.css"

export const UserProfile = () => {
    const { users, setUsers, navigate, setChatUser, currentUser, myJoinedMatchesFromMatches, myPastMatches, dateStringBuilder } = useContext(TeeTimeContext)
    const { selectedMatch, setSelectedMatch } = useContext(ScorecardContext)
    const { next14Dates } = useContext(WeatherContext)
    const [profileEdit, editProfile] = useState(false)
    const [profile, updateProfile] = useState({})
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [currentProfileUser, setCurrentProfileUser] = useState({})


    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)

    useEffect(
        () => {
            if (profileEdit) {
                // const loggedInUser = users?.find(user => user.id === linkUpUserObj.userId)
                getUserProfileInfo()
                .then(
                    data => setCurrentProfileUser(data)
                )
            }
        }, [profileEdit]
    )

    useEffect(
        () => {
            updateProfile(currentProfileUser)
        },
        [currentProfileUser]
    )
    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1)
    const currentDayOfMonth = currentDate.getDate()
    const currentYear = currentDate.getFullYear()
    const currentDateString = `${currentMonth}-${currentDayOfMonth}-${currentYear}`
    const currentDateParsed = Date.parse(currentDateString)
    const updatedUserForAPI = {
        first_name: currentProfileUser?.first_name,
        last_name: currentProfileUser?.last_name,
        username: currentProfileUser?.username,
        email: currentProfileUser?.email,
        password: currentProfileUser?.password
    }
    const showPassword = (passwordVisible) => {
        if (passwordVisible === true) {
            return "text"
        }
        else {
            return "password"
        }
    }
    const showPasswordButtons = () => {
        if (passwordVisible === true) {
            return <>
                <button className="cancelProfileEditButton" onClick={
                    () => {
                        setPasswordVisible(false)
                    }
                }>hide password</button>
            </>
        }
        else {
            return <>
                <button className="cancelProfileEditButton" onClick={
                    () => {
                        setPasswordVisible(true)
                    }
                }>show password</button>
            </>
        }
    }
    const updateProfileSection = () => {
        if (profileEdit) {
            return <>
                <section id="updateProfileSection">
                    <h4>update profile</h4>
                    <label className="editProfileInputLabel" htmlFor="first_name">first name</label>
                    <input className="editProfileInput" type="text" value={profile?.first_name} onChange={
                        (evt) => {
                            const copy = { ...currentProfileUser }
                            copy.first_name = evt.target.value
                            updateProfile(copy)
                        }
                    }></input>
                    <label className="editProfileInputLabel" htmlFor="last_name">last name</label>
                    <input className="editProfileInput" type="text" value={profile?.last_name} onChange={
                        (evt) => {
                            const copy = { ...currentProfileUser }
                            copy.last_name = evt.target.value
                            updateProfile(copy)
                        }
                    }></input>
                    <label className="editProfileInputLabel" htmlFor="username">username</label>
                    <input className="editProfileInput" type="text" value={profile?.username} onChange={
                        (evt) => {
                            const copy = { ...currentProfileUser }
                            copy.username = evt.target.value
                            updateProfile(copy)
                        }
                    }></input>
                    <label className="editProfileInputLabel" htmlFor="email">email</label>
                    <input className="editProfileInput" type="text" value={profile?.email} onChange={
                        (evt) => {
                            const copy = { ...currentProfileUser }
                            copy.email = evt.target.value
                            updateProfile(copy)
                        }
                    }></input>
                    <label className="editProfileInputLabel" htmlFor="password">password</label>
                    <input className="editProfileInput" type={showPassword(passwordVisible)} value={profile?.password} onChange={
                        (evt) => {
                            const copy = { ...currentProfileUser }
                            copy.password = evt.target.value
                            updateProfile(copy)
                        }
                    }></input>
                    <div id="submitCancelProfileChanges">
                        <button type="submit" className="cancelProfileEditButton" onClick={
                            () => {
                                updateUser(updatedUserForAPI, linkUpUserObj.userId)
                                editProfile(false)
                                getAllUsers().then(data => setUsers(data))
                            }
                        }>submit</button>
                        <button className="cancelProfileEditButton" onClick={
                            () => {
                                editProfile(false)
                                setCurrentProfileUser({})
                                updateProfile({})
                            }
                        }>cancel</button>
                        {showPasswordButtons()}
                    </div>
                </section>
            </>
        }
        else {
            return null
        }
    }
    // if (currentUser) {
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
                                    currentUser.friends?.map(friend => {
                                        return <>
                                            <li className="friendListItem">
                                                <div className="profileFriendListName">
                                                    {friend.full_name}
                                                </div>
                                                <button className="friendMessagesButton" onClick={
                                                    () => {
                                                        navigate("/messages")
                                                        setChatUser(friend.id)
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
                                                const teeTimeDateString = dateStringBuilder(teeTime)
                                                const teeTimeDateParsed = Date.parse(teeTimeDateString)
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
                                                        selectedMatch={selectedMatch}
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
                                                                return <>
                                                                    <div>{golfer.full_name}</div>
                                                                </>
                                                            })
                                                        }
                                                    </div>
                                                    <div className="profileButtonBlock">
                                                        <button className="profileScorecardButton" onClick={
                                                            () => {
                                                                setSelectedMatch(teeTime.id)
                                                            }
                                                        }>Scorecard</button>
                                                    </div>
                                                </div>
                                            </li>
                                        </>
                                    }
                                }
                            })
                        }
                    </ul>
                </article>
            </div>
        </>
    // }
}