import { apiSlice } from "../api/apiSlice";
import { setOrders } from "./orderSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (data) => ({
        url: `/order`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),

    updateOrder: builder.mutation({
      query: (data) => ({
        url: `/order/${data._id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],

      onSuccess: (_, variables, api, queryFulfilled) => {
        api.endpoints.getAllOrders.queryFn().then(queryFulfilled);
      },
    }),

    getAllOrders: builder.query({
      query: () => `/order/findAll`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setOrders(result.data));
        } catch (err) {}
      },
      providesTags: ["order"],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useUpdateOrderMutation,
  useGetAllOrdersQuery,
} = orderApi;
