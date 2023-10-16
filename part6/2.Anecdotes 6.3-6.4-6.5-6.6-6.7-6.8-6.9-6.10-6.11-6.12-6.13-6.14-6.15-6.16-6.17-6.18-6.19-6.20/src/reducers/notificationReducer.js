import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationShow(_, action) {
      return action.payload
    },
    notificationUnShow(_, __) {
      return ''
    }
  },
})

var timeout

export const showNotification = (content, time) => {
  return async dispatch => {
    dispatch(notificationShow(content))
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch(notificationUnShow())
    }, time * 1000)
  }
}

export const { notificationShow, notificationUnShow } = notificationSlice.actions
export default notificationSlice.reducer