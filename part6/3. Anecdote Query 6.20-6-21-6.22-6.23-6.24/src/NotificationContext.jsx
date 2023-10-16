import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (_, action) => {
    switch (action.type) {
        case "CREATE":
            return `anecdote '${action.payload}' created`
        case "VOTE":
            return `anecdote '${action.payload}' voted`
        case "ERROR_POST_CREATE":
            return `too short anecdote, must have length 5 or more`
        default:
            return ''
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext
