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

    // const {currentChatUserId} = useParams()

    const [newMsg, updateNewMsg] = useState({
        message: "",
        recipientId: 0
    })
    const { users, activeUserFriends } = useContext(TeeTimeContext)

    useEffect(
        () => {
            getAllMessages()
                .then(
                    (data) => {
                        // const myReadMessages = data.filter(msg => msg.recipientId === linkUpUserObj.id && msg.read === true)
                        // setReadMessages(myReadMessages)
                        // const myUnreadMessages = data.filter(msg => msg.recipientId === linkUpUserObj.id && msg.read === false)
                        // setUnReadMessages(myUnreadMessages)
                        const myMsgData = data.filter(msg => msg.userId === linkUpUserObj.id || msg.recipientId === linkUpUserObj.id)
                        setMyMessages(myMsgData)
                    }
                )
        },
        []
    )


    //items from former chat module below

    const [activeChat, setActiveChat] = useState([])
    const [message, setMessage] = useState("")



    const msgsForCurrentChat = myMessages.filter(msg => msg.recipientId === newMsg.recipientId || msg.userId === newMsg.recipientId)


    const newMsgForAPI = {
        userId: linkUpUserObj.id,
        recipientId: newMsg.recipientId,
        message: newMsg.message,
        time: Date.now(),
        read: false
    }

    //chat module items above





    // const newMsgObjForApi = {
    //     userId: linkUpUserObj.id,
    //     recipientId: newMsg.recipientId,
    //     message: newMsg.message,
    //     read: false
    // }
    // const NewMessage = () => {
    //     if (createMsg) {

    //         return <>



    //             <section id="newMsgContainer">

    //                 <div className="newMsgInput">
    //                     <select className="recipientSelector" value={newMsg.recipientId} onChange={
    //                         (evt) => {
    //                             const copy = { ...newMsg }
    //                             copy.recipientId = evt.target.value
    //                             updateNewMsg(copy)
    //                         }
    //                     }>
    //                         <option key={0} value={0}>select user</option>
    //                         {
    //                             users.map(user => {
    //                                 if (user.id !== linkUpUserObj.id) {
    //                                     return <>
    //                                         <option key={user.id} value={user.id}>{user.name}</option>
    //                                     </>
    //                                 }
    //                             })
    //                         }



    //                     </select>
    //                 </div>
    //                 <div className="newMsgInput">
    //                     <textarea id="messageSection" value={newMsg.message} className="message__section" placeholder="Message" onChange={
    //                         (evt) => {
    //                             const copy = { ...newMsg }
    //                             copy.message = evt.target.value
    //                             updateNewMsg(copy)
    //                         }
    //                     }></textarea>
    //                 </div>



    //                 <div id="newMsgButtonBlock">
    //                     <button onClick={() => {
    //                         sendNewMessage(newMsgObjForApi)
    //                         const copy = { ...newMsg }
    //                         copy.message = ""
    //                         copy.recipientId = 0
    //                         updateNewMsg(copy)
    //                     }} className="msgButton" >Send</button>
    //                     <button className="teeTimeCancelButton" onClick={() => setCreateMsg(false)}>Cancel</button>
    //                 </div>
    //             </section>
    //         </>
    //     }
    //     else {
    //         return <>
    //             <button className="msgButton" onClick={() => setCreateMsg(true)}>NewMessage</button>
    //         </>
    //     }
    // }

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
                                        const copy = {...newMsg}
                                        copy.recipientId = friendlyUserObj.id
                                        updateNewMsg(copy)
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
                                    <div className="receivedChatMsgItem">{msg.message}</div>
                                </>
                            }
                            else {
                                return <>
                                    <div className="sentChatMsgItem">{msg.message}</div>
                                </>
                            }
                        })
                    }
                </section>
                <div id="chatInterface">

                        <input type="text"
                            id="chatTextInput"
                            value={newMsg.message}
                            onChange={
                                (e) => {
                                    const copy = {...newMsg}
                                        copy.message = e.target.value
                                        updateNewMsg(copy)
                                    }
                                    
                            }
                        />
                        <button id="chatSendButton" onClick={() => {
                            sendNewMessage(newMsgForAPI)

                        }}>send</button>
                </div>
            </article>
        </main>
    </>
}