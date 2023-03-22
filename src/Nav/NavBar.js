import { Link, Navigate, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

import "./NavBar.css"


export const NavBar = () => {
    const navigate = useNavigate()
    const navMenu = useRef(null)
    //close open menu
    const closeOpenMenus = (e) => {
        if(navMenu.current && !navMenu.current.contains(e.target)) {
            document.getElementById("active").checked = false
        }
        else {
            document.getElementById("active").checked = true
        }
    }
    document.addEventListener(`click`, closeOpenMenus)
    return (
        <header className="navigation">
            <div id="logoSpace">
                <Link className="navigation__icon" to="/"><img src={require = ('https://cdn-icons-png.flaticon.com/512/33/33846.png')} /></Link>
                <h1 id="navName" className="navigation__name">LinkUp</h1>
            </div>
            {/* <div className="navigation__message">
                <button id="messageCount" onClick={() => navigate("messages")} className="notification__count"></button>
            </div> */}
            <Link className="profileLink" to="/profile" onClick={
                () => {
                    document.getElementById("active").replace("active", "inactive")
                }
            }><img className="invert" src={require = ('https://freesvg.org/img/abstract-user-flat-4.png')} /></Link>
            <div id="linkContainer">
                <div>
                    <input ref={navMenu} type="checkbox" id="active" />
                    <label htmlFor="active" className="menu-btn"><span></span></label>
                    <label htmlFor="inactive" className="close"></label>
                    <div className="wrapper">
                        <ul>
                            <li className="navListItem"><Link className="navigation_link" to="/play">Play</Link></li>
                            <li className="navListItem"><Link className="navigation_link" to="/createTeeTime" >New Tee Time</Link></li>
                            <li className="navListItem"><Link className="navigation_link" to="/userList" >Make Friends</Link></li>
                            <li className="navListItem"><Link className="navigation_link" to="/addCourse" >Add Course</Link></li>
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
        </header>
    )
}