import { useState, useRef, useCallback } from "react";

import useVideo from "~/hook/useVideo";
import ContentItem from "./ContentItem";
import ContentItemSkeleton from "~/components/Skeleton/ContentItemSkeleton";

function Home() {
   const [pageNum, setPageNum] = useState(1);
   const { results, isLoading, isError, hasNextPage } = useVideo(pageNum);

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
      return results.map((item, index) => {
         if (results.length === index + 1) {
            return <ContentItem key={index} ref={lastElementRef} data={item} />;
         }
         return <ContentItem key={index} data={item} />;
      });
   };

   const skeletons = [...Array(4).keys()].map((index) => {
      return <ContentItem skeleton key={index} />;
   });

   let content;
   if (isError) content = <h1>Error</h1>;
   else content = renderContent();
   return (
      <>
         {content} {isLoading && skeletons}
      </>
   );
}

export default Home;
