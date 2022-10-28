import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import styles from "./Video.module.scss";
import { useElementOnScreen } from "~/hook";
const cx = classNames.bind(styles);

function Video(props) {
   const videoRef = useRef();
   const [status, setStatus] = useState("pause");

   const handlePlay = () => {
      // videoRef.current.load();
      videoRef.current.play();
      setStatus("play");
   };
   const handlePause = (target) => {
      videoRef.current.pause();
      setStatus("pause");
   };

   const callbackFunction = (entries) => {
      const [entry] = entries;
      // entries.forEach((entry) => {
      // });
      entry.isIntersecting ? handlePlay() : handlePause();
   };

   useEffect(() => {
      const observer = new IntersectionObserver(callbackFunction, {
         threshold: 0.8,
      });
      observer.observe(videoRef.current);
   }, [videoRef]);

   return (
      <>
         {console.log("video-render")}
         <div className={cx("video-frame")}>
            <video className={cx("video")} ref={videoRef} src={props.src} />
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
export default Video;
