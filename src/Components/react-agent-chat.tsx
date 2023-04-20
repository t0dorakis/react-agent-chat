import React, {FocusEvent} from 'react'
import styles from './react-agent-chat.module.scss'

/**
 * React chat module to be used with custom AI chatbots and Agents
 * @author  {Theodor Hillmann}
 * @version {0.0.1}
 * @param   {string} className - custom class name for the wrapper
 * @param   {string} submitBtnText - text for the submit button
 * @param   {string} inputText - text for the input field
 * @param   {string} examplesTitle - title for the examples
 * @param   {string} placeholder - placeholder for the input field
 * @param   {string} receivedMessage - message received from the chatbot
 * @param   {Example[]} examples - examples for the user to click on
 * @param   {CustomClasses} classes - custom classes for the components
 * @param   {Function} onSubmit - function to be called when the user submits a message
 * @param   {Function} submitHandler - function to be call^ed when the user submits a message
 * @param   {Function} onExampleClick - function to be called when the user clicks on an example
 * @param   {Function} onChatClose - function to be called when the user closes the chat
 * @param   {Function} onChatOpen - function to be called when the user opens the chat
 * @param   {boolean} startsOpen - if the chat should start open
 * @return  {React.ReactElement} - React component
 */

interface CustomClasses {
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


interface FormElements extends HTMLFormControlsCollection {
  promptInput: HTMLInputElement
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements
}
type LoadingState = 'LOADING' | 'SUCCESS' | 'ERROR'

interface Dialog {
  question: string
  answer: string | LoadingState
}

interface Example {
  text: string
}


const Examples = ({
  examples,
  examplesTitle,
  onClick,
  classes,
}: {
  examples: Example[]
  classes: CustomClasses
  examplesTitle: string
  onClick: (example: Example) => void
}) => {
  const handleClick = (item: Example) => {
    onClick && onClick(item)
  }
  return (
    <div className={classes.examplesWrapper}>
      <div className={classes.examplesTitle}>{examplesTitle}</div>
      <div className={classes.examples}>
        {examples.map((item, index) => (
          <div
            key={index}
            className={classes.exampleItem}
            onClick={() => handleClick(item)}
            aria-label='Try an example question'
          >
            “{item.text}” &#8594;
          </div>
        ))}
      </div>
    </div>
  )
}

const LoadingDots = () => {
  return (
    <div className={styles.rca_loading_dots}>
      <div className={styles.rca_loading_dot}></div>
      <div className={styles.rca_loading_dot}></div>
      <div className={styles.rca_loading_dot}></div>
    </div>
  )
}

const CloseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={styles.rca_close_button} onClick={onClick}>
      &#10005;
    </div>
  )
}

export const standardClasses = {
    wrapper: styles.rca_wrapper,
    dialog: styles.rca_dialog,
    dialogItem: styles.rca_dialog_item,
    dialogItemQuestion: styles.rca_dialog_item_question,
    dialogItemAnswer: styles.rca_dialog_item_answer,
    actionBar: styles.rca_action_bar,
    input: styles.rca_input,
    submit: styles.rca_submit,
    examplesWrapper: styles.rca_examples_wrapper,
    examplesTitle: styles.rca_examples_title,
    examples: styles.rca_examples,
    exampleItem: styles.rca_example_item,
    closedChat: styles.rca_closed_chat,
    closedChatWrapper: styles.rca_closed_chat_wrapper,
    closeBtn: styles.rca_close_button,
    // loadingDots: styles.rca_loading_dots,
    // loadingDot: styles.rca_loading_dot,
}

type Position = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | null

interface PropTypes {
  className?: string
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
  // simmple react component to be used as a chat icon
  ChatIcon?: React.ReactNode;
  alwaysOpen?: boolean;
}
const ReactAgentChat = ({
  submitBtnText = 'Send',
  examples = [{ text: "Who won the Eurovision Song Contest in 2022" }],
  examplesTitle = 'Examples',
  inputText,
  classes = {
    ...standardClasses
  },
  onSubmit = (text: string) => {},
  placeholder = 'Send a message ...',
  receivedMessage,
  startsOpen = false,
  alwaysOpen = true,
  ChatIcon,
  fixedPosition,
}: PropTypes) => {
  const [dialog, setDialog] = React.useState<Dialog[]>([])
  const [isOpen , setOpen] = React.useState<boolean>(startsOpen)
  const [currentText, setCurrentText] = React.useState<string>('')
  const dialogRef = React.useRef<HTMLDivElement>(null)
  // whenever the received message changes, add it to the first related question in the dialog. TODO: make this more robust
  React.useEffect(() => {
    if (receivedMessage) {
      const firstQuestionLoading = dialog.findIndex(
        (item) => item.answer === 'LOADING'
      )
      if (firstQuestionLoading !== -1) {
        const newDialog = [...dialog]
        newDialog[firstQuestionLoading].answer = receivedMessage
        setDialog(newDialog)
      }
          dialogRef.current && dialogRef.current.scrollTo(0, dialogRef.current.scrollHeight)

    }
  }, [receivedMessage])

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => event.target.select();
  const handleSubmit = (event: React.FormEvent<UsernameFormElement>) => {
    event.preventDefault()
    const inputText = event.currentTarget.elements.promptInput.value
    setDialog([...dialog, { question: inputText, answer: 'LOADING' }])
    onSubmit && onSubmit(inputText)
        // scroll down to the last chat message
    dialogRef.current && dialogRef.current.scrollTo(0, dialogRef.current.scrollHeight)
    event.currentTarget.reset()

  }

  const handleExampleClick = (example: Example) => {
    setDialog([...dialog, { question: example.text, answer: 'LOADING' }])
    onSubmit && onSubmit(example.text)
  }

  return isOpen || alwaysOpen ? (
    <div className={classes.wrapper} style={fixedPosition ? {position: fixedPosition ? "fixed" : "unset", bottom: "24px", right: "24px" } : {}}>
      { !alwaysOpen && <CloseButton onClick={() => setOpen(false)} />}
      <div ref={dialogRef} className={classes.dialog}>
        {/* show example prompts as long as the dialogue is empty */}
        {dialog.length === 0 && examples.length > 0 && (
          <Examples
            examples={examples}
            examplesTitle={examplesTitle}
            onClick={handleExampleClick}
            classes={classes}
          />
        )}
        {dialog.map((item, index) => (
          <div key={index} className={classes.dialogItem}>
            <div className={classes.dialogItemQuestion}>{item.question}</div>
            <div className={classes.dialogItemAnswer}>
              {item.answer === 'LOADING' ? <LoadingDots /> : item.answer}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className={classes.actionBar}>
          <input
            placeholder={placeholder}
            type="text"
            id="promptInput"
            className={classes.input}
            value={inputText}
            aria-label="Chat input"
            onChange={(e) => setCurrentText(e.target.value)}
            onFocus={handleFocus}
          />
          <button type="submit" aria-label="Send message" disabled={currentText === ""} className={classes.submit}>
            {submitBtnText}
          </button>
        </div>
      </form>
    </div>) : (
      <div className={classes.closedChatWrapper} style={fixedPosition ? {position: fixedPosition ? "fixed" : "unset", bottom: "24px", right: "24px" } : {}}>
        <a className={classes.closedChat} onClick={() => setOpen(true)}>
          {ChatIcon ? ChatIcon : ""}
        </a>
      </div>

  )
}

export default ReactAgentChat
