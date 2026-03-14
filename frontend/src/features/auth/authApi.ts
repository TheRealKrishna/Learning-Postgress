import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

type SignupResponse = {
  token: string;
  user: User;
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),
    // login and other endpoints can be added here
  }),
});

export const { useSignupMutation } = authApi;
