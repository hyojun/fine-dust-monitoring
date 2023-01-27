import { configureStore } from '@reduxjs/toolkit'
import cardReducer from '../components/card/cardSlice'
import cardContainerReducer from '../components/container/cardContainerSlice'
import appHeaderReducer from '../components/layout/appHeaderSlice'
import appFooterReducer from '../components/layout/appFooterSlice'

const store = configureStore({
  reducer: {
    cardReducer,
    cardContainerReducer,
    appHeaderReducer,
    appFooterReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store;
