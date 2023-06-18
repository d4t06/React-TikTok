import { faPause, faPlay, faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";
import { forwardRef, useEffect, useRef, useState } from "react";

import Modal from "~/components/Modal";
import VideoPreview from "~/components/VideoPreview";
import VolumeControl from "./section/VolumeControl";

import styles from "./PlayerItem.module.scss";
const cx = classNames.bind(styles);

function PlayerItem({ videoRef, end, index }, ref) {

   const [isOpenModal, setIsOpenModal] = useState(false);

   const [isIntoView, setIsIntoView] = useState(false);
   const [isPlaying, setIsPlaying] = useState(false);

   const indexOfCurrent = useRef();
   const timerId = useRef();

   console.log("player render", videoRef.current);

   const handlePlayPause = () => {
      !isPlaying ? play() : pause();
   };

   const play = () => {
      videoRef.current.play();
      console.log("play");
      setIsPlaying(true);
   };
   const pause = () => {
      console.log("pause");
      videoRef.current.pause();
      setIsPlaying(false);
   };

   const handleSeek = (e) => {
      const rect = e.target.getBoundingClientRect();
      const seekTime = ((e.clientX - rect.left) / videoRef.current.durationLineWidth) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime.toFixed(1);

      if (!isPlaying) play();
   };

   const handleOverlayClick = (e) => {
      if (end) {
         return handlePlayPause();
      }
      indexOfCurrent.current = index;
      if (isPlaying) pause();
      setIsOpenModal(true);
   };

   // auto play video when scroll in to view
   // useEffect(() => {
   //    const callbackFunction = (entries) => {
   //       const [entry] = entries;
   //       if (end || isOpenModal) return
   //       setIsIntoView(entry.isIntersecting);
   //    };

   //    const observer = new IntersectionObserver(callbackFunction, {
   //       threshold: 0.8,
   //    });
   //    observer.observe(videoRef.current);
   // }, []);

   // play video denounce
   // useEffect(() => {
   //    if (isOpenModal || end) return;

   //    timerId.current = setTimeout(() => {
   //       if (!isIntoView) {
   //          pause();
   //          return;
   //       } else {
   //          console.log("play");
   //          play();
   //       }
   //    }, 600);

   //    return () => {
   //       console.log("clear time out");
   //       clearTimeout(timerId.current);
   //       if (end) return;
   //       pause();
   //    };
   // }, [isIntoView]);

   return (
      <>
         <div
            className={cx("overlay", end ? "preview" : "")}
            onClick={() => handleOverlayClick()}
         >
            <div className={cx("cta")}>
               {!end && (
                  <>
                     {" "}
                     <button
                        className={cx("play-btn", "btn")}
                        onClick={(e) => {
                           e.stopPropagation();
                           handlePlayPause();
                        }}
                     >
                        {isPlaying ? (
                           <span
                              onClick={(e) => setIsPlaying(false)}
                           >
                              <FontAwesomeIcon icon={faPause} />
                           </span>
                        ) : (
                           <span
                              onClick={() => setIsPlaying(true)}
                           >
                              <FontAwesomeIcon icon={faPlay} />
                           </span>
                        )}
                     </button>
                     <div className={cx("volume-control-wrapper")}>
                        <VolumeControl videoRef={videoRef} />
                     </div>
                  </>
               )}

               {/* {!isLoadingVideo && ( */}
               <div className={cx("time-slider")}>
                  <div
                     className={cx("video-duration")}
                     onClick={(e) => {
                        e.stopPropagation();
                        handleSeek(e);
                     }}
                     ref={ref.durationLine}
                  >
                     <div className={cx("time-current")} ref={ref.currentTimeLine}></div>
                  </div>
                  <div className={cx("time-text-wrapper")}>
                     <div className={cx("time-text")}>
                        <div className="time-current-wrapper">
                           <span className={cx("current")} ref={ref.currentTimeText}>
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

         
      </>
   );
}

export default forwardRef(PlayerItem);
