import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from "./Video.module.scss";
import { useElementOnScreen } from "~/hook";
const cx = classNames.bind(styles);

function Video(props, ref) {
   const [status, setStatus] = useState("pause");

   const handlePlay = () => {
      videoRef.current.play();
      setStatus("play");
   };
   const handlePause = () => {
      videoRef.current.pause();
      setStatus("pause");
   };

   const handlePosition = () => {
      console.log(
         "top",
         videoRef.current.getBoundingClientRect().top - 60 + " bot",
         videoRef.current.getBoundingClientRect().bottom - 60 + "window",
         window.innerHeight
      );
   };

   useImperativeHandle(ref, () => ({
      play: handlePlay,
      pause: handlePause,
   }));

   const videoRef = useRef();
   return (
      <>
         {console.log("render")}
         <div className={cx("video-frame")}>
            <video className={cx("video")} ref={videoRef} src={props.src} onClick={handlePosition} />
            <button className={cx("play-btn")}>
               {status == "pause" && (
                  <span className={cx("paused-icon", "btn")} onClick={() => handlePlay()}>
                     <FontAwesomeIcon icon={faPlay} />
                  </span>
               )}
               {status == "play" && (
                  <span className={cx("play-icon", "btn")} onClick={() => handlePause()}>
                     <FontAwesomeIcon icon={faPause} />
                  </span>
               )}
            </button>
         </div>
      </>
   );
}
export default forwardRef(Video);
