import React, {useState} from 'react'
import { chat } from './libs/api'
import ReactAgentChat, {standardClasses} from './Components/react-agent-chat'
import './App.scss'


const ChatIcon = () => {
  return (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12C21 16.9706 16.9706 21 12 21C10.2289 21 8.57736 20.4884 7.18497 19.605L3 21L4.39499 16.815C3.51156 15.4226 3 13.7711 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>)
}


function App() {
  const [receivedMessage, setReceivedMessage] = useState('')

  const handleSubmit = async (text: string) => {
    const chatResponse = await chat(text)
    setReceivedMessage(chatResponse)
  }


  return (
    <div className="App">
      <header className="App-header">
        <ReactAgentChat classes={{
          ...standardClasses,
          // stylying the wrapper to be fixed to the bottom right corner. Totally overrdes the default styling
          // wrapper: "chat-box",
        }}
        onSubmit={(text) => {
          handleSubmit(text)
        }}
        receivedMessage={receivedMessage}
        startsOpen={false}
        alwaysOpen={false}
        fixedPosition="bottom-right"
        ChatIcon={<ChatIcon></ChatIcon>}
        ></ReactAgentChat>
      </header>
    </div>
  )
}

export default App
