import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";
import { forwardRef, useEffect, useRef, useState } from "react";

import VolumeControl from "./section/VolumeControl";

import styles from "./PlayerItem.module.scss";
import { useDispatch } from "react-redux";
import { setOpenModal } from "~/store/modalSlice";
const cx = classNames.bind(styles);

function PlayerItem({ videoRef, end, index, isPlaying }, ref) {
   const dispatch = useDispatch();

   const [isIntoView, setIsIntoView] = useState(false);

   const indexOfCurrent = useRef();
   const timerId = useRef();

   const handlePlayPause = () => {
      !isPlaying ? play() : pause();
   };

   const play = () => {
      videoRef.current.play();
      console.log("play");
   };
   const pause = () => {
      console.log("pause");
      videoRef.current.pause();
   };

   const handleSeek = (e) => {
      const rect = e.target.getBoundingClientRect();
      const seekTime =
         ((e.clientX - rect.left) / videoRef.current.durationLineWidth) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime.toFixed(1);

      if (!isPlaying) play();
   };

   const handleOverlayClick = (e) => {
      if (end) {
         return handlePlayPause();
      }

      let trigger = e.target;
      let tempParent = trigger;

      while (tempParent.parentElement) {
         let parent = tempParent.parentElement;
         if (parent.classList.value.includes("item-container")) {
            tempParent = parent;
            break;
         }
         tempParent = parent;
      }

      tempParent.classList.add("trigger");
      indexOfCurrent.current = index;
      if (isPlaying) pause();
      dispatch(
         setOpenModal({
            isOpenModal: true,
            index: index,
            time: videoRef.current.currentTime.toFixed(1),
         })
      );
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

   // console.log("player render", videoRef.current);

   return (
      <>
         <div
            className={cx("overlay", end ? "preview" : "")}
            onClick={(e) => handleOverlayClick(e)}
         >
            <div className={cx("cta")}>
               
               <>
                  <button
                     className={cx("play-pause-btn")}
                     onClick={(e) => {
                        e.stopPropagation();
                        handlePlayPause();
                     }}
                  >
                     {isPlaying ? (
                        <span>
                           <FontAwesomeIcon className={cx("pause-btn")} icon={faPause} />
                        </span>
                     ) : (
                        <span className={cx("play-btn")}>
                           <FontAwesomeIcon icon={faPlay} />
                        </span>
                     )}
                  </button>

                  {!end && (
                     <div className={cx("volume-control-wrapper")}>
                        <VolumeControl videoRef={videoRef} />
                     </div>
                  )}
               </>
               
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
