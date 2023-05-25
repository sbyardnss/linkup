import { React, useContext } from "react"
import Calendar from "react-calendar"
import { MyTeeTime } from "../TeeTime/MyTeeTime"
import { OpenTeeTime } from "../TeeTime/OpenTeeTime"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import { WeatherContext } from "../Weather/WeatherProvider.js"
import "./HomePage.css"
import { UserList } from "../UserList/UserList"

export const HomePage = () => {
    const { matches, dateStringBuilder, currentDateParsed, myJoinedMatchesFromMatches, openMatchesIHaveAccessTo } = useContext(TeeTimeContext)
    const { next14Dates } = useContext(WeatherContext)
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)

    //function to compare current date with match dates from open and my matches arrays in order to add to calendar
    const dateComparisonForCalendar = (matchArr) => {
        const dateArray = []
        {
            if (matches.length) {
                matchArr.map(match => {
                    const matchDate = dateStringBuilder(match)
                    const parsedMatchingDate = Date.parse(matchDate)
                    if (parsedMatchingDate >= currentDateParsed) {
                        dateArray.push(matchDate)
                    }
                })
            }
        }
        return dateArray
    }
    const datesIHaveJoined = dateComparisonForCalendar(myJoinedMatchesFromMatches)
    const datesIHaveNotJoined = dateComparisonForCalendar(openMatchesIHaveAccessTo)

    const messageToUserOrOpenMatches = () => {
        if (openMatchesIHaveAccessTo.length === 0) {
            return <li>
                <h3>Make friends to access their tee times!</h3>
            </li>
        }
        else {
            return <>
                {
                    openMatchesIHaveAccessTo.map(teeTime => {
                        //string values for teeTime date
                        const teeTimeDateString = dateStringBuilder(teeTime)
                        const teeTimeDateParsed = Date.parse(teeTimeDateString)
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
        if (myJoinedMatchesFromMatches.length === 0) {
            return <li>
                <h3>No joined tee times</h3>
            </li>
        }
        else {
            return <>
                {
                    myJoinedMatchesFromMatches.map(teeTime => {
                        if (next14Dates) {
                            const teeTimeDateString = dateStringBuilder(teeTime)
                            const teeTimeDateParsed = Date.parse(teeTimeDateString)
                            if (teeTimeDateParsed >= currentDateParsed) {
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
                                const month = date.getUTCMonth()
                                const day = date.getDate()
                                const year = date.getFullYear()
                                const parsedDateString = Date.parse(`${month}-${day}-${year}`)
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