import { baseApi } from "../../api/baseApi";

const imageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //upload image:
    uploadImage: builder.mutation({
      query: (data) => ({
        url: "/gallery/create-photo",
        method: "POST",
        body: data,
      }),
    }),
    //update image:
    updateImage: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `/gallery/update-photo/${_id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    //delete image:
    deleteImage: builder.mutation({
      query: (id) => ({
        url: `/gallery/delete-photo/${id}`,
        method: "DELETE",
      }),
    }),
    //get all images:
    getImages: builder.query({
      query: ({ folderId, search }) => {
        const query = new URLSearchParams();
        if (folderId) query.append("folderId", folderId); 
        if (search) query.append("searchTerm", search);
        return {
          url: `/gallery/all-photo?${query.toString()}`,
          method: "GET",
        };
      },
    }),
    //get image by id:
    getImageById: builder.query({
      query: (id) => ({
        url: `/gallery/single-photo/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUploadImageMutation,
  useUpdateImageMutation,
  useDeleteImageMutation,
  useGetImagesQuery,
  useGetImageByIdQuery,
} = imageApi;
