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
   const currentVolume = useRef();

   const handlePlayPause = () => {
      !isPlaying ? videoRef.current.play() : videoRef.current.pause();
   };

   const handlePlay = () => {
      videoRef.current.play();
      // setIsPlaying(true);
   };

   const handlePause = () => {
      videoRef.current.pause();
      // setIsPlaying(false);
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

      timeSlider.current.style.width = (currentTime / duration) * 180 + "px";
   };
   // const handleOnPause = () => {
   //    setIsPlaying(false);
   // };
   // const handleOnPause = () => {
   //    setIsPlaying(false);
   // };
   const handleSeek = (e) => {
      const rect = e.target.getBoundingClientRect();
      const seekTime = ((e.clientX - rect.left) / 180) * videoRef.current.duration;
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

   useEffect(() => {
      const videoEl = videoRef.current;
      videoEl.onloadedmetadata = () => {
         durationEl.current.innerText = `/00:${videoEl.duration.toFixed(0)}`;
         videoEl.volume = 0.25;
      };
      videoEl.onplaying = () => {
         setIsPlaying(true);
      };
      videoEl.onpause = () => {
         setIsPlaying(false);
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
            // onPause={() => handleOnPause()}
         />
         <Player
            ref={{ duration: durationEl, currentTime: currentTimeEl, timeSlider, timeDuration, currentVolume }}
            handlePlayPause={handlePlayPause}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            isMute={isMute}
            handleMute={handleMute}
            handleSeek={handleSeek}
            handleVolume={handleVolume}
         />
      </div>
   );
}

export default VideoItem;
