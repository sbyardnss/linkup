import { useState, useEffect, useContext } from "react"
import { addFriend, changeFriendStatus, deleteFriend, getAllUserFriends } from "../ApiManager"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"

import "./UserList.css"


export const UserList = () => {
    const { users } = useContext(TeeTimeContext)
    const [userFriends, setUserFriends] = useState([])
    const [activeUserFriends, setActiveUserFriends] = useState([])
    const [friendChange, setFriendChange] = useState(false)

    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)

    useEffect(
        () => {
            getAllUserFriends()
                .then(
                    (data) => {
                        setUserFriends(data)
                    }
                )
        },
        [friendChange]
    )
    useEffect(
        () => {
            getAllUserFriends()
                .then(
                    (data) => {
                        setActiveUserFriends(data.filter(userFriend => userFriend.userId === linkUpUserObj.id))
                    })

        },
        [userFriends]
    )
    

        console.log(activeUserFriends)
    return <>
        <main id="fullUserList">

            <section className="userListContainer">
                <ul className="listOfOtherUsers">
                    {
                        users.map(
                            user => {
                                if (user.id !== linkUpUserObj.id) {
                                    const matchingFriendRelationship = activeUserFriends.find(userFriend => userFriend.friendId === user.id)
                                    if (matchingFriendRelationship && matchingFriendRelationship.confirmed === true) {
                                        return <>
                                            <li key={user.id} className="userListItem">
                                                <h3>
                                                    {user.name}
                                                </h3>
                                                <button className="deleteFriendButton" onClick={

                                                    () => {
                                                        deleteFriend(matchingFriendRelationship.id)
                                                        const otherSideOfDeletedRequest = userFriends.find(userFriend => userFriend.friendId === linkUpUserObj.id)
                                                        const copy = otherSideOfDeletedRequest
                                                        copy.confirmed = false
                                                        changeFriendStatus(copy, otherSideOfDeletedRequest.id)
                                                        setFriendChange(!friendChange)

                                                    }
                                                }>unfriend</button>

                                            </li>
                                        </>
                                    }
                                    else if (matchingFriendRelationship && matchingFriendRelationship.confirmed === false){
                                        return <>
                                            <li key={user.id} className="userListItem">
                                                <h3>
                                                    {user.name}
                                                </h3>
                                                <button className="cancelRequestButton" onClick={

                                                    () => {
                                                        deleteFriend(matchingFriendRelationship.id)
                                                        setFriendChange(!friendChange)

                                                    }
                                                }>cancel request</button>

                                            </li>
                                        </>
                                    }
                                    else {

                                        return <>
                                            <li key={user.id} className="userListItem">
                                                <h3>
                                                    {user.name}
                                                </h3>
                                                <button className="addFriendButton" onClick={
                                                    () => {
                                                        const newFriendForAPI = {
                                                            userId: linkUpUserObj.id,
                                                            friendId: user.id,
                                                            confirmed: false
                                                        }
                                                        addFriend(newFriendForAPI)
                                                        setFriendChange(!friendChange)
                                                    }
                                                }>request</button>

                                            </li>
                                        </>
                                    }

                                }
                            }
                        )
                    }

                </ul>
            </section>
        </main>
    </>
}