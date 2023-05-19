import { useState, useEffect, useContext } from "react"
import { addFriend, changeFriendStatus, getAllUsers, removeFriend /*deleteFriend, getAllUserFriends*/ } from "../ServerManager"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"

import "./UserList.css"


export const UserList = ({ contingentId, contingentContainer, contingentList }) => {
    const { users, friendChange, setFriendChange, activeUserFriends, setActiveUserFriends, setUsers } = useContext(TeeTimeContext)
    // const [userFriends, setUserFriends] = useState([])
    const [search, updateSearch] = useState("")
    const [filtered, setFiltered] = useState([])
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)

    // useEffect(
    //     () => {
    //         setUserFriends(activeUserFriends)
    //     },[activeUserFriends]
    // )
    useEffect(
        () => {
            if (users.length) {
                setFiltered(users)
            }
        },
        [users]
    )
    useEffect(
        () => {
            if (search !== "") {
                const filteredUsers = users?.filter(user => {
                    return user.name.toLowerCase().includes(search.toLowerCase())

                })
                setFiltered(filteredUsers)
            }
            else {
                setFiltered(users)
            }
        },
        [search]
    )
    // const handleFriendChange = () => {
    //     if (linkUpUserObj.userId) {
    //         getMyFriends(linkUpUserObj.userId).then((data) => {
    //             setActiveUserFriends(data)
    //         })
    //     }
    // }

    return <>
        <main id={contingentId}>

            <section className={contingentContainer}>
                <section className="userSearchBar">
                    <img id="searchIcon" src="https://freesvg.org/img/Search-icon.png" />
                    <input id="searchBarItself" type="text" placeholder="find users" onChange={
                        (evt) => {
                            updateSearch(evt.target.value)
                        }
                    }></input>
                </section>
                <ul className={contingentList}>
                    {
                        filtered?.map(
                            user => {
                                if (user.id !== linkUpUserObj.userId) {
                                    // const matchingFriendRelationship = userFriends?.find(friend => friend.id === user.id)
                                    // if (matchingFriendRelationship && matchingFriendRelationship.confirmed === true) {
                                    //USE CODE ABOVE IF YOU IMPLEMENT FRIEND REQUESTS
                                    if (user.is_friend === 1) {

                                        return <>
                                            <li key={user.id} className="userListItem">
                                                <h3>
                                                    {user.full_name}
                                                </h3>
                                                <button className="deleteFriendButton" onClick={
                                                    () => {
                                                        removeFriend(user.id)
                                                            .then(() => {
                                                                getAllUsers()
                                                                    .then(data => setUsers(data))
                                                            })
                                                        //CODE BELOW FOR REQUESTING POTENTIAL ONLY
                                                        // const otherSideOfDeletedRequest = userFriends.find(userFriend => userFriend.friendId === linkUpUserObj.id)
                                                        // const copy = otherSideOfDeletedRequest
                                                        // copy.confirmed = false
                                                        // changeFriendStatus(copy, otherSideOfDeletedRequest.id)
                                                        // setFriendChange(!friendChange)

                                                    }
                                                }>Remove</button>

                                            </li>
                                        </>
                                    }

                                    else {

                                        return <>
                                            <li key={user.id} className="userListItem">
                                                <h3>
                                                    {user.full_name}
                                                </h3>
                                                <button className="addFriendButton" onClick={
                                                    () => {
                                                        addFriend(user.id)
                                                            .then(() => {
                                                                getAllUsers()
                                                                    .then(data => setUsers(data))
                                                            })
                                                    }
                                                }>Add</button>

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