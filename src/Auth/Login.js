import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Auth.css"

export const Login = () => {
    const [email, set] = useState("stephen@byard.com")
    const [submittedPassword, setPassword] = useState("byard")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("linkUp_user", JSON.stringify({
                        id: user.id,
                        name: user.name,
                        password: submittedPassword
                    }))
                    if (user.password === submittedPassword) {

                        navigate("/")
                    }

                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section id="loginBox">
                <form className="form--login" onSubmit={handleLogin}>
                    <div id="loginLogo">

                        <h1>LinkUp</h1>
                    </div>
                    {/* <h4 id="pleaseSignIn">Please sign in</h4> */}
                    <fieldset className="centerItems">
                        <label className="loginLabels" htmlFor="inputEmail">Email address</label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                        <label className="loginLabels" htmlFor="inputPassword"> Password </label>
                        <input type="password"
                            value={submittedPassword}
                            onChange={evt => setPassword(evt.target.value)}
                            className="form-control"
                            placeholder="password"
                            required autoFocus />

                        <button className="signInButton" type="submit">
                            Sign in
                        </button>
                    </fieldset>
                    <section className="link--register">
                        <Link to="/register">Not a member yet?</Link>
                    </section>
                </form>
            </section>
        </main>
    )
}