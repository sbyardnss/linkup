import { useState, useEffect, useContext } from "react"
import { addFriend, changeFriendStatus, deleteFriend, getAllUserFriends } from "../ApiManager"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"

import "./UserList.css"


export const UserList = () => {
    const { users, friendChange, setFriendChange, activeUserFriends, setActiveUserFriends } = useContext(TeeTimeContext)
    const [userFriends, setUserFriends] = useState([])
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


    // console.log(activeUserFriends)
    return <>
        <main id="fullUserList">

            <section className="userListContainer">
                <ul className="listOfOtherUsers">
                    {
                        users.map(
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
                                                }>DELETE</button>

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
                                                }>ADD</button>

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