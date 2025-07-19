import { baseApi } from "../../api/baseApi";

const folderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create folder:
    createFolder: builder.mutation({
      query: (data) => ({
        url: "/gallery/create-folder",
        method: "POST",
        body: data,
      }),
    }),
    //delete folder:
    deleteFolder: builder.mutation({
      query: (id) => ({
        url: `/gallery/delete-folder/${id}`,
        method: "DELETE",
      }),
    }),
    //update folder:
    updateFolder: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `/gallery/update-folder/${_id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    //get all folders:
    getFolders: builder.query({
      query: ({ search }) => {
        const query = new URLSearchParams();
        if (search) query.append("searchTerm", search);
        return {
          url: `/gallery/all-folder?${query.toString()}`,
          method: "GET",
        };
      },
    }),
    //get folder by id:
    getFolderById: builder.query({
      query: (id) => ({
        url: `/gallery/single-folder/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useUpdateFolderMutation,
  useGetFoldersQuery,
  useGetFolderByIdQuery,
} = folderApi;
