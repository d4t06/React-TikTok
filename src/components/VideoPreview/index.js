import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faClose,
   faFlag,
   faChevronUp,
   faChevronDown,
   faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import { useDispatch, useSelector } from "react-redux";
import { SelectAllVideoStore, nextPage } from "~/store/videoSlice";

import VideoItem from "../PostItem/section/VideoItem";
import PostItemHeader from "../PostItem/section/PostItemHeader";

import styles from "./VideoPreview.module.scss";
import { SelectAllModalStore, setOpenModal } from "~/store/modalSlice";
import ShareControl from "../PostItem/section/ShareControl";

const cx = classNames.bind(styles);

function VideoPreview() {
   const dispath = useDispatch();
   const videoStore = useSelector(SelectAllVideoStore);
   const modalStore = useSelector(SelectAllModalStore);

   const { index, currentTime, isOpenModal } = modalStore;
   const { videos, hasNextPage } = videoStore;

   const [currentIndex, SetCurrentIndex] = useState(index);
   const triggerElement = useRef();
   const newTriggerElement = useRef();

   const handlePrevious = () => {
      SetCurrentIndex((prev) => prev - 1);
   };

   const handleNext = () => {
      newTriggerElement.current = newTriggerElement.current.nextSibling;

      newTriggerElement.current.scrollIntoView({ behavior: "instant", block: "start" });
      SetCurrentIndex((prev) => prev + 1);
   };

   const handleCloseModal = () => {
      triggerElement.current.classList.remove("trigger");

      const currentElement = newTriggerElement.current;
      const videoElement = currentElement.querySelector("video");

      videoElement.currentTime = currentTime;

      dispath(setOpenModal({ isOpenModal: false }));

      videoElement.play();
   };

   const indexControl = (
      <>
         <button
            className={cx("previous", "btn", currentIndex === 0 ? "disable" : "")}
            onClick={() => handlePrevious()}
         >
            <span>
               <FontAwesomeIcon icon={faChevronUp} />
            </span>
         </button>
         <button className={cx("next", "btn")} onClick={() => handleNext()}>
            <span>
               <FontAwesomeIcon icon={faChevronDown} />
            </span>
         </button>
      </>
   );

   let headerContent = (
      <>
         <div className={cx("header")}>
            <button className={cx("close-btn", "btn")} onClick={() => handleCloseModal()}>
               <FontAwesomeIcon icon={faClose} />
            </button>
            <button className={cx("report-btn", "btn")}>
               <FontAwesomeIcon icon={faFlag} />
               <span>Report</span>
            </button>
         </div>
      </>
   );

   const videoDesc = (
      <p className={cx("content-desc")}>
         {videos[currentIndex].popular_video.description}
         <span>#monquayeuthuong</span>
         <span>#ngaycuame</span>
         <span>#20/10</span>
      </p>
   );

   const musicDesc = (
      <a className={cx("music-info")} href="/home">
         <span>
            <FontAwesomeIcon icon={faMusic} />
         </span>
         Music - Steal My Girls
      </a>
   );

   let content = (
      <>
         <div className={cx("container")}>
            <div className={cx("left")}>
               <div
                  className={cx("video-overlay")}
                  style={{
                     backgroundImage: `url(${videos[currentIndex]?.popular_video?.thumb_url})`,
                  }}
               ></div>

               {headerContent}

               <div className={cx("index-control")}>{indexControl}</div>

               <div className={cx("video-container")}>
                  <VideoItem end time={currentTime} data={videos[currentIndex]} />
               </div>
            </div>

            <div className={cx("right", "hide-for-medium")}>
               <div className={cx("top")}>
                  <PostItemHeader data={videos[currentIndex]} hasAvatar />
                  {videoDesc}
                  {musicDesc}

                  <ShareControl end />
               </div>

               <div className={cx("bottom")}>
                  <PostItemHeader data={videos[currentIndex]} comment hasAvatar />
                  <PostItemHeader data={videos[currentIndex]} comment hasAvatar />
               </div>
            </div>
         </div>
      </>
   );

   useEffect(() => {
      if (currentIndex == videos.length - 1) {
         if (hasNextPage) {
            dispath(nextPage());
         }
      }
   }, [currentIndex]);

   // Scroll video ở màn hình chủ, cập nhật current time khi tắt modal
   useEffect(() => {
      const trigger = document.querySelector(".trigger");
      triggerElement.current = trigger;
      newTriggerElement.current = trigger;
   }, []);

   // if (isError) content = <h1>Error when loading video</h1>

   return content;
}

export default VideoPreview;
