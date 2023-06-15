import Skeleton from "./Skeleton";

function VideoItemSkeleton() {
   return (
      <>
         <Skeleton className={"avatar-circle"} />
         <div style={{ marginLeft: "10px", width: "100%" }}>
            <Skeleton className={"name width-25"} />
            <Skeleton className={"text width-100"} />
            <Skeleton className={"video"} />
         </div>
      </>
   );
}

export default VideoItemSkeleton;
