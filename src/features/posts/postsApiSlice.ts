import { apiSlice } from "../../app/api/apiSlice";
import IPost from "../../types/IPost";
import IPostRequest from "../../types/IPostRequest";

const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<IPost[], void>({
      query: () => ({
        url: "/posts",
      }),
    }),

    getPostsByCategory: builder.query<IPost[], string | undefined>({
      query: (category) => ({
        url: `/posts?category=${category}`,
      }),
    }),

    getPost: builder.query<IPost, string | undefined>({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
    }),

    createPost: builder.mutation<string, IPostRequest>({
      query: (input) => ({
        url: "/posts",
        method: "POST",
        body: input,
      }),
    }),

    updatePost: builder.mutation<string, IPostRequest & { postId: string }>({
      query: (input) => ({
        url: "/posts",
        method: "PUT",
        body: input,
      }),
    }),

    deletePost: builder.mutation<string, string>({
      query: (postId) => ({
        url: "/posts",
        method: "DELETE",
        body: { postId },
      }),
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostsByCategoryQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApiSlice;
