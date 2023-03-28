// import { useEffect, useState } from "react"
// import { sendNewMessage } from "../ApiManager"
// import "./MessagesThread.css"

// export const Chat = ({ currentChatRecipient, chatMessages }) => {
//     const localLinkUpUser = localStorage.getItem("linkUp_user")
//     const linkUpUserObj = JSON.parse(localLinkUpUser)
//     const [activeChat, setActiveChat] = useState([])
//     const [message, setMessage] = useState("")

//     useEffect(
//         () => {
//             const msgsForCurrentChat = chatMessages.filter(msg => msg.recipientId === currentChatRecipient.id || msg.userId === currentChatRecipient.id)
//             setActiveChat(msgsForCurrentChat)
//         },
//         [currentChatRecipient]
//     )

//     console.log(activeChat)
//     const newMsgForAPI = {
//         userId: linkUpUserObj.id,
//         recipientId: currentChatRecipient.id,
//         message: message,
//         time: Date.now(),
//         read: false
//     }

//     return <>
//         <section id="chatThread">
//             {
//                 activeChat.map(msg => {

//                     const dateString = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(msg.time)
//                     const timeString = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(msg.time)
//                     if (msg.recipientId === linkUpUserObj.id) {
//                         return <>
//                             <div className="receivedChatMsgItem">{msg.message}</div>
//                         </>
//                     }
//                     else {
//                         return <>
//                             <div className="sentChatMsgItem">{msg.message}</div>
//                         </>
//                     }
//                 })
//             }
//         </section>
//         <form className="form--chat" onSubmit={() => {
//             if(newMsgForAPI.recipientId && newMsgForAPI.message){

//                 sendNewMessage(newMsgForAPI)
//             }
//         }} >
//             <fieldset id="chatInterface">

//                 <input type="text"
//                     id="chatTextInput"
//                     value={message}
//                     onChange={
//                         (e) => {
                            
//                             setMessage(e.target.value)
//                         }

//                     }
//                     required autoFocus />
//                 <button type="submit" id="chatSendButton">send</button>
//             </fieldset>
//         </form>
//     </>
// }