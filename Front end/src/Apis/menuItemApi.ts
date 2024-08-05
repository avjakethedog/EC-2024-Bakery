import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const menuItemApi = createApi({
    reducerPath: "menuItemApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:3000/api",
    }),
    tagTypes: ["MenuItems"],
    endpoints: (builder) => ({  getMenuItems: builder.query({
        query: () => ({
          url: "bakeGood/listAll",
        }),
        providesTags: ["MenuItems"],
      }),
      getMenuItemById: builder.query({
        query: (id) => ({
          url: `/bakeGood/getDetail/${id}`,
        }),
        providesTags: ["MenuItems"],
      })
    }),
  });
  export const { useGetMenuItemsQuery, useGetMenuItemByIdQuery} = menuItemApi;
  export default menuItemApi;
