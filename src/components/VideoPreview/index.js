import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faFlag, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import { useSelector } from "react-redux";
import { SelectAllVideo } from "~/store/videoSlice";

import VideoItem from "../PostItem/section/VideoItem";
import PostItemHeader from "../PostItem/section/PostItemHeader";

import styles from "./VideoPreview.module.scss";

const cx = classNames.bind(styles);

function VideoPreview({ index, setIsOpenModal }) {
   const store = useSelector(SelectAllVideo);
   const [currentIndex, SetCurrentIndex] = useState(index);
   const [item, setItem] = useState();

   const { videos } = store;

   const indexControl = (
      <>
         <button
            className={cx("previous", "btn", currentIndex === 0 ? "disable" : "")}
            onClick={() => SetCurrentIndex((prev) => prev - 1)}
         >
            <span>
               <FontAwesomeIcon icon={faChevronUp} />
            </span>
         </button>
         <button className={cx("next", "btn")} onClick={() => SetCurrentIndex((prev) => prev + 1)}>
            <span>
               <FontAwesomeIcon icon={faChevronDown} />
            </span>
         </button>
      </>
   );

   useEffect(() => {
      setItem(videos[currentIndex]);
   }, [currentIndex]);

   return (
      <>
         {item && (
            <div className={cx("container")}>
               <div className={cx("left")}>
                  <div
                     className={cx("video-overlay")}
                     style={{
                        backgroundImage: `url(${item?.popular_video?.thumb_url})`,
                     }}
                  ></div>
                  <div className={cx("header")}>
                     <button
                        className={cx("close-btn", "btn")}
                        onClick={() => setIsOpenModal(false)}
                     >
                        <FontAwesomeIcon icon={faClose} />
                     </button>
                     <button className={cx("report-btn", "btn")}>
                        <FontAwesomeIcon icon={faFlag} />
                        Report
                     </button>
                  </div>

                  <div className={cx("index-control")}>
                    {indexControl}
                  </div>

                  <div className={cx("video-container")}>
                     <VideoItem end data={item} />
                  </div>
               </div>

               <div className={cx("right", "hide-for-medium")}>
                  <PostItemHeader data={item} hasAvatar />
                  <h1 style={{ marginTop: "50px" }}>Comment</h1>
               </div>
            </div>
         )}
      </>
   );
}

export default VideoPreview;
