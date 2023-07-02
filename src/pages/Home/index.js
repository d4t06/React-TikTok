import { useRef, useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { SelectAllVideoStore, nextPage } from "~/store/videoSlice";
import { SelectAllModalStore, setVolume, setMute } from "~/store/modalSlice";
import useVideo from "~/hook/useVideo";

import ContentItem from "./ContentItem";
import Modal from "~/components/Modal";
import VideoPreview from "~/components/VideoPreview";
import useLocalStorage from "~/hook/useLocalStorage";

function Home() {
   const videoStore = useSelector(SelectAllVideoStore);
   const modalStore = useSelector(SelectAllModalStore);
   const dispath = useDispatch();

   const { videos, pageNum } = videoStore;
   const { isOpenModal } = modalStore;

   const { isLoading, isError, hasNextPage } = useVideo(pageNum);
   const [LCSvolume, setLCSVolume] = useLocalStorage('volume', 1)
   const [LCSmute, setLCSMute] = useLocalStorage('mute', false)

   const intObserver = useRef();
   const lastElementRef = useCallback(
      (post) => {
         if (isLoading) return;

         if (intObserver.current) intObserver.current.disconnect();

         intObserver.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
               dispath(nextPage());
            }
         });

         if (post) intObserver.current.observe(post);
      },
      [isLoading, hasNextPage]
   );

   // init
   useEffect(() => {
      dispath(nextPage({ init: true }));
      dispath(setVolume({volume: LCSvolume}));
      dispath(setMute({isMute: LCSmute}));

   }, []);

   const useMemoRenderContent = useMemo(() => {
      return videos.map((item, index) => {
         if (videos.length === index + 1) {
            return (
               <ContentItem
                  index={index + 1}
                  key={index}
                  ref={lastElementRef}
                  data={item}
               />
            );
         }
         return <ContentItem index={index + 1} key={index} data={item} />;
      });
   }, [videos, isLoading]);

   const skeletons = [...Array(4).keys()].map((index) => {
      return <ContentItem skeleton key={index} />;
   });

   let content;
   if (isError) content = <h1>Error</h1>;
   else content = useMemoRenderContent;

   // console.log("home render isLoading =", isLoading);

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
