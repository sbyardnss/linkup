import React, { useState, useRef } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Auth.css"
import { loginUser } from "../ServerManager";

export const Login = () => {
    // const [email, set] = useState("stephen@byard.com")
    // const [submittedPassword, setPassword] = useState("byard")
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        const user = {
            username: username.current.value,
            password: password.current.value
        }
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("linkUp_user", JSON.stringify(res))
                    
                    navigate("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section id="loginBox">
                <form className="form--login" onSubmit={handleLogin}>
                    <div id="loginLogo">

                        <h1>LinkUp</h1>
                    </div>
                    {/* <h4 id="pleaseSignIn">Please sign in</h4> */}
                    <fieldset className="centerItems">
                        <label className="loginLabels" htmlFor="inputUsername">Email address</label>
                        <input type="username"
                            ref={username}
                            // value={email}
                            // onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="username"
                            required autoFocus />
                        <label className="loginLabels" htmlFor="inputPassword"> Password </label>
                        <input type="password"
                            ref={password}
                            // value={submittedPassword}
                            // onChange={evt => setPassword(evt.target.value)}
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