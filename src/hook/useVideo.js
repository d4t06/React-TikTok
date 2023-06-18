import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { storingVideo } from "~/store/videoSlice";
import * as userServices from "../services/userService";

const useVideo = (pageNum = 1) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetch = async () => {
      
      try {
        setIsLoading(true);

        const res = await userServices.getSuggested(pageNum, 4, {
          signal: controller.signal,
        });

        setHasNextPage(!!res.length);
        setIsLoading(false);


        dispatch(
          storingVideo({
            videos: res,
          })
        );

      } catch (error) {
        console.log("useVideo error: ", error);
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetch();

    return () => controller.abort();
  }, [pageNum]);

  // console.log("usevideo")

  return { isLoading, isError, hasNextPage };
};

export default useVideo;
