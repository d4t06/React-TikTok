import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SelectAllVideoStore, storingVideo } from "~/store/videoSlice";
import * as userServices from "../services/userService";

const useVideo = () => {
  const dispatch = useDispatch();
  const videoStore = useSelector(SelectAllVideoStore)

  const firstUpdate = useRef(true);

  const {pageNum} = videoStore
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {

    const controller = new AbortController();
    const fetch = async () => {
      
      try {
        setIsLoading(true);

        const res = await userServices.getSuggested(pageNum || 1, 4, {
          signal: controller.signal,
        });


        setHasNextPage(!!res.length);
        setIsLoading(false);

        dispatch(
          storingVideo({
            videos: res,
            hasNextPage: !!res.length,
          })
        );

      } catch (error) {
        console.log("useVideo error: ", error);
        setIsLoading(false);
        setIsError(true);
      }
    };

    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    };
    fetch();

    return () => controller.abort();
  }, [pageNum]);

  return { isLoading, isError, hasNextPage };
};

export default useVideo;
