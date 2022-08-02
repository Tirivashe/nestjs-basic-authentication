import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { apiAuthSlice } from "../api/apiSlice";


interface AuthState {
  token: string | null
}

const initialState: AuthState = {
  token: null
};

export const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.token = null
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiAuthSlice.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload;
      }
    );
  }
});

export const { logout } = authSlice.actions
export const selectToken = (state: RootState) => state.userAuth.token

export default authSlice.reducer;
