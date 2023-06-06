import { useState, useRef, useCallback } from "react";

import useVideo from "~/hook/useVideo";
import ContentItem from "./ContentItem";

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

   if (isError) return <h1>Error when fetching</h1>;

   const renderContent = () => {
      return results.map((item, index) => {
         if (results.length === index + 1) {
            return <ContentItem key={index} ref={lastElementRef} data={item} />;
         }
         return <ContentItem key={index} data={item} />;
      });
   };

   return (
      <>
         {isLoading && <h1>Loading more video...</h1>}
         {!!results.length && renderContent()}
      </>
   );
}

export default Home;
