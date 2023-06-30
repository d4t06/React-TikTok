import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";
import { forwardRef, useEffect, useRef, useState } from "react";

import VolumeControl from "./section/VolumeControl";

import styles from "./PlayerItem.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { SelectAllModalStore, setOpenModal } from "~/store/modalSlice";
import { setCurrentTime, setCurrentIndex, SelectAllTimeStore } from "~/store/timeSlice";
const cx = classNames.bind(styles);

function PlayerItem(
   { videoRef, currentTimeText, currentTimeLine, end, index, isPlaying, loading },
   ref
) {
   const dispatch = useDispatch();
   const modalStore = useSelector(SelectAllModalStore)
   const timeStore = useSelector(SelectAllTimeStore)

   const {currentIndex} = timeStore
   const {isOpenModal} = modalStore

   const indexOfCurrent = useRef();
   const timerId = useRef();
   // const isIntoView = useRef()

   const [isIntoView, setIsIntoView]= useState(false);

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
         ((e.clientX - rect.left) / videoRef.current.durationLineWidth) *
         videoRef.current.duration;
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

   const handleTimeText = (duration) => {
      let minute = 0;
      while (duration > 60) {
         duration -= 60;
         minute++;
      }

      if (duration > 10) {
         return `0${minute}:${Number.parseInt(duration)}`;
      }
      return `0${minute}:0${Number.parseInt(duration)}`;
   };

   let timeSlider = (
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
   );

   // auto play video when scroll in to view
   useEffect(() => {
      const callbackFunction = (entries) => {
         const [entry] = entries;
         if (end || isOpenModal) return
         setIsIntoView(entry.isIntersecting);
      };

      const observer = new IntersectionObserver(callbackFunction, {
         threshold: 0.8,
      });
      observer.observe(videoRef.current);
   }, []);

   // play video denounce
   useEffect(() => {
      if (isOpenModal || end) return;
      if (loading) return;

      timerId.current = setTimeout(() => {
         if (isIntoView) {
            dispatch(setCurrentIndex({index: +videoRef.current.attributes.index.value}))
         }
      }, 600);

      return () => {
         console.log("clear time out");
         clearTimeout(timerId.current);
         if (end) return;
      };
   }, [isIntoView, loading]);

   useEffect(() => {
      if (currentIndex === index) play();
      else if (isPlaying) pause();
   }, [currentIndex])

   useEffect(() => {
      const videoEl = videoRef.current;
      const handlePlaying = () => {
         const duration = videoEl.duration;
         const videoCurrentTime = videoEl.currentTime;

         currentTimeText.current.innerText = handleTimeText(videoCurrentTime);
         const newWidth =
            (videoCurrentTime / duration) * videoRef.current.durationLineWidth;

         currentTimeLine.current.style.width = newWidth + "px";

         dispatch(setCurrentTime({ time: videoCurrentTime }));
      };

      videoEl.addEventListener("timeupdate", handlePlaying);

      return () => {
         videoEl.removeEventListener('timeupdate', handlePlaying)
      }
   }, []);

   // console.log("player render index =", index)

   return (
      <>
         <div
            className={cx("overlay", end ? "preview" : "")}
            onClick={(e) => handleOverlayClick(e)}
            style={{ position: "relative" }}
            ref={ref.playerRef}
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
                           <FontAwesomeIcon
                              className={cx("pause-btn")}
                              icon={faPause}
                           />
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

               {timeSlider}
            </div>
         </div>
      </>
   );
}

export default forwardRef(PlayerItem);
