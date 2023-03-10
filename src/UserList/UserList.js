import { useState, useEffect } from "react"
import { getAllCourseHoles, getAllCourses, getAllMatches, getAllMatchUserHoleScores, getAllUserFriends, getAllUserMatches, getAllUsers } from "../ApiManager"

import "./UserList.css"


export const UserList = () => {
    const [users, setUsers] = useState([])
    const [userFriends, setUserFriends] = useState([])


    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)



    useEffect(
        () => {
            getAllUsers()
                .then(
                    (data) => {
                        setUsers(data)
                    }
                )
        },
        []
    )

    useEffect(
        () => {
            getAllUserFriends()
                .then(
                    (data) => {
                        setUserFriends(data)
                    }
                )
        },
        []
    )
        //this doesnt work yet
    let friendsOfActiveUser = []
    const myUserFriends = userFriends.filter(userFriend => userFriend.userId === linkUpUserObj.id)
    const myFriends = () => {
        {
            myUserFriends.map(userFriend => {
                const matchedFriend = users.find(user => user.id === userFriend.friendId)
                friendsOfActiveUser.push(matchedFriend)
            })
        }
    }
    myFriends()

    let nonFriendsOfActiveUser = []
    const nonFriends = () => {
        {
            myUserFriends.map(friendUser => {
                const matchedUser = users.find(user => user.id !== friendUser.friendId)
                nonFriendsOfActiveUser.push(matchedUser)
            })
        }
    }
    nonFriends()
    // console.log(userFriends)
    return <>

    </>
}