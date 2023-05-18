import { useContext, useState, useEffect } from "react"
import { getAllMessages, sendNewMessage, setMsgsToRead } from "../ServerManager"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import "./MessagesThread.css"

export const UnreadMsgCount = () => {
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = localLinkUpUser
    const [myMessages, setMyMessages] = useState([])
    const { msgsRead } = useContext(TeeTimeContext)
    useEffect(
        () => {
            if (linkUpUserObj.token){
                getAllMessages()
                    .then(
                        (data) => {
                            const myMsgData = data.filter(msg => msg.userId === linkUpUserObj.id || msg.recipientId === linkUpUserObj.id)
                            setMyMessages(myMsgData)
                        }
                    )

            }
        },
        []//msgs read was in this state watcher
    )
    const unreadMsgs = myMessages.filter(msg => msg.read === false && msg.recipientId === linkUpUserObj.id)
    if (unreadMsgs) {
        return unreadMsgs.length
    }
}

export const MessageThread = () => {
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = localLinkUpUser
    const [myMessages, setMyMessages] = useState([])
    const [createMsg, setCreateMsg] = useState(false)
    const [currentChatRecipientUser, setCurrentChat] = useState({})
    const [msgSent, setMessageSent] = useState(false)


    const [newMsg, updateNewMsg] = useState({
        message: "",
        recipientId: 0
    })
    const { users, activeUserFriends, chatUser, setChatUser, msgsRead, setMsgsRead } = useContext(TeeTimeContext)

    useEffect(
        () => {
            getAllMessages()
                .then(
                    (data) => {

                        const myMsgData = data.filter(msg => msg.userId === linkUpUserObj.id || msg.recipientId === linkUpUserObj.id)
                        setMyMessages(myMsgData)
                    }
                )
        },
        [msgSent, msgsRead]
    )
    useEffect(
        () => {
            const copy = { ...newMsg }
            copy.recipientId = chatUser
            updateNewMsg(copy)
        },
        [chatUser]
    )
    const chatUserObj = users.find(user => user.id === chatUser)

    //items from former chat module below

    const [activeChat, setActiveChat] = useState([])
    const [message, setMessage] = useState("")



    const msgsForCurrentChat = myMessages.filter(msg => msg.recipientId === chatUser || msg.userId === chatUser)


    const newMsgForAPI = {
        userId: linkUpUserObj.id,
        recipientId: newMsg.recipientId,
        message: newMsg.message,
        time: Date.now(),
        read: false
    }

    const handleChange = e => {
        const copy = { ...newMsg }
        copy.message = e.target.value
        updateNewMsg(copy)
    }
    const handlekeyDown = e => {
        if (e.key === 'Enter') {
            sendNewMessage(newMsgForAPI)
            setMessageSent(!msgSent)
            const copy = { ...newMsg }
            copy.message = ""
            updateNewMsg(copy)
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


    return <>
        <main id="messagesPageContainer">
            <ul id="chatList">
                {
                    activeUserFriends.map(friend => {
                        const friendlyUserObj = users.find(user => user.id === friend.friendId)
                        const newMsgs = myMessages.filter(msg => msg.userId === friend.friendId && msg.read === false && msg.recipientId === linkUpUserObj.id)
                        const newMsgsFromThisUser = () => {
                            if (newMsgs.length !== 0) {
                                return <>
                                    <div className="msgsPageNotification">
                                        {newMsgs.length}
                                    </div>
                                </>
                            }

                        }
                        if (friendlyUserObj?.id === chatUser) {
                            return <>
                                <li className="activeChatListItem">
                                    <div>
                                        {friendlyUserObj?.name}
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
                                        setMsgsRead(!msgsRead)
                                        const copy = { ...newMsg }
                                        copy.recipientId = friendlyUserObj.id
                                        updateNewMsg(copy)
                                        setChatUser(friendlyUserObj.id)

                                    }
                                }>
                                    {friendlyUserObj?.name} {newMsgsFromThisUser(friend)}

                                </li>
                            </>
                        }
                    })
                }
            </ul>
            <article id="chatContainer">
                <section id="chatThread">
                    {isChatUserSelected()}
                    {
                        msgsForCurrentChat.map(msg => {

                            const dateString = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(msg.time)
                            const timeString = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(msg.time)
                            if (msg.recipientId === linkUpUserObj.id) {
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
                <div id="chatInterface">

                    <input type="text"
                        id="chatTextInput"
                        value={newMsg.message}
                        onChange={handleChange}
                        onKeyDown={handlekeyDown}
                    />
                    <button id="chatSendButton"
                        onClick={() => {
                            sendNewMessage(newMsgForAPI)
                            setMessageSent(!msgSent)
                        }}

                    >send</button>
                </div>
            </article>
        </main>
    </>
}