import { apiSlice } from "../api/apiSlice";
import { setPromocodes } from "./promocodeSlice";

export const promocodesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPromocode: builder.mutation({
      query: (data) => ({
        url: `/promocode`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["promocode"],
    }),

    updatePromocode: builder.mutation({
      query: (data) => ({
        url: `/promocode/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["promocode"],
    }),

    getAllPromocodes: builder.query({
      query: () => `/promocode/findAll`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setPromocodes(result.data));
        } catch (err) {}
      },
      providesTags: ["promocode"],
    }),
  }),
});

export const {
  useGetAllPromocodesQuery,
  useAddPromocodeMutation,
  useUpdatePromocodeMutation,
} = promocodesApi;
