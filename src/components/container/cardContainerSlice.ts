import { createSlice } from '@reduxjs/toolkit'
import CardModel from '../../model/CardModel'

export const cardContainerSlice = createSlice({
  name: 'cardConatinerState',
  initialState: {
    cardModels: [] as Array<CardModel>,
    loading: false
  },
  reducers: {
    updateCardModels: (state, action) => {
      state.cardModels = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
})

export const { updateCardModels, setLoading } = cardContainerSlice.actions

export default cardContainerSlice.reducer
