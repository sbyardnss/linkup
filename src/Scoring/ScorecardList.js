import { useContext, useEffect, useState } from "react"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"

export const ScorecardList = () => {
    const { users, courses, userMatchesWithMatchInfo, activeUserFriends, navigate } = useContext(TeeTimeContext)

    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)

    

    return <>
    </>
}