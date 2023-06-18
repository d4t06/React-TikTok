import { useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";

import { SelectAllVideo } from "~/store/videoSlice";
import useVideo from "~/hook/useVideo";

import ContentItem from "./ContentItem";

function Home() {
   const store = useSelector(SelectAllVideo);

   const [pageNum, setPageNum] = useState(1);
   const { isLoading, isError, hasNextPage } = useVideo(pageNum);

   const {videos} = store;

   const intObserver = useRef();
   const lastElementRef = useCallback(
      (post) => {
         if (isLoading) return;

         if (intObserver.current) intObserver.current.disconnect();

         intObserver.current = new IntersectionObserver((posts) => {
            if (posts[0].isIntersecting && hasNextPage) {
               console.log("near last element");
               setPageNum((prev) => prev + 1);
            }
         });

         if (post) intObserver.current.observe(post);
      },
      [isLoading, hasNextPage]
   );

   const renderContent = () => {
      return videos.map((item, index) => {
         if (videos.length === index + 1) {
            return <ContentItem index={index} key={index} ref={lastElementRef} data={item} />;
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
            <Modal setIsOpenModal={setIsOpenModal}>
               <VideoPreview
                  setIsOpenModal={setIsOpenModal}
                  end={end}
                  index={indexOfCurrent.current}
               />
            </Modal>
         )}
      </>
   );
}

export default Home;
