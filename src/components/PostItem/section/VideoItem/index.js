import styles from "./VideoItem.module.scss";
import videoPreviewStyles from "~/components/VideoPreview/VideoPreview.module.scss";
import classNames from "classnames/bind";

import VolumeControl from "../PlayerItem/section/VolumeControl";
import PlayerItem from "../PlayerItem";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectAllModalStore, setCurrentTime } from "~/store/modalSlice";

const cx = classNames.bind(styles);
const cy = classNames.bind(videoPreviewStyles);

function VideoItem({end, index, data, currentTime}) {
   const dispatch = useDispatch()
   const modalStore = useSelector(SelectAllModalStore)
   const {isOpenModal, currentTime: modalCurrentTime} = modalStore

   const videoRef = useRef();
   const firstUpdate  = useRef()
   // const currentTimeIdea = useRef();
   

   const durationLine = useRef();
   const durationText = useRef();

   const currentTimeLine = useRef();
   const currentTimeText = useRef();

   let videoControl;

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
      const newWidth = (currentTime / duration) * videoRef.current.durationLineWidth;

      currentTimeLine.current.style.width = newWidth + "px";

      if (end) {
         dispatch(setCurrentTime({time: currentTime}))
         // currentTimeIdea.current = currentTime
      }
   };

   videoControl = (
      <PlayerItem
         ref={{
            durationLine,
            durationText,

            currentTimeLine,
            currentTimeText,
         }}
         videoRef={videoRef}
         end={end}
         index={index}
      />
   );

   // update text and get duration width when playing

   const updatePlayerInfo = () => {

      // console.log(videoRef.current);

      videoRef.current.volume = 0.5;
      videoRef.current.loop = true;
      videoRef.current.currentTime = currentTime || 0;


      durationText.current.innerText = "/" + handleTimeText(videoRef.current.duration);
      videoRef.current["durationLineWidth"] = durationLine.current.offsetWidth;

      currentTimeLine.current.style.width = "0px"
      // if (currentTime) currentTimeText.innerText = handleTimeText(currentTime);
   }

   // console.log("isLoadingVideo =", isLoadingVideo);
   // console.log("video item render");


   useEffect(() => {
      console.log("modalCurrentTime =", modalCurrentTime);
      if (firstUpdate.current || isOpenModal) {
         firstUpdate.current = false;
         return;
      }

      if (modalCurrentTime) {
         videoRef.current.currentTime = modalCurrentTime;
         // console.log("currentTimeIdea =", currentTimeIdea.current);
      }

   }, [isOpenModal])



   return (
      <>
         <div className={cx("video-frame", end ? "preview" : "")}>
            <video
               className={cx("video")}
               ref={videoRef}
               src={data.popular_video.file_url}
               onTimeUpdate={() => handlePlaying()}
               onLoadedMetadata={() => updatePlayerInfo()}
            />
            {videoRef  && videoControl}
         </div>

         {end && videoRef && (
            <div className={cy("volume-slider-wrapper")}>
               <VolumeControl videoEl={videoRef.current} />
            </div>
         )}
      </>
   );
}

export default VideoItem;
