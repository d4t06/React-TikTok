import styles from "./VideoItem.module.scss";
import classNames from "classnames/bind";
import PlayerItem from "../PlayerItem";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);

function VideoItem(props) {
   // console.log("video-render");
   const [isPlaying, setIsPlaying] = useState(false);
   const [isMute, setIsMute] = useState(false);

   const videoRef = useRef();
   const durationText = useRef();
   const currentTimeText = useRef();
   const currentVolume = useRef();

   const currentTimeLine = useRef();
   const durationLine = useRef();
   const durationLineWidth = useRef();

   const handlePlayPause = () => {
      !isPlaying ? play() : pause();
   };

   const play = () => videoRef.current.play();
   const pause = () => videoRef.current.pause();

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

   const handlePlaying = () => {
      const duration = videoRef.current.duration;
      const currentTime = videoRef.current.currentTime;

      currentTimeText.current.innerText = handleTimeText(currentTime);

      currentTimeLine.current.style.width =
         (currentTime / duration) * durationLineWidth.current + "px";
   };

   const handleSeek = (e) => {
      const rect = e.target.getBoundingClientRect();
      const seekTime =
         ((e.clientX - rect.left) / durationLineWidth.current) *
         videoRef.current.duration;
      videoRef.current.currentTime = seekTime.toFixed(1);

      if (!isPlaying) videoRef.current.play();
   };

   const handleVolume = (e) => {
      const rect = e.target.getBoundingClientRect();
      const volume = (rect.bottom.toFixed(0) - e.clientY) / 44;

      videoRef.current.volume = volume.toFixed(1) / 2;
      currentVolume.current.style.height = volume.toFixed(2) * 100 + "%";
      // console.log(volume.toFixed(2) * 100 + "%");
   };

   const handleMute = () => {
      setIsMute(!isMute);

      !isMute
         ? (videoRef.current.muted = true)
         : (videoRef.current.muted = false);
   };

   useEffect(() => {
      const videoEl = videoRef.current;
      videoEl.onloadedmetadata = () => {
         videoEl.volume = 0.25;

         durationText.current.innerText =
            "/" + handleTimeText(videoEl.duration);
         durationLineWidth.current = durationLine.current.offsetWidth;
      };
   }, []);

   useEffect(() => {
      const callbackFunction = (entries) => {
         const [entry] = entries;
         const isIntoView = entry.isIntersecting;

         isIntoView ? play() : pause();
      };

      const observer = new IntersectionObserver(callbackFunction, {
         threshold: 0.8,
      });
      observer.observe(videoRef.current);
   }, []);

   return (
      <div className={cx("video-frame")}>
         <video
            className={cx("video")}
            ref={videoRef}
            onPlaying={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={() => handlePlaying()}
            src={props.src}
         />
         <PlayerItem
            ref={{
               durationText,
               currentTimeText,

               currentTimeLine,
               durationLine,

               currentVolume,
            }}
            isPlaying={isPlaying}
            isMute={isMute}
            handlePlayPause={handlePlayPause}
            handleMute={handleMute}
            handleSeek={handleSeek}
            handleVolume={handleVolume}
         />
      </div>
   );
}

export default VideoItem;
