import { createSlice } from '@reduxjs/toolkit'
import FavoriteModel from '../../model/FavoriteModel'

export const favoriteSlice = createSlice({
  name: 'favoriteModels',
  initialState: {
    favoriteModels: [] as Array<FavoriteModel>
  },
  reducers: {
    update: (state, action) => {
      state.favoriteModels = [...state.favoriteModels.filter((it) => it.key != action.payload.key), action.payload]
    }
  }
})

export const { update } = favoriteSlice.actions

export default favoriteSlice.reducer
