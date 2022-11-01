import styles from "./VideoItem.module.scss";
import classNames from "classnames/bind";
import Player from "./Player";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);

function VideoItem(props) {
   console.log("video-render");
   const [isPlaying, setIsPlaying] = useState(false);
   const [isMute, setIsMute] = useState(false);

   const videoRef = useRef();
   const durationEl = useRef();
   const currentTimeEl = useRef();
   const timeSlider = useRef();
   const timeDuration = useRef();

   const handlePlayPause = () => {
      setIsPlaying(!isPlaying);
      !isPlaying ? videoRef.current.play() : videoRef.current.pause();
   };
   const handlePlay = () => {
      videoRef.current.play();
      setIsPlaying(true);
   };

   const handlePause = () => {
      videoRef.current.pause();
      setIsPlaying(false);
   };

   const callbackFunction = (entries) => {
      const [entry] = entries;
      // entries.forEach((entry) => {
      // });
      entry.isIntersecting ? handlePlay() : handlePause();
   };
   const handleMute = () => {
      setIsMute(!isMute);
      !isMute ? (videoRef.current.muted = true) : (videoRef.current.muted = false);
   };

   useEffect(() => {
      const observer = new IntersectionObserver(callbackFunction, {
         threshold: 0.8,
      });
      observer.observe(videoRef.current);
   }, []);

   const handlePlaying = () => {
      const duration = videoRef.current.duration;
      const currentTime = videoRef.current.currentTime;
      currentTimeEl.current.innerText = `00:${currentTime.toFixed(0) >= 10 ? "" : "0"}${currentTime.toFixed(0)}`;

      // console.log((currentTime / duration) * 180);

      timeSlider.current.style.width = (currentTime / duration) * 160 + "px";
   };

   const handleSeek = (e) => {
      const rect = e.target.getBoundingClientRect();
      // const timeSliderWidth = timeDuration.current.offsetWidth;
      const seekTime = ((e.clientX - rect.left) / 160) * videoRef.current.duration;
      // console.log(seekTime);
      videoRef.current.currentTime = seekTime.toFixed(1);
      videoRef.current.play();
   };

   useEffect(() => {
      const videoEl = videoRef.current;
      videoEl.onloadedmetadata = () => {
         durationEl.current.innerText = `/00:${videoEl.duration.toFixed(0)}`;
         videoEl.volume = 0.1;
      };
   }, []);

   return (
      <div className={cx("video-frame")}>
         <video
            className={cx("video")}
            ref={videoRef}
            // src={require("~/assets/videos/test.mp4")}

            src={props.src}
            onTimeUpdate={() => handlePlaying()}
         />
         <Player
            ref={{ duration: durationEl, currentTime: currentTimeEl, timeSlider: timeSlider, timeDuration }}
            handlePlayPause={handlePlayPause}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            isMute={isMute}
            handleMute={handleMute}
            handleSeek={handleSeek}
         />
      </div>
   );
}

export default VideoItem;
