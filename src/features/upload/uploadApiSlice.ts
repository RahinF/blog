import { apiSlice } from "../../app/api/apiSlice";

const uploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<string, FormData>({
      query: (file) => ({
        url: "/upload",
        method: "POST",
        body: file,
      }),
    }),

    deleteFile: builder.mutation<void, string>({
      query: (filename) => ({
        url: "/upload",
        method: "DELETE",
        body: { filename },
      }),
    }),
  }),
});

export const { useUploadFileMutation, useDeleteFileMutation } = uploadApiSlice;
