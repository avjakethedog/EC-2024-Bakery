import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/order', 
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderInfo) => ({
        url: 'create',
        method: 'POST',
        body: orderInfo,
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ orderId, orderInfo }) => ({
        url: `update/${orderId}`,
        method: 'PATCH',
        body: orderInfo,
      }),
    }),
    getCart: builder.query({
      query: (userId) => ({
        url: `getCart/${userId}`,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useUpdateOrderMutation, useGetCartQuery } = orderApi;
export default orderApi;
