import { useState, useEffect, useContext } from "react"
import { addFriend, changeFriendStatus, deleteFriend, getAllUserFriends } from "../ServerManager"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"

import "./UserList.css"


export const UserList = ({ contingentId, contingentContainer, contingentList }) => {
    const { users, friendChange, setFriendChange, activeUserFriends, setActiveUserFriends } = useContext(TeeTimeContext)
    const [userFriends, setUserFriends] = useState([])
    const [search, updateSearch] = useState("")
    const [filtered, setFiltered] = useState([])
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = localLinkUpUser

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

    // setFiltered(users)
    useEffect(
        () => {
            setFiltered(users)
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

    // console.log(activeUserFriends)
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
                                if (user.id !== linkUpUserObj.id) {
                                    const matchingFriendRelationship = activeUserFriends.find(userFriend => userFriend.friendId === user.id)
                                    // if (matchingFriendRelationship && matchingFriendRelationship.confirmed === true) {
                                    //USE CODE ABOVE IF YOU IMPLEMENT FRIEND REQUESTS
                                    if (matchingFriendRelationship) {

                                        return <>
                                            <li key={user.id} className="userListItem">
                                                <h3>
                                                    {user.name}
                                                </h3>
                                                <button className="deleteFriendButton" onClick={

                                                    () => {
                                                        deleteFriend(matchingFriendRelationship.id)
                                                        //CODE BELOW FOR REQUESTING POTENTIAL ONLY
                                                        // const otherSideOfDeletedRequest = userFriends.find(userFriend => userFriend.friendId === linkUpUserObj.id)
                                                        // const copy = otherSideOfDeletedRequest
                                                        // copy.confirmed = false
                                                        // changeFriendStatus(copy, otherSideOfDeletedRequest.id)
                                                        setFriendChange(!friendChange)

                                                    }
                                                }>Remove</button>

                                            </li>
                                        </>
                                    }



                                    // CODE BELOW FOR REQUESTING ONLY
                                    // else if (matchingFriendRelationship && matchingFriendRelationship.confirmed === false){
                                    // else if (matchingFriendRelationship) {

                                    //     return <>
                                    //         <li key={user.id} className="userListItem">
                                    //             <h3>
                                    //                 {user.name}
                                    //             </h3>
                                    //             <button className="cancelRequestButton" onClick={

                                    //                 () => {
                                    //                     deleteFriend(matchingFriendRelationship.id)
                                    //                     setFriendChange(!friendChange)

                                    //                 }
                                    //             }>cancel request</button>

                                    //         </li>
                                    //     </>
                                    // }

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
                                                            friendId: user.id
                                                            //CODE BELOW FOR REQUESTING ABILITY ONLY
                                                            // confirmed: false
                                                        }
                                                        addFriend(newFriendForAPI)
                                                        setFriendChange(!friendChange)
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