import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faClose,
   faFlag,
   faChevronDown,
   faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import VideoItem from "~/components/PostItem/section/VideoItem";

import styles from "../VideoPreview.module.scss";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { SelectAllTimeStore } from "~/store/timeSlice";
const cx = classNames.bind(styles);

function Video({
   data,
   isUpdateTime,
   currentIndex,
   handleNext,
   handlePrevious,
   handleCloseModal,
}) {
   const timeStore = useSelector(SelectAllTimeStore);
   const {currentTime} = timeStore;

   const useMemoVideoItem = useMemo(() => {
      return (
         <div className={cx("video-container")}>
            <VideoItem isUpdateTime={isUpdateTime} end time={currentTime} data={data} />
         </div>
      );
   }, [currentIndex]);

   const header = (
      <>
         <div className={cx("header")}>
            <button
               className={cx("close-btn", "btn")}
               onClick={() => handleCloseModal(currentTime)}
            >
               <FontAwesomeIcon icon={faClose} />
            </button>
            <button className={cx("report-btn", "btn")}>
               <FontAwesomeIcon icon={faFlag} />
               <span>Report</span>
            </button>
         </div>
      </>
   );
   const indexControl = (
      <div className={cx("index-control")}>
         <button
            className={cx(
               "previous",
               "btn",
               currentIndex === 0 ? "disable" : ""
            )}
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
      </div>
   );

// console.log("video prerender");
// many

   return (
      <>
         <div
            className={cx("video-overlay")}
            style={{
               backgroundImage: `url(${data?.popular_video?.thumb_url})`,
            }}
         ></div>
         {header}
         {indexControl}
         {useMemoVideoItem}
      </>
   );
}

export default memo(Video);
