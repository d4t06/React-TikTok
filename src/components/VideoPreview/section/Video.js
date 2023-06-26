import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faFlag, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import VideoItem from "~/components/PostItem/section/VideoItem";

import styles from "../VideoPreview.module.scss";
import { memo } from "react";
const cx = classNames.bind(styles);

function Video({
   data,
   isUpdateCurrentTime,
   currentTime,
   currentIndex,
   handleNext,
   handlePrevious,
   handleCloseModal,
}) {
   const videoItem = (
      <div className={cx("video-container")}>
         <VideoItem isUpdateCurrentTime={isUpdateCurrentTime} end time={currentTime} data={data} />
      </div>
   );

   const header = (
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
   const indexControl = (
      <div className={cx("index-control")}>
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
      </div>
   );

   // console.log("left video render");

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
         {videoItem}
      </>
   );
}

export default memo(Video);
