import { createSlice } from '@reduxjs/toolkit'
import FooterSelectionModel from '../../model/FooterSelectionModel'
import AppRoute from '../../route/AppRoute';

export const appFooterSlice = createSlice({
  name: 'footerSelectionModel',
  initialState: {
    footerSelectionModel: {route: AppRoute.MY} as FooterSelectionModel
  },
  reducers: {
    update: (state, action) => {
      state.footerSelectionModel = action.payload;
    }
  }
})

export const { update } = appFooterSlice.actions

export default appFooterSlice.reducer
