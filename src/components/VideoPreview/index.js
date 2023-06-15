import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faFlag,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import { useSelector } from "react-redux";
import { SelectAllVideo } from "~/store/videoSlice";

import VideoItem from "../PostItem/section/VideoItem";
import PostItemHeader from "../PostItem/section/PostItemHeader";

import styles from "./VideoPreview.module.scss";

const cx = classNames.bind(styles);

function VideoPreview({ index, videoEl, src, setIsOpenModal }) {
  const store = useSelector(SelectAllVideo);
  const [currentIndex, SetCurrentIndex] = useState(index);
  const [item, setItem] = useState();

  const { videos } = store;

  useEffect(() => {
    setItem(videos[currentIndex]);
  }, [currentIndex]);

  console.log(item, currentIndex);

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
              <button
                className={cx("previous", "btn")}
                disabled={currentIndex === 0}
                onClick={() => SetCurrentIndex((prev) => prev - 1)}
              >
                <span>
                  <FontAwesomeIcon icon={faChevronUp} />
                </span>
              </button>
              <button
                className={cx("next", "btn")}
                onClick={() => SetCurrentIndex((prev) => prev + 1)}
              >
                <span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </button>
            </div>
            <div className={cx("video-container")}>
              <VideoItem preview end src={item?.popular_video?.file_url} />
            </div>
          </div>
          <div className={cx("right")}>
            <PostItemHeader data={item} hasAvatar />

            <h1 style={{ marginTop: "50px" }}>Comment</h1>
          </div>
        </div>
      )}
    </>
  );
}

export default VideoPreview;
