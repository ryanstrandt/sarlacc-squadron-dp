import { configureStore } from '@reduxjs/toolkit'
import CharacterReducer from './features/Characters'

export default configureStore({
  reducer: {
    characters: CharacterReducer,
  },
})