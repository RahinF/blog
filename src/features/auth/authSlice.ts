import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import jwt_decode from "jwt-decode";

interface AuthState {
  userId: string | null;
  token: string | null;
}

const initialState: AuthState = {
  userId: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<string>): void {
      const accessToken = action.payload;
      const { userId }: { userId: string } = jwt_decode(accessToken);

      state.userId = userId;
      state.token = accessToken;
    },
    logout(): AuthState {
      return initialState;
    },
  },
});

export const selectCurrentUserId = (state: RootState) => state.auth.userId;
export const selectCurrentToken = (state: RootState) => state.auth.token;

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
