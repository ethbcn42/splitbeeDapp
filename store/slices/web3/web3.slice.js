import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isConnected: null,
    address: null,
    token: null,
    network: null,
    isAdmin: false,
    loading: false,
    error: null,
}

export const web3slice = createSlice({
    name: 'web3',
    initialState,
    reducers: {
        connect: (state, action) => {
            Object.assign(state, action.payload)
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        resetWeb3: (state) => {
            state = initialState
        },
        disconnect: (state) => {
            state = initialState
        },
        selectNetwork: (state, action) => {
            state.network = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { connect, setLoading, setError, resetWeb3, disconnect, selectNetwork } = web3slice.actions

export default web3slice.reducer
