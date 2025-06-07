import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IAuthUser {
    firstname: string
    lastname: string
    email: string
    password: string
    objectId?: string
}

const initialState: IAuthUser = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",   
    objectId: ""
}

const authUserSlice = createSlice({
    name: "authUser",
    initialState,
    reducers: {
        setSignIn: (state, action: PayloadAction<IAuthUser>) => {
            console.log("CHECK DATA FROM UI", action.payload)

            // Cara mutasi state dengan immer (lebih direkomendasikan)
            state.firstname = action.payload.firstname
            state.lastname = action.payload.lastname
            state.email = action.payload.email
            state.password = action.payload.password
            state.objectId = action.payload.objectId
        },
        setSignOut: () => {
            return initialState
        }
    }
})

export const { setSignIn, setSignOut } = authUserSlice.actions
export default authUserSlice.reducer
