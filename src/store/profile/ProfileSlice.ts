import { TLoading } from "@/types/shared";
import { TUser } from "@/types/User";
import { createSlice } from "@reduxjs/toolkit";
import actGetUserProfile from "./act/actGetUserProfile";
import { isString } from "@/types/gurads";
type TProfileState = {
  loading: TLoading,
  error: string | null,
  user: TUser | null
}

const initialState: TProfileState = {
  user: null,
  loading: "idle",
  error: null,
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetUserProfile.pending, (state) => {
      state.loading = "pending"
      state.error = null
    }),

    builder.addCase(actGetUserProfile.fulfilled, (state, action) => {
      state.loading = "succeeded"
      state.user = action.payload.user
    }),

    builder.addCase(actGetUserProfile.rejected, (state, action) => {
      state.loading = "failed"
      if (isString(action.payload)) {
        state.error = action.payload
      }
    })
  },
})

// export const { updateUserImg } = profileSlice.actions

export { actGetUserProfile }

export default profileSlice.reducer