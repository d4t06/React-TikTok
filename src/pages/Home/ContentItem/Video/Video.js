import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from "./Video.module.scss";
import { useElementOnScreen } from "~/hook";
const cx = classNames.bind(styles);

function Video(props, ref) {
   const videoRef = useRef();
   const [status, setStatus] = useState("pause");

   const handlePlay = (target) => {
      // console.log(target);
      target.play();
      setStatus("play");
   };
   const handlePause = (target) => {
      target.pause();
      setStatus("pause");
   };

   const callbackFunction = (entries) => {
      const [entry] = entries;
      // entries.forEach((entry) => {
      // });
      entry.isIntersecting ? handlePlay(entry.target) : handlePause(entry.target);
   };

   useEffect(() => {
      const observer = new IntersectionObserver(callbackFunction, {
         threshold: 0.7,
      });
      observer.observe(videoRef.current);
   }, [videoRef]);

   return (
      <>
         {console.log("render")}
         <div className={cx("video-frame")}>
            <video className={cx("video")} ref={videoRef} src={props.src} />
            <button className={cx("play-btn")}>
               {status == "pause" && (
                  <span className={cx("paused-icon", "btn")} onClick={(e) => handlePlay(e)}>
                     <FontAwesomeIcon icon={faPlay} />
                  </span>
               )}
               {status == "play" && (
                  <span className={cx("play-icon", "btn")} onClick={(e) => handlePause(e)}>
                     <FontAwesomeIcon icon={faPause} />
                  </span>
               )}
            </button>
         </div>
      </>
   );
}
export default forwardRef(Video);
