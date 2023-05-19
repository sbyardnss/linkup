import { React, useContext } from "react"
import Calendar from "react-calendar"
import { MyTeeTime } from "../TeeTime/MyTeeTime"
import { OpenTeeTime } from "../TeeTime/OpenTeeTime"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import { WeatherContext } from "../Weather/WeatherProvider.js"
import "./HomePage.css"
import { UserList } from "../UserList/UserList"

export const HomePage = () => {
    const { users, courses, matches, userMatchesWithMatchInfo, sortedOthersUserMatchesThatIHaveNotJoined, sortedOnlyMyUserMatches, currentDateParsed, onlyOthersSortedFutureMatchesThatIHaveNotJoined } = useContext(TeeTimeContext)
    const { next14Dates } = useContext(WeatherContext)
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    const datesForMatchesIHaveJoined = () => {
        const dateArray = []
        {
            if (matches.length) {
                sortedOnlyMyUserMatches.map(userMatch => {
                    const matchingMatch = matches.find(match => userMatch.matchId === match.id)
                    const dateOfJoinedMatch = matchingMatch?.date
                    const parsedMatchingDate = Date.parse(matchingMatch?.date)
                    if (parsedMatchingDate > currentDateParsed) {
                        dateArray.push(dateOfJoinedMatch)
                    }
                })
            }
        }
        return dateArray
    }
    const datesIHaveJoined = datesForMatchesIHaveJoined()
    const datesForMatchesIHaveNotJoined = () => {
        const dateArray = []
        {
            sortedOthersUserMatchesThatIHaveNotJoined.map(userMatch => {
                const matchingMatch = matches.find(match => userMatch.matchId === match.id)
                const dateOfJoinedMatch = matchingMatch?.date
                dateArray.push(dateOfJoinedMatch)
            })
        }
        return dateArray
    }
    const datesIHaveNotJoined = datesForMatchesIHaveNotJoined()
    const dateStringBuilder = (teeTime) => {
            const [month, day, year] = teeTime.date.split("-")
            //numeric values for teeTime date
            const intYear = parseInt(year)
            const intMonth = parseInt(month)
            const intDay = parseInt(day)
            return `${intMonth}-${intDay}-${intYear}`
    }
    const messageToUserOrOpenMatches = () => {
        if (onlyOthersSortedFutureMatchesThatIHaveNotJoined.length === 0) {
            return <li>
                <h3>Make friends to access their tee times!</h3>
            </li>
        }
        else {
            return <>
                {
                    onlyOthersSortedFutureMatchesThatIHaveNotJoined.map(teeTime => {
                        //string values for teeTime date
                        const teeTimeDateString = dateStringBuilder(teeTime)
                        const teeTimeDateParsed = Date.parse(teeTimeDateString)
                        // const matchingCourse = courses.find(course => course.id === teeTime?.match.courseId)
                        const initiatingUserMatch = userMatchesWithMatchInfo?.find(userMatch => userMatch.matchId === teeTime?.match.id)
                        const initiatingUser = users.find(user => user.id === initiatingUserMatch?.userId)
                        if (teeTimeDateParsed >= currentDateParsed) {
                            if (next14Dates) {
                                return <>
                                    <OpenTeeTime key={teeTime.id}
                                        id={teeTime.id}
                                        courseId={teeTime.course.id}
                                        courseName={teeTime.course.name}
                                        date={teeTimeDateString}
                                        time={teeTime.time}
                                        dateForWeather={teeTime.date}
                                        creator={teeTime.creator}
                                        golfers={teeTime.golfers}
                                    />
                                </>
                                // }
                            }
                        }
                    })
                }
            </>
        }
    }
    const messageToUserOrMyMatches = () => {
        if (sortedOnlyMyUserMatches.length === 0) {
            return <li>
                <h3>No joined tee times</h3>
            </li>
        }
        else {
            return <>
                {
                    sortedOnlyMyUserMatches.map(teeTime => {
                        if (next14Dates) {
                            const teeTimeDateString = dateStringBuilder(teeTime)
                            const teeTimeDateParsed = Date.parse(teeTimeDateString)
                            if (teeTimeDateParsed >= currentDateParsed) {
                                // const matchingCourse = courses.find(course => course.id === teeTime?.match.courseId)
                                // let allMatchingUserMatches = []
                                // const matchingUserMatch = userMatchesWithMatchInfo.find(userMatch => userMatch.matchId === teeTime?.match.id)
                                // const matchingUserMatches = userMatchesWithMatchInfo.filter(userMatch => userMatch.matchId === teeTime?.id)
                                // {
                                //     matchingUserMatches.map(userMatch => {
                                //         allMatchingUserMatches.push(userMatch)
                                //     })
                                // }
                                return <>
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
                                    />
                                </>
                            }
                        }
                    })
                }
            </>
        }
    }
    if (matches) {
        return <>
            <main id="homepageContainer">
                <div id="homepageTeeTimes">
                    <section className="myTeeTimesContainer">
                        <ul className="listOfMyTeeTimes">
                            <h1 className="teeTimeHeaderTitle">My Tee Times</h1>
                            {messageToUserOrMyMatches()}
                        </ul>
                    </section>
                    <section className="openTeeTimesContainer">
                        <ul className="listOfOpenTeeTimes">
                            <h1 className="teeTimeHeaderTitle">Open Tee Times</h1>
                            {messageToUserOrOpenMatches()}
                        </ul>
                    </section>
                </div>
                <div id="homepageCalendarAndFriends">
                    <div id="calendarContainer">
                        <Calendar
                            id="homepageCalendar"
                            calendarType="US"
                            tileClassName={({ date }) => {
                                // if (datesIHaveJoined.find(x => x === date.format("MM/DD/YYYY"))) {
                                //     return 'highlight'
                                // }
                                const month = date.getUTCMonth()
                                const day = date.getDate()
                                const year = date.getFullYear()
                                const parsedDateString = Date.parse(`${month}/${day}/${year}`)
                                const testparsedDateString = `${month}/${day}/${year}`
                                if (datesIHaveJoined.find(matchDate => Date.parse(date) === Date.parse(matchDate))) {
                                    return "joinedCalendarMatches"
                                }
                                if (datesIHaveNotJoined.find(openMatchDate => Date.parse(date) === Date.parse(openMatchDate))) {
                                    return "openCalendarMatches"
                                }
                            }}
                        />
                        <div id="calendarKey">
                            <div className="calendarKeyItem">
                                <div>Joined</div>
                                <span className="colorCodeGreen"></span>
                            </div>
                            <div className="calendarKeyItem">
                                <div>Open</div>
                                <span className="colorCodePurple"> </span>
                            </div>
                        </div>
                    </div>
                    <UserList
                        contingentId="homepageUserList"
                        contingentContainer="homepageUserListContainer"
                        contingentList="homepageListOfOtherUsers"
                    />
                </div>
            </main>
            <footer id="homePageFooter">
            </footer>
        </>
    }
}