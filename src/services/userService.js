import * as request from "../utilities/request.js";

export const getSuggested = async (page = 1, perPage = 5) => {
   try {
      const res = await request.get("users/suggested", {
         params: {
            page,
            per_Page: perPage,
         },
      });
      return res.data;
   } catch (error) {
      console.log("looix");
   }
};
