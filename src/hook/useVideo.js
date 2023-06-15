import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { storingVideo } from "~/store/videoSlice";
import * as userServices from "../services/userService";

const useVideo = (pageNum = 1) => {
  const dispatch = useDispatch();
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

        dispatch(
          storingVideo({
            videos: res,
          })
        );

        setResults([])

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
