import { Link, Navigate, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"

import "./NavBar.css"


export const NavBar = () => {
    const navigate = useNavigate()


    return (
        <header className="navigation">
            <div id="logoSpace">
                <Link className="navigation__icon" to="/"><img src={require = ('https://cdn-icons-png.flaticon.com/512/33/33846.png')} /></Link>
                <h1 id="navName" className="navigation__name">LinkUp</h1>
            </div>
            {/* <div className="navigation__message">
                <button id="messageCount" onClick={() => navigate("messages")} className="notification__count"></button>
            </div> */}
            <Link className="profileLink" to="/profile" ><img class="invert" src={require = ('https://freesvg.org/img/abstract-user-flat-4.png')}/></Link>
            <div id="linkContainer">
                {/* <div className="navLinks">
                    <Link className="navigation_link" to="/play">Play</Link>
                    <Link className="navigation_link" to="/createTeeTime">New Tee Time</Link>
                    <Link className="navigation_link" to="/userList">Make Friends</Link>
                    <Link className="navigation_link" to="/addCourse">Add Course</Link>
                    <Link className="navigation_link" to="/profile">My Profile</Link>
                </div> */}
                <div>
                    <input type="checkbox" id="active" />
                    <label htmlFor="active" className="menu-btn"><span></span></label>
                    <label htmlFor="inactive" className="close"></label>
                    <div className="wrapper">
                        <ul>
                            <li><Link className="navigation_link" to="/play" onClick={
                                () => {
                                    document.getElementById("active").replace("active", "inactive")
                                }
                            }>Play</Link></li>
                            <li><Link className="navigation_link" to="/createTeeTime" onClick={
                                () => {
                                    document.getElementById("active").replace("active", "inactive")
                                }
                            }>New Tee Time</Link></li>
                            <li><Link className="navigation_link" to="/userList" onClick={
                                () => {
                                    document.getElementById("active").replace("active", "inactive")
                                }
                            }>Make Friends</Link></li>
                            <li><Link className="navigation_link" to="/addCourse" onClick={
                                () => {
                                    document.getElementById("active").replace("active", "inactive")
                                }
                            }>Add Course</Link></li>
                            {/* <li></li> */}
                            <li><Link className="navigation_logout" to="" onClick={() => {
                                localStorage.removeItem("linkUp_user")
                                Navigate("/", { replace: true })
                            }}>Logout</Link>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </header>
    )
}