import { apiSlice } from "../../app/api/apiSlice";
import ILoginForm from "../../types/ILoginForm";
import IToken from "../../types/IToken";
import { logout, setCredentials } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IToken, ILoginForm>({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;

          dispatch(setCredentials(accessToken));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    refresh: builder.mutation<IToken, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;

          dispatch(setCredentials(accessToken));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          dispatch(apiSlice.util.resetApiState());
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } =
  authApiSlice;
