import { forwardRef, useImperativeHandle, useRef } from "react";

function VideoItem(props, ref) {
   const videoRef = useRef();

   useImperativeHandle(ref, () => ({
      play: () => {
         videoRef.current.play();
      },
      pause: () => {
         videoRef.current.pause();
      },
   }));

   return <video ref={videoRef} src={props.src} controls style={{ height: "100%" }} />;
}
export default forwardRef(VideoItem);
