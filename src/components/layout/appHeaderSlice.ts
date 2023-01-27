import { createSlice } from '@reduxjs/toolkit'
import HeaderSelectionModel from '../../model/HeaderSelectionModel'

export const headerSelectionSlice = createSlice({
  name: 'headerSelectionModel',
  initialState: {
    headerSelectionModel: {location: '서울', station: '강남구'} as HeaderSelectionModel
  },
  reducers: {
    update: (state, action) => {
      state.headerSelectionModel = action.payload;
    }
  }
})

export const { update } = headerSelectionSlice.actions

export default headerSelectionSlice.reducer
