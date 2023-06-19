import { useRef, useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { SelectAllVideoStore, nextPage } from "~/store/videoSlice";
import { SelectAllModalStore } from "~/store/modalSlice";
import useVideo from "~/hook/useVideo";

import ContentItem from "./ContentItem";
import Modal  from "~/components/Modal";
import  VideoPreview  from "~/components/VideoPreview";

function Home() {
  const videoStore = useSelector(SelectAllVideoStore);
  const modalStore = useSelector(SelectAllModalStore)
  const dispath = useDispatch()
  // const [pageNum, setPageNum] = useState(1)


  // console.log("store =", store)

  const { videos, pageNum } = videoStore;
  const { isOpenModal } = modalStore;

  const { isLoading, isError, hasNextPage } = useVideo(pageNum);

  const intObserver = useRef();
  const lastElementRef = useCallback(
    (post) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          dispath(nextPage())
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  useEffect(() => {
    dispath(nextPage({init: true}))
  }, [])

  const renderContent = () => {
    return videos.map((item, index) => {
      if (videos.length === index + 1) {
        return (
          <ContentItem
            index={index}
            key={index}
            ref={lastElementRef}
            data={item}
          />
        );
      }
      return <ContentItem index={index} key={index} data={item} />;
    });
  };

  const skeletons = [...Array(4).keys()].map((index) => {
    return <ContentItem skeleton key={index} />;
  });

  let content;
  if (isError) content = <h1>Error</h1>;
  else content = renderContent();

  // 4 lan render
  return (
    <>
      {content} {isLoading && skeletons}
      {isOpenModal && (
        <Modal>
          <VideoPreview end />
        </Modal>
      )}
    </>
  );
}

export default Home;
