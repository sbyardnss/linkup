import "./MessagesThread.css"

export const Chat = ({ currentChatRecipient }) => {

    console.log(currentChatRecipient)
    return <>
        <section id="chatThread">

        </section>
        <div id="chatInterface">
            <input type="text" id="chatTextInput"></input>
            <button id="chatSendButton">send</button>
        </div>
    </>
}