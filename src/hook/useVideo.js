import { useState, useEffect } from "react";

import * as userServices from "../services/userService";

const useVideo = (pageNum = 1) => {
   const [results, setResults] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [isError, setIsError] = useState(false);
   const [hasNextPage, setHasNextPage] = useState(false);

   useEffect(() => {
      const controller = new AbortController();

      const fetch = async () => {
         setIsLoading(true);
         setIsError(false);

         try {
            const res = await userServices.getSuggested(pageNum, 4, {
               signal: controller.signal,
            });
            if (!results.length) {
               setResults(res);
            } else {
               setResults((prev) => [...prev, ...res]);
            }
            setHasNextPage(!!res.length);
            setIsLoading(false);
         } catch (error) {
            console.log("useVideo error: ", error);
            setIsLoading(false);
            setIsError(true);
         }
      };

      fetch();

      return () => controller.abort();
   }, [pageNum]);

   return { results, isLoading, isError, hasNextPage };
};

export default useVideo;
