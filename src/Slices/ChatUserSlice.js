import { createSlice } from '@reduxjs/toolkit'

export const ChatUserSlice = createSlice({
  name: 'chatData',
  initialState: {
    chatUserData: JSON.parse(localStorage.getItem('chatUser'))? JSON.parse(localStorage.getItem('chatUser')):null,
  },
  reducers: {
    ChatDataReducer: (state, action) => {
      state. chatUserData = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {ChatDataReducer} = ChatUserSlice.actions

export default ChatUserSlice.reducer