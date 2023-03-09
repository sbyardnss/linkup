import { Link, Navigate, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"

import "./NavBar.css"


export const NavBar = () => {
    const navigate = useNavigate()


    return (
        <header className="navigation">

            <Link className="navigation__icon" to="/"><img src={require=('https://cdn-icons-png.flaticon.com/512/33/33846.png')} /></Link>
            <h1 id="navName" className="navigation__name">LinkUp</h1>
            {/* <div className="navigation__message">
                <button id="messageCount" onClick={() => navigate("messages")} className="notification__count"></button>
            </div> */}
            <div className="navigation__logout">
                <Link className="navigation__icon" to="" onClick={() => {
                    localStorage.removeItem("linkUp_user")
                    Navigate("/", { replace: true })
                }}>Logout</Link>
            </div>
        </header>
    )
}