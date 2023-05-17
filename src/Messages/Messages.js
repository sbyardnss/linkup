// import { useContext, useState, useEffect } from "react"
// import { getAllMessages, sendNewMessage } from "../ApiManager"
// import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
// import "./Messages.css"

// export const Messages = () => {
//     const localLinkUpUser = localStorage.getItem("linkUp_user")
//     const linkUpUserObj = JSON.parse(localLinkUpUser)
//     const [readMessages, setReadMessages] = useState([])
//     const [unreadMessages, setUnReadMessages] = useState([])
//     const [createMsg, setCreateMsg] = useState(false)
//     const [newMsg, updateNewMsg] = useState({
//         message: "",
//         recipientId: 0
//     })
//     const { users, courses, userMatchesWithMatchInfo, activeUserFriends, navigate, setFriendChange, friendChange, profileUpdated, setProfileUpdated } = useContext(TeeTimeContext)

//     useEffect(
//         () => {
//             getAllMessages()
//                 .then(
//                     (data) => {
//                         const myReadMessages = data.filter(msg => msg.recipientId === linkUpUserObj.id && msg.read === true)
//                         setReadMessages(myReadMessages)
//                         const myUnreadMessages = data.filter(msg => msg.recipientId === linkUpUserObj.id && msg.read === false)
//                         setUnReadMessages(myUnreadMessages)
//                     }
//                 )
//         },
//         []
//     )
//     const newMsgObjForApi = {
//         userId: linkUpUserObj.id,
//         recipientId: newMsg.recipientId,
//         message: newMsg.message,
//         read: false
//     }
//     const NewMessage = () => {
//         if (createMsg) {

//             return <>



//                 <section id="newMsgContainer">

//                     <div className="newMsgInput">
//                         <select className="recipientSelector" value={newMsg.recipientId} onChange={
//                             (evt) => {
//                                 const copy = { ...newMsg }
//                                 copy.recipientId = evt.target.value
//                                 updateNewMsg(copy)
//                             }
//                         }>
//                             <option key={0} value={0}>select user</option>
//                             {
//                                 users.map(user => {
//                                     if (user.id !== linkUpUserObj.id) {
//                                         return <>
//                                             <option key={user.id} value={user.id}>{user.name}</option>
//                                         </>
//                                     }
//                                 })
//                             }



//                         </select>
//                     </div>
//                     <div className="newMsgInput">
//                         <textarea id="messageSection" value={newMsg.message} className="message__section" placeholder="Message" onChange={
//                             (evt) => {
//                                 const copy = { ...newMsg }
//                                 copy.message = evt.target.value
//                                 updateNewMsg(copy)
//                             }
//                         }></textarea>
//                     </div>



//                     <div id="newMsgButtonBlock">
//                         <button onClick={() => {
//                             sendNewMessage(newMsgObjForApi)
//                             const copy = { ...newMsg }
//                             copy.message = ""
//                             copy.recipientId = 0
//                             updateNewMsg(copy)
//                         }} className="msgButton" >Send</button>
//                         <button className="teeTimeCancelButton" onClick={() => setCreateMsg(false)}>Cancel</button>
//                     </div>
//                 </section>
//             </>
//         }
//         else {
//             return <>
//                 <button className="msgButton" onClick={() => setCreateMsg(true)}>NewMessage</button>
//             </>
//         }
//     }
//     return <>

//         <article id="messagesContainer">

//             <div id="receivedMessages">
//                 <div id="msgsHeader">
//                     <h4>New Messages</h4>
//                     <div>

//                         {NewMessage()}
//                     </div>

//                 </div>
//                 {
//                     unreadMessages.map(msg => {
//                         const msgSender = users?.find(user => user.id === msg.userId)
//                         return <>
//                             <section className="individualMsg">
//                                 <div>
//                                     <div>From: {msgSender?.name}</div>
//                                     <div>{msg?.message}</div>
//                                 </div>
//                                 <button className="markReadButton">mark read</button>
//                             </section>
//                         </>
//                     })
//                 }
//                 {
//                     readMessages.map(msg => {
//                         const msgSender = users?.find(user => user.id === msg.userId)
//                         return <>
//                             <section className="individualMsg">
//                                 <div>
//                                     <div>From: {msgSender?.name}</div>
//                                     <div>{msg?.message}</div>
//                                 </div>
//                                 <button className="markReadButton">delete</button>
//                             </section>
//                         </>
//                     })
//                 }
//             </div>

//         </article>
//     </>


// }