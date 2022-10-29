import { apiSlice } from "../../app/api/apiSlice";
import IComment from "../../types/IComment";

interface ICommentRequest {
  postId: string;
  parentId?: string;
  author: string;
  text: string;
}

interface ICommentResponse {
    message: string;
  }

  interface IUpdateCommentRequest {
    commentId: string;
    text: string;
  }

  const commentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getAllComments: builder.query<IComment[], string>({
        query: (postId) => ({
          url: `/comments/${postId}`,
        }),
      }),

      createComment: builder.mutation<ICommentResponse, ICommentRequest>({
        query: (input) => ({
          url: "/comments",
          method: "POST",
          body: input,
        }),
      }),

      updateComment: builder.mutation<string, IUpdateCommentRequest>({
        query: (input) => ({
          url: "/comments",
          method: "PUT",
          body: input,
        }),
      }),

      deleteComment: builder.mutation<string, string>({
        query: (commentId) => ({
          url: "/comments",
          method: "DELETE",
          body: { commentId },
        }),
      }),
    }),
  });

apiSlice.enhanceEndpoints({
  endpoints: {
    getAllComments: {
      providesTags: ["Comments"],
    },
    createComment: {
      invalidatesTags: ["Comments"],
    },
    updateComment: {
      invalidatesTags: ["Comments"],
    },
    deleteComment: {
      invalidatesTags: ["Comments"],
    },
  },
});

export const {
  useGetAllCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApiSlice;
