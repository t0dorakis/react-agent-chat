# React Chat Component for AI Agents

![Screenshot 2023-04-20 at 21 17 05](https://user-images.githubusercontent.com/20679513/233469744-b88e22e8-73e8-42f4-af69-489dfd181997.png)

A simple frontend chat module to be used with custom chatbot agents.

### Installation

```
  pnpm install react-agent-chat
```
or if you prefer npm:

```
  npm install --save react-agent-chat
```

### Import

```
import ReactAgentChat from 'react-agent-chat'
```

### Props

```
  submitBtnText?: string
  inputText?: string
  submitHandler?: (event: React.FormEvent<HTMLFormElement>) => void
  examples?: Example[]
  examplesTitle?: string
  placeholder?: string
  classes?: CustomClasses
  onSubmit?: (text: string) => void
  receivedMessage?: string
  startsOpen?: boolean
  fixedPosition?: Position
  ChatIcon?: React.ReactNode;
  alwaysOpen?: boolean;
```
