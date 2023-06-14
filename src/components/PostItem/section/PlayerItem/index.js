import {
   faPause,
   faPlay,
   faVolumeHigh,
   faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";
import { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./PlayerItem.module.scss";
import Menu from "~/components/Menu";

const cx = classNames.bind(styles);

function PlayerItem({ videoEl, preview }, ref) {
   const [isIntoView, setIsIntoView] = useState(false);
   const [isPlaying, setIsPlaying] = useState(false);
   const [isMute, setIsMute] = useState(false);

   const currentVolumeLine = useRef();
   const currentVideoEl = useRef();
   const timerId = useRef();

   const handlePlayPause = () => {
      !isPlaying ? play() : pause();
   };

   const play = () => {
      videoEl.play();
      setIsPlaying(true);
   };
   const pause = () => {
      videoEl.pause();
      setIsPlaying(false);
   };

   const handleSeek = (e) => {
      const rect = e.target.getBoundingClientRect();
      const seekTime =
         ((e.clientX - rect.left) / videoEl.durationLineWidth) *
         videoEl.duration;
      videoEl.currentTime = seekTime.toFixed(1);

      if (!isPlaying) play();
   };

   const handleVolume = (e) => {
      const rect = e.target.getBoundingClientRect();
      const volume =
         (rect.bottom.toFixed(0) - e.clientY) / e.target.offsetHeight;

      videoEl.volume = volume.toFixed(1);
      currentVolumeLine.current.style.height = volume.toFixed(2) * 100 + "%";
   };

   const handleMute = () => {
      setIsMute(!isMute);

      !isMute ? (videoEl.muted = true) : (videoEl.muted = false);
   };

   // auto play video when scroll in to view
   // useEffect(() => {
   //    const callbackFunction = (entries) => {
   //       const [entry] = entries;
   //       setIsIntoView(entry.isIntersecting);
   //       currentVideoEl.current = entry.target;
   //    };

   //    const observer = new IntersectionObserver(callbackFunction, {
   //       threshold: 0.8,
   //    });
   //    observer.observe(videoEl);
   // }, []);

   // play video denounce
   useEffect(() => {
      timerId.current = setTimeout(() => {
         if (!isIntoView) {
            pause();
            return;
         } else {
            console.log("play");
            if (currentVideoEl.current) {
               currentVideoEl.current.pause();
            }
            play();
         }
      }, 600);

      return () => {
         console.log("clear time out");
         clearTimeout(timerId.current);
         pause();
      };
   }, [isIntoView]);

   return (
      <>
         <div className={cx("wrapper", preview ? "preview" : "")}>
            <div className={cx("cta")}>
               <button
                  className={cx("play-btn")}
                  onClick={(e) => {
                     e.stopPropagation();
                     handlePlayPause();
                  }}
               >
                  {isPlaying ? (
                     <span
                        ref={ref.playBtn}
                        className={cx("play-icon", "btn")}
                        onClick={(e) => setIsPlaying(false)}
                     >
                        <FontAwesomeIcon icon={faPause} />
                     </span>
                  ) : (
                     <span
                        ref={ref.playBtn}
                        className={cx("paused-icon", "btn")}
                        onClick={() => setIsPlaying(true)}
                     >
                        <FontAwesomeIcon icon={faPlay} />
                     </span>
                  )}
               </button>
               <Menu
                  content={
                     <div className={cx("volume-slider")}>
                        <div
                           className={cx("volume-duration")}
                           onClick={(e) => {
                              e.stopPropagation();
                              handleVolume(e);
                           }}
                           ref={ref.volumeLine}
                        >
                           <div
                              className={cx("volume-current")}
                              ref={currentVolumeLine}
                           ></div>
                        </div>
                     </div>
                  }
                  option={{
                     placement: "top",
                     // delay: [200, 0],
                     hideOnClick: false,
                     appendTo: () => document.body,
                  }}
               >
                  <button
                     ref={ref.volumeBtn}
                     onClick={(e) => {
                        e.stopPropagation();
                        handleMute();
                     }}
                     className={cx("btn", "volume-icon")}
                  >
                     {!isMute && (
                        <span>
                           <FontAwesomeIcon icon={faVolumeHigh} />
                        </span>
                     )}
                     {isMute && (
                        <span>
                           <FontAwesomeIcon icon={faVolumeXmark} />
                        </span>
                     )}
                  </button>
               </Menu>

               {/* {!isLoadingVideo && ( */}
               <div className={cx("time-slider")}>
                  <div
                     className={cx("video-duration")}
                     onClick={(e) => handleSeek(e)}
                     ref={ref.durationLine}
                  >
                     <div
                        className={cx("time-current")}
                        ref={ref.currentTimeLine}
                     ></div>
                  </div>
                  <div className={cx("time-text-wrapper")}>
                     <div className={cx("time-text")}>
                        <div className="time-current-wrapper">
                           <span
                              className={cx("current")}
                              ref={ref.currentTimeText}
                           >
                              00:00
                           </span>
                        </div>
                        <span className={cx("duration")} ref={ref.durationText}>
                           00:00
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* )} */}
      </>
   );
}

export default forwardRef(PlayerItem);
