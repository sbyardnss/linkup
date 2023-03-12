import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Auth.css"

export const Login = () => {
    const [email, set] = useState("")
    const [submittedPassword, setPassword] = useState("")
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
                    if(user.password === submittedPassword) {

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
                    <h3 id="pleaseSignIn">Please sign in</h3>
                    <fieldset className="centerItems">
                        {/* <label htmlFor="inputEmail"> Email address </label> */}
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                        <input type="password"
                            value={submittedPassword}
                            onChange={evt => setPassword(evt.target.value)}
                            className="form-control"
                            placeholder="password"
                            required autoFocus />

                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
                <section className="link--register">
                    <Link to="/register">Not a member yet?</Link>
                </section>
            </section>
        </main>
    )
}