# React Chat Component for AI Agents

![Screenshot 2023-04-20 at 21 17 05](https://user-images.githubusercontent.com/20679513/233469744-b88e22e8-73e8-42f4-af69-489dfd181997.png)

tags `react`, `typescript`, `chatbot`, `chat`

A simple vanilla-react frontend chat module to be used with custom chatbot agents.

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
