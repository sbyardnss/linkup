import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Auth.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        name: "",
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("linkUp_user", JSON.stringify({
                        id: createdUser.id,
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main id="registerContainer" style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h3 className="h3 mb-3 font-weight-normal">Please Register for LinkUp</h3>
                <fieldset className="registerFieldset">
                    <label className="loginLabels" htmlFor="name"> Name </label>
                    <input onChange={updateUser}
                           type="text" id="name" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset className="registerFieldset">
                    <label className="loginLabels" htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset className="registerFieldset">
                    <label className="loginLabels" htmlFor="email"> Password </label>
                    <input onChange={updateUser}
                        type="password" id="password" className="form-control"
                        placeholder="Password" required />
                </fieldset>
                <fieldset className="buttonFieldset">
                    <button className="signInButton" type="submit"> Register </button>
                    <button className="cancelRegister" onClick={
                        () => {
                            navigate("/login/")
                        }
                    }>Cancel</button>
                </fieldset>
            </form>
        </main>
    )
}