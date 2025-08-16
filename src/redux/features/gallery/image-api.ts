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
    // get all images:
    getImages: builder.query({
      query: ({ queryParams = {} }: { queryParams?: Record<string, any> }) => {
        const queryString = new URLSearchParams(queryParams).toString();
        return {
          url: `/gallery/all-photo?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["all-photo"],
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
