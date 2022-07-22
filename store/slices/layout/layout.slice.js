import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lang: null,
  sidebar: false,
  menu: false,
  loading: false,
  error: null,
  scroll: true
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload
    },
    setMenu: (state, action) => {
      state.menu = action.payload || !state.menu
    },
    resetLayout: (state, action) => {
      Object.assign(state, {
        ...initialState,
        lang: action.payload || state.lang,
      } );
    },
    setScroll: (state, action) => {
      state.scroll = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLang, setMenu, resetLayout, setScroll } = layoutSlice.actions

export default layoutSlice.reducer
