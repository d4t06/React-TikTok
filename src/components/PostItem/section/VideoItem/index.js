import styles from "./VideoItem.module.scss";
import classNames from "classnames/bind";
import PlayerItem from "../PlayerItem";
import { useEffect, useRef, useState } from "react";
import Modal from "~/components/Modal";
import PostItem from "../..";
import VideoPreview from "~/components/VideoPreview";

const cx = classNames.bind(styles);

function VideoItem(props) {
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [isLoadingVideo, setIsLoadingVideo] = useState(true);

   const videoRef = useRef();
   const indexOfCurrent = useRef();

   const durationLine = useRef();
   const durationText = useRef();

   const currentTimeLine = useRef();
   const currentTimeText = useRef();

   const playBtn = useRef();
   const volumeBtn = useRef();

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

   // when video playing
   const handlePlaying = () => {
      const videoEl = videoRef.current;
      const duration = videoEl.duration;
      const currentTime = videoEl.currentTime;

      currentTimeText.current.innerText = handleTimeText(currentTime);
      const newWidth =
         (currentTime / duration) * videoRef.current.durationLineWidth;

      currentTimeLine.current.style.width = newWidth + "px";
   };

   const handleOpenModal = (e) => {
      if (props?.end) {
         playBtn.current.click();
         return;
      }
      indexOfCurrent.current = props.index;
      setIsOpenModal(true);
   };

   // update text and get duration width when playing
   useEffect(() => {
      if (isLoadingVideo) return;

      videoRef.current.volume = 0.5;
      videoRef.current.loop = true;

      durationText.current.innerText =
         "/" + handleTimeText(videoRef.current.duration);
      videoRef.current["durationLineWidth"] = durationLine.current.offsetWidth;

      setIsLoadingVideo(false);
   }, [isLoadingVideo]);

   return (
      <>
         {console.log("video item render")}
         <div
            className={cx("video-frame", props.preview ? "preview" : "")}
            onClick={(e) => handleOpenModal(e)}
         >
            <video
               className={cx("video")}
               ref={videoRef}
               onTimeUpdate={() => handlePlaying()}
               src={props.src}
               onLoadedMetadata={() => setIsLoadingVideo(false)}
               onEnded={() => console.log({ a: videoRef.current })}
            />
            {videoRef.current && (
               <PlayerItem
                  ref={{
                     durationLine,
                     durationText,

                     currentTimeLine,
                     currentTimeText,

                     playBtn,
                     volumeBtn,
                  }}
                  preview={props.preview}
                  videoEl={videoRef.current}
               />
            )}
         </div>
         {isOpenModal && (
            <Modal setIsOpenModal={setIsOpenModal}>
               <VideoPreview
                  setIsOpenModal={setIsOpenModal}
                  end={props.end}
                  src={props.src}
                  data={props.data}
                  index={indexOfCurrent.current}
               />
            </Modal>
         )}
      </>
   );
}

export default VideoItem;
