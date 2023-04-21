# React Chat Component for AI Agents

![Screenshot 2023-04-20 at 21 17 05](https://user-images.githubusercontent.com/20679513/233469744-b88e22e8-73e8-42f4-af69-489dfd181997.png)

tags `react`, `typescript`, `chatbot`, `chat`

A simple vanilla-react frontend chat module to be used with custom chatbot agents.

[Try it on Codesandbox](https://codesandbox.io/s/react-agent-chat-example-nywk9r?file=/src/App.js)

## Installation

```bash
  pnpm install react-agent-chat
```

or if you prefer npm:

```bash
  npm install --save react-agent-chat
```

### Import

```js
import ReactAgentChat from 'react-agent-chat'
```

### Usage

```js

import React, { useState } from 'react'
import { chat } from './libs/api'
import ReactAgentChat, {standardClasses} from 'react-agent-chat'
import 'react-agent-chat/dist/react-agent-chat.min.css'
import './App.scss'

const ChatIcon = () => {
  return {
    // image or SVG used as an Icon for the closed/minimised chat  
  }
}

function App() {
  
  const [receivedMessage, setReceivedMessage] = useState('')
  // trigger your own api call on chat input
  const handleSubmit = async (text: string) => {
    const chatResponse = await chat(text)
    setReceivedMessage(chatResponse)
  }

  return (
    <div className="App">
      <header className="App-header">
        <ReactAgentChat
          classes={{
            ...standardClasses,
            // overide classNames (list of classnames can be seen in README props)
            // wrapper: "chat-box",
          }}
          // trigger your own api call on chat input
          onSubmit={(text) => {
            handleSubmit(text)
          }}
          // return messages from your api are returned to the chat via receivedMessage 
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

```

### Props

```ts
interface PropTypes {
  submitBtnText?: string
  inputText?: string
  submitHandler?: (event: React.FormEvent<HTMLFormElement>) => void
  examples?: Example[] {
    text: string
  } 
  examplesTitle?: string
  placeholder?: string
  // overrides classnames 
  classes?: CustomClasses {
    wrapper?: string
    dialog?: string
    dialogItem?: string
    dialogItemQuestion?: string
    dialogItemAnswer?: string
    actionBar?: string
    input?: string
    submit?: string
    examplesWrapper?: string
    examplesTitle?: string
    examples?: string
    exampleItem?: string
    loadingDots?: string
    loadingDot?: string
    closedChat?: string
    closedChatWrapper?: string
    closeBtn?: string
  }
  onSubmit?: (text: string) => void
  receivedMessage?: string
  startsOpen?: boolean
  fixedPosition?: Position
  ChatIcon?: React.ReactNode;
  alwaysOpen?: boolean;
}
```
