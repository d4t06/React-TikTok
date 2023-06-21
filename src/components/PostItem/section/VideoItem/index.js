import styles from "./VideoItem.module.scss";
import videoPreviewStyles from "~/components/VideoPreview/VideoPreview.module.scss";
import classNames from "classnames/bind";

import VolumeControl from "../PlayerItem/section/VolumeControl";
import PlayerItem from "../PlayerItem";

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTime } from "~/store/modalSlice";

const cx = classNames.bind(styles);
const cy = classNames.bind(videoPreviewStyles);

function VideoItem({end, index, data, time}) {
   const dispatch = useDispatch()

   const videoRef = useRef();

   const durationLine = useRef();
   const durationText = useRef();

   const currentTimeLine = useRef();
   const currentTimeText = useRef();

   const [isPlaying, setIsPlaying] = useState(false);

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
      const videoCurrentTime = videoEl.currentTime;

      currentTimeText.current.innerText = handleTimeText(videoCurrentTime);
      const newWidth = (videoCurrentTime / duration) * videoRef.current.durationLineWidth;

      currentTimeLine.current.style.width = newWidth + "px";

      // if (end) {
         dispatch(setCurrentTime({time: videoCurrentTime}))
      // }
   };

   videoControl = (
      <PlayerItem
         ref={{
            durationLine,
            durationText,

            currentTimeLine,
            currentTimeText,

            
         }}
         isPlaying = {isPlaying}
         videoRef={videoRef}
         end={end}
         index={index}
      />
   );

   // update text and get duration width when playing
   const updatePlayerInfo = () => {

      videoRef.current.volume = 0.5;
      videoRef.current.loop = true;

      if (time) {
         videoRef.current.currentTime = time;
      }


      durationText.current.innerText = "/" + handleTimeText(videoRef.current.duration);
      videoRef.current["durationLineWidth"] = durationLine.current.offsetWidth;

      currentTimeLine.current.style.width = "0px"

      if (end) videoRef.current.play();
   }


   // cập nhật current time khi bật modal
   // useEffect(() => {
      // console.log("modalCurrentTime =", modalCurrentTime);
      // if (firstUpdate.current || isOpenModal) {
      //    firstUpdate.current = false;
      //    return;
      // }
      // if (end) {

      // }


   // }, [])


   return (
      <>
         <div className={cx("video-frame", end ? "preview" : "")}>
            <video
               className={cx("video")}
               ref={videoRef}
               src={data.popular_video.file_url}
               onTimeUpdate={() => handlePlaying()}
               onLoadedMetadata={() => updatePlayerInfo()}
               onPlay={() => setIsPlaying(true)}
               onPause={() => setIsPlaying(false)}
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
