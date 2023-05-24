import { useContext, useState, useEffect } from "react"
import { getAllMessages, sendNewMessage, setMsgsToRead } from "../ServerManager"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import "./MessagesThread.css"
import { formatDate } from "react-calendar/dist/cjs/shared/dateFormatter"

export const UnreadMsgCount = () => {
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    const [myMessages, setMyMessages] = useState([])
    const { msgsRead, currentUser } = useContext(TeeTimeContext)
    useEffect(
        () => {
            if (linkUpUserObj.token) {
                getAllMessages()
                    .then(
                        (data) => {
                            const myMsgData = data.filter(msg => msg.recipient === linkUpUserObj.userId)
                            setMyMessages(myMsgData)
                        }
                    )

            }
        },
        []//msgs read was in this state watcher
    )
    const unreadMsgs = myMessages.filter(msg => msg.read === false)
    if (unreadMsgs) {
        return unreadMsgs.length
    }
}

export const MessageThread = () => {
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    const [myMessages, setMyMessages] = useState([])
    const [displayedMsgs, setDisplayedMsgs] = useState([])
    const [createMsg, setCreateMsg] = useState(false)
    const [currentChatRecipientUser, setCurrentChat] = useState({})
    const [msgSent, setMessageSent] = useState(false)


    const [newMsg, updateNewMsg] = useState({
        message: "",
        recipient: 0
    })
    const { users, activeUserFriends, chatUser, setChatUser, msgsRead, setMsgsRead, currentUser } = useContext(TeeTimeContext)

    // const updateMessages = () => {
    //     Promise.resolve(getAllMessages())
    //         .then((data) => {
    //             const myMsgData = data.filter(msg => msg.sender === linkUpUserObj.userId || msg.recipient === linkUpUserObj.userId)
    //             const sortedMyMsgData = myMsgData.sort((a, b) => {
    //                 const aDate = Date.parse(a.date_time)
    //                 const bDate = Date.parse(b.date_time)
    //                 return aDate < bDate ? -1 : aDate > bDate ? +1 : 0
    //             })
    //             setMyMessages(sortedMyMsgData)
    //         })
    // }
    const resetMessages = () => {
        getAllMessages()
            .then(
                (data) => {
                    const myMsgData = data.filter(msg => msg.sender === linkUpUserObj.userId || msg.recipient === linkUpUserObj.userId )
                    const sortedMyMsgData = myMsgData.sort((a, b) => {
                        const aDate = Date.parse(a.date_time)
                        const bDate = Date.parse(b.date_time)
                        return aDate < bDate ? -1 : aDate > bDate ? +1 : 0
                    })
                    setMyMessages(sortedMyMsgData)
                    // scrollToBottom("chatThread")
                }
            )
    }
    useEffect(
        () => {
            // getAllMessages()
            //     .then(
            //         (data) => {
            //             const myMsgData = data.filter(msg => msg.sender === linkUpUserObj.userId || msg.recipient === linkUpUserObj.userId)
            //             const sortedMyMsgData = myMsgData.sort((a, b) => {
            //                 const aDate = Date.parse(a.date_time)
            //                 const bDate = Date.parse(b.date_time)
            //                 return aDate < bDate ? -1 : aDate > bDate ? +1 : 0
            //             })
            //             setMyMessages(sortedMyMsgData)
            //             scrollToBottom("chatThread")
            //         }
            //     )
            resetMessages()
        },
        // [msgSent, msgsRead]
        []
    )
    useEffect(
        () => {
            const msgsForCurrentChat = myMessages.filter(msg => msg.recipient === chatUser || msg.sender === chatUser)
            setDisplayedMsgs(msgsForCurrentChat)
            scrollToBottom("chatThread")

        },[myMessages]
    )
    // useEffect(
    //     () => {
    //         const copy = { ...newMsg }
    //         copy.recipientId = chatUser
    //         updateNewMsg(copy)
    //     },
    //     [chatUser]
    // )
    const chatUserObj = users.find(user => user.id === chatUser)




    const newMsgForAPI = {
        sender: linkUpUserObj.userId,
        recipient: newMsg.recipient,
        message: newMsg.message,
        read: 0
    }
    const scrollToBottom = (id) => {
        const element = document.getElementById(`${id}`)
        element.scrollTop = element.scrollHeight
    }
    // const scrollToBottom = (id) => {
    //     const element = (`#${id}`);
    //     element.animate({
    //         scrollTop: element.scrollHeight
    //     }, 500);
    // }
    // resetMessages()

    const handleChange = e => {
        const copy = { ...newMsg }
        copy.message = e.target.value
        updateNewMsg(copy)
    }
    const handlekeyDown = e => {
        if (e.key === 'Enter') {
            sendNewMessage(newMsgForAPI).then(()=> {
                const copy = { ...newMsg }
                copy.message = ""
                updateNewMsg(copy)
                // setMessageSent(!msgSent)
                // getAllMessages()
                //     .then(
                //         (data) => {
                //             const myMsgData = data.filter(msg => msg.sender === linkUpUserObj.userId || msg.recipient === linkUpUserObj.userId)
                //             const sortedMyMsgData = myMsgData.sort((a, b) => {
                //                 const aDate = Date.parse(a.date_time)
                //                 const bDate = Date.parse(b.date_time)
                //                 return aDate < bDate ? -1 : aDate > bDate ? +1 : 0
                //             })
                //             setMyMessages(sortedMyMsgData)
                //         }
                //     )
                resetMessages()
            })
        }
    }
    const isChatUserSelected = () => {
        if (chatUser) {
            return <>
                <div id="chatHeader">{chatUserObj?.name}</div>
            </>
        }
        else {
            return <>
                <div id="chatHeader">select chat</div>
            </>
        }
    }
    if (currentUser) {
        return <>
            <main id="messagesPageContainer">
                <ul id="chatList">
                    {
                        currentUser.friends?.map(friend => {
                            const newMsgs = displayedMsgs.filter(msg => msg.sender === friend.id && msg.read === false && msg.recipient === linkUpUserObj.userId)
                            const newMsgsFromThisUser = () => {
                                if (newMsgs.length !== 0) {
                                    return <>
                                        <div className="msgsPageNotification">
                                            {newMsgs.length}
                                        </div>
                                    </>
                                }
                            }
                            if (friend?.id === chatUser) {
                                return <>
                                    <li className="activeChatListItem">
                                        <div>
                                            {friend.full_name}
                                        </div>
                                    </li>
                                </>
                            }
                            else {
                                return <>
                                    <li className="chatListItem" onClick={
                                        () => {
                                            {
                                                newMsgs.map(msg => {
                                                    const copy = { ...msg }
                                                    copy.read = true
                                                    setMsgsToRead(copy, msg.id)
                                                })
                                            }
                                            getAllMessages()
                                                .then(
                                                    (data) => {
                                                        const myMsgData = data.filter(msg => msg.sender === linkUpUserObj.userId || msg.recipient === linkUpUserObj.userId)
                                                        const sortedMyMsgData = myMsgData.sort((a, b) => {
                                                            const aDate = Date.parse(a.date_time)
                                                            const bDate = Date.parse(b.date_time)
                                                            return aDate < bDate ? -1 : aDate > bDate ? +1 : 0
                                                        })
                                                        setMyMessages(sortedMyMsgData)
                                                    }
                                                )
                                            // setMsgsRead(!msgsRead)
                                            const copy = { ...newMsg }
                                            copy.recipient = friend.id
                                            updateNewMsg(copy)
                                            setChatUser(friend.id)
                                            // resetMessages()
                                        }
                                    }>
                                        {friend?.full_name} {newMsgsFromThisUser(friend)}
                                    </li>
                                </>
                            }
                        })
                    }
                </ul>
                <div id="chatAndInterfaceContainer">
                    <article id="chatContainer">
                        <section id="chatThread">
                            {isChatUserSelected()}
                            {
                                displayedMsgs.map(msg => {
                                    const [msgDate, msgTime] = msg.date_time.split("T")
                                    let [hour, minute, seconds] = msgTime.split(":")
                                    let amOrPm = "am"
                                    hour > 12 ? hour = hour - 12 : hour = hour
                                    hour > 12 ? amOrPm = 'pm' : amOrPm = amOrPm
                                    const newTimeString = `${hour}:${minute} ${amOrPm}`
                                    const dateString = formatDate('en-us', msg.date_time)
                                    const timeString = newTimeString.toLocaleString('en-us', { hour: '2-digit', minute: '2-digit', hour12: false })
                                    if (msg.recipient === linkUpUserObj.userId) {
                                        return <>
                                            <div className="receivedChatMsgItem">
                                                <div>{msg.message}</div>
                                                <div className="msgDateAndTime">{timeString}</div>
                                                <div className="msgDateAndTime">{dateString}</div>
                                            </div>
                                        </>
                                    }
                                    else {
                                        return <>
                                            <div className="sentChatMsgItem">
                                                <div>{msg.message}</div>
                                                <div className="msgDateAndTime">{timeString}</div>
                                                <div className="msgDateAndTime">{dateString}</div>
                                            </div>
                                        </>
                                    }
                                })
                            }
                        </section>
                    </article>
                    <div id="chatInterface">
                        <input type="text"
                            id="chatTextInput"
                            value={newMsg.message}
                            onChange={handleChange}
                            onKeyDown={handlekeyDown}
                        />
                        <button id="chatSendButton"
                            onClick={() => {
                                sendNewMessage(newMsgForAPI).then(() => {
                                    // setMessageSent(!msgSent)
                                    const copy = { ...newMsg }
                                    copy.message = ""
                                    updateNewMsg(copy)
                                    // getAllMessages()
                                    //     .then(
                                    //         (data) => {
                                    //             const myMsgData = data.filter(msg => msg.userId === linkUpUserObj.id || msg.recipientId === linkUpUserObj.id)
                                    //             const sortedMyMsgData = myMsgData.sort((a, b) => {
                                    //                 const aDate = Date.parse(a.date_time)
                                    //                 const bDate = Date.parse(b.date_time)
                                    //                 return aDate < bDate ? -1 : aDate > bDate ? +1 : 0
                                    //             })
                                    //             setMyMessages(sortedMyMsgData)
                                    //         }
                                    //     )
                                    resetMessages()

                                })
                            }}
                        >send</button>
                    </div>
                </div>
            </main>
        </>
    }
}