import styles from "./VideoItem.module.scss";
import videoPreviewStyles from "~/components/VideoPreview/VideoPreview.module.scss";
import classNames from "classnames/bind";

import VolumeControl from "../PlayerItem/section/VolumeControl";
import PlayerItem from "../PlayerItem";

import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTime } from "~/store/modalSlice";

const cx = classNames.bind(styles);
const cy = classNames.bind(videoPreviewStyles);

function VideoItem({ end, index, data, time, isUpdateCurrentTime }) {
   const dispatch = useDispatch();

   const videoRef = useRef();
   const timeSlider = useRef();

   const durationLine = useRef();
   const durationText = useRef();

   const currentTimeLine = useRef();
   const currentTimeText = useRef();

   const tempImage = useRef();

   const [isPlaying, setIsPlaying] = useState(false);
   const [loading, setLoading] = useState(true);

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
      dispatch(setCurrentTime({ time: videoCurrentTime }));
      // }
   };

   const videoControl = useMemo(() => {
      return (
         <PlayerItem
            ref={{
               timeSlider,

               durationLine,
               durationText,

               currentTimeLine,
               currentTimeText,
            }}
            isPlaying={isPlaying}
            videoRef={videoRef}
            end={end}
            index={index}
         />
      );
   }, [data, isPlaying, videoRef.current]);

   // update text and get duration width when playing
   const updatePlayerInfo = () => {
      if (!durationText.current || !currentTimeLine.current) {
         console.log("element not found");
         return;
      }
      videoRef.current.volume = 0.5;
      videoRef.current.loop = true;

      if (time && isUpdateCurrentTime) {
         videoRef.current.currentTime = time;
      }

      durationText.current.innerText = "/" + handleTimeText(videoRef.current.duration);
      videoRef.current["durationLineWidth"] = durationLine.current.offsetWidth;

      currentTimeLine.current.style.width = "0px";

      if (end) {
         console.log("play");
         videoRef.current.play();
      }
   };

   const handleLoaded = () => {
      setLoading(false);
   };

   useEffect(() => {
      if (loading) return;

      setTimeout(() => {
         const videoEl = videoRef.current;
         videoEl.style.display = "block";
         videoEl.style.width = videoEl.offsetWidth + "px"
         
         const timeSliderEl = timeSlider.current;
         timeSliderEl.style.display = "flex";
         timeSliderEl.style.width = timeSliderEl.offsetWidth + "px"

         tempImage.current.style.display = "none";
      }, 1000);
      updatePlayerInfo();
   }, [loading]);

   useEffect(() => {
      setLoading(true);
      videoRef.current.addEventListener("loadedmetadata", handleLoaded);

      return () => {

         if (timeSlider.current) {
            console.log("clean up");

            videoRef.current.style.width = "unset"
            timeSlider.current.style.width = "unset";
            videoRef.current.style.display = "none";
            tempImage.current.style.display = "block";
         }

         if (videoRef.current) {
            videoRef.current.removeEventListener("loadedmetadata", handleLoaded);
         }
      };
   }, [data]);

   let content = (
      <>
         <div className={cx("video-frame", end ? "preview" : "")}>
            <div className={cx("video-item")}>
               <img
                  ref={tempImage}
                  className={cx("temp-image")}
                  src={data.popular_video.thumb_url}
                  alt=""
               />
               <video
                  className={cx("video")}
                  ref={videoRef}
                  src={data.popular_video.file_url}
                  onTimeUpdate={() => handlePlaying()}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  style={{ display: "none" }}
               />
            </div>

            {!loading && videoControl}
         </div>
         {end && !loading && videoRef && (
            <div className={cy("volume-slider-wrapper")}>
               <VolumeControl videoEl={videoRef.current} />
            </div>
         )}
      </>
   );

   // console.log("video item render")

   return content;
}

export default VideoItem;
