import { useContext, useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { getAllMessages, sendNewMessage } from "../ApiManager"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import { Chat } from "./Chat"
import "./MessagesThread.css"


export const MessageThread = () => {
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    const [myMessages, setMyMessages] = useState([])
    const [createMsg, setCreateMsg] = useState(false)
    const [currentChatRecipientUser, setCurrentChat] = useState({})
    const [msgSent, setMessageSent] = useState(false)


    const [newMsg, updateNewMsg] = useState({
        message: "",
        recipientId: 0
    })
    const { users, activeUserFriends, chatUser, setChatUser } = useContext(TeeTimeContext)

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
        [msgSent]
    )
   

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
    return <>
        <main id="messagesPageContainer">
            <ul id="chatList">
                {
                    activeUserFriends.map(friend => {
                        const friendlyUserObj = users.find(user => user.id === friend.friendId)
                        if (friendlyUserObj?.id === newMsg.recipientId) {
                            return <>
                                <li className="activeChatListItem">{friendlyUserObj?.name}</li>
                            </>

                        }
                        else {
                            return <>
                                <li className="chatListItem" onClick={
                                    () => {
                                        const copy = { ...newMsg }
                                        copy.recipientId = friendlyUserObj.id
                                        updateNewMsg(copy)
                                        setChatUser(friendlyUserObj.id)
                                    }
                                }>
                                    {friendlyUserObj?.name}

                                </li>
                            </>
                        }
                    })
                }
            </ul>
            <article id="chatContainer">
                <section id="chatThread">
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