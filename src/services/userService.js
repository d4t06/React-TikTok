import * as request from "../utilities/request.js";

export const getSuggested = async (page = 1, perPage = 4, options) => {
   try {
      const res = await request.get("users/suggested", {
         params: {
            page,
            per_Page: perPage,
         },
         options,
      });
      return res.data;
   } catch (error) {
      console.log("looix");
   }
};
