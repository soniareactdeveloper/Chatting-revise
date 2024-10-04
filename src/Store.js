import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './Slices/UserSlice'
import ChatUserSlice from './Slices/ChatUserSlice'

export default configureStore({
  reducer: {
    counter: UserSlice,
    chatData: ChatUserSlice,
  },
})