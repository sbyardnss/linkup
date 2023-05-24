import { Link, Navigate, useNavigate } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react"
import profileIcon from "../images/abstract-user-flat-4.png"
import "./NavBar.css"
import { UnreadMsgCount } from "../Messages/MessageThread"

export const NavBar = () => {
    const navigate = useNavigate()
    const navMenu = useRef(null)
    //close open menu
    const closeOpenMenus = (e) => {
        if (navMenu.current && !navMenu.current.contains(e.target)) {
            document.getElementById("active").checked = false
        }
        //why does adding the conditional work here??!!! this function now allows me to close the menu if and only if the user clicks outside of the menu or manually closes it with the icon
        if (!navMenu.current && document.getElementById("active").contains(e.target)) {
            document.getElementById("active").checked = false
        }
    }
    document.addEventListener(`click`, closeOpenMenus)
    const msgNotification = () => { // functionality removed due to lack of fluidity. 
        const msgCount = UnreadMsgCount()
        if (msgCount !== 0) {
            return <>
                <div id="newMsgCount">{msgCount}</div>
            </>
        }
    }
    return (
        <header className="navigation">
            <div id="logoSpace">
                <Link className="navigation__icon" to="/"><img src={require = ('https://cdn-icons-png.flaticon.com/512/33/33846.png')} /></Link>
                <h1 id="navName" className="navigation__name">LinkUp</h1>
            </div>

            <div id="navbarRightSide">

                <div id="profileIconAndHamburger">
                    <Link className="profileLink" to="/profile" onClick={
                        () => {
                            document.getElementById("active").replace("active", "inactive")
                        }
                    }><img className="invert" src={profileIcon} /></Link>
                </div>
                <div id="linkContainer">
                    <div ref={navMenu}>
                        <input type="checkbox" id="active" />
                        <label htmlFor="active" className="menu-btn"><span></span></label>
                        <label htmlFor="inactive" className="close"></label>
                        <div id="menuWrapper" className="wrapper">
                            <ul>
                                <li className="navListItem"><Link className="navigation_link" to="/play" onClick={
                                    () => {
                                        document.getElementById("active").checked = false
                                    }
                                }>Play</Link></li>
                                <li className="navListItem"><Link className="navigation_link" to="/messages" onClick={
                                    () => {
                                        document.getElementById("active").checked = false
                                    }
                                }>Messages {/*msgNotification()*/}</Link></li>
                                <li className="navListItem"><Link className="navigation_link" to="/createTeeTime" onClick={
                                    () => {
                                        document.getElementById("active").checked = false
                                    }
                                }>New Tee Time</Link></li>
                                <li className="navListItem"><Link className="navigation_link" to="/userList" onClick={
                                    () => {
                                        document.getElementById("active").checked = false
                                    }
                                }>Make Friends</Link></li>
                                <li className="navListItem"><Link className="navigation_link" to="/addCourse" onClick={
                                    () => {
                                        document.getElementById("active").checked = false
                                    }
                                }>Add Course</Link></li>
                                {/* <li></li> */}
                                <li className="navListItem"><Link className="navigation_logout" to="" onClick={() => {
                                    localStorage.removeItem("linkUp_user")
                                    Navigate("/", { replace: true })
                                }}>Logout</Link>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </header>
    )
}