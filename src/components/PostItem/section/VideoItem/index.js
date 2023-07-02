import styles from "./VideoItem.module.scss";
import videoPreviewStyles from "~/components/VideoPreview/VideoPreview.module.scss";
import classNames from "classnames/bind";

import VolumeControl from "../PlayerItem/section/VolumeControl";
import PlayerItem from "../PlayerItem";

import { useEffect, useMemo, useRef, useState } from "react";

const cx = classNames.bind(styles);
const cy = classNames.bind(videoPreviewStyles);

function VideoItem({ end, index, modalIndex, data, time, isUpdateTime }) {
   const videoRef = useRef();

   const durationLine = useRef();
   const durationText = useRef();

   const currentTimeLine = useRef();
   const currentTimeText = useRef();

   const tempImage = useRef();
   const videoFrame = useRef();
   const playerRef = useRef();

   const [isPlaying, setIsPlaying] = useState(end ? true : false);
   const [loading, setLoading] = useState(true);

   const hidden = {
      opacity: "0.5",
      visibility: "hidden",
   };
   const visible = {
      opacity: "1",
      visibility: "visible",
   };

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

   // fire when video loaded
   const updatePlayerInfo = () => {
      const videoEl = videoRef.current;
      const videoFrameEl = videoFrame.current

      // update style
      if (window.innerWidth > 1023) {
         if (videoEl.offsetWidth > 500 && !end) {
            Object.assign(videoFrameEl.style, {
               height: "auto",
               maxWidth: "500px",
            })
         } else {
            Object.assign(videoEl.style, {
               width: videoEl.offsetWidth + "px",
            });
         }
      } else {
         Object.assign(videoEl.style, {
            width: "100%",
         });
      }

      if (!durationText.current || !currentTimeLine.current) {
         console.log("element not found");
         return;
      }

      // // cập nhật current time in modal
      // if (time && end) {
      //    // cập nhật khi trigger video và video trong mnodal giống nhau
      //    if (isUpdateTime) {
      //       videoEl.currentTime = time;
      //    }
      // }

      durationText.current.innerText = "/" + handleTimeText(videoEl.duration);
      videoEl["durationLineWidth"] = durationLine.current.offsetWidth;

      currentTimeLine.current.style.width = "0px";

      // when in modal
      // if (end) {
      //    videoEl.play();
      // }
   };

   const handleLoaded = () => {
      setLoading(false);
   };

   const videoControl = useMemo(() => {
      return (
         <PlayerItem
            ref={{
               durationLine,
               durationText,

               currentTimeLine,
               currentTimeText,

               playerRef,
            }}
            // state
            isPlaying={isPlaying}
            isUpdateTime = {isUpdateTime}
            loading={loading}
            end={end}
            index={index}
            modalIndex = {modalIndex}
            // ref
            videoRef={videoRef}
            currentTimeText={currentTimeText}
            currentTimeLine={currentTimeLine}
         />
      );
   }, [data, isPlaying, loading]);

   // when video loaded
   useEffect(() => {
      if (loading) return;

      setTimeout(() => {
         const videoEl = videoRef.current;
         const tempImageEl = tempImage.current;
         const playerEl = playerRef.current;

         if (videoEl && tempImageEl && playerEl) {
            Object.assign(videoEl.style, {
               ...visible,
               width: "100%",
            });

            Object.assign(tempImageEl.style, {
               ...hidden,
               width: "0",
            });

            Object.assign(playerEl.style, {
               position: "absolute",
            });
         }

         updatePlayerInfo();
      }, 300);
   }, [loading]);

   // handle loading video
   useEffect(() => {
      setLoading(true);
      videoRef.current.addEventListener("loadedmetadata", handleLoaded);

      return () => {
         const videoEl = videoRef.current;
         const tempImageEl = tempImage.current;
         const playerEl = playerRef.current;

         if (videoEl && tempImageEl && playerEl) {
            // console.log("clean up");

            Object.assign(videoEl.style, {
               ...hidden,
               width: "0",
            });

            Object.assign(tempImageEl.style, {
               ...visible,
               width: "auto",
            });

            Object.assign(playerEl.style, {
               position: "relative",
            });
         }
      };
   }, [data]);

   // console.log("video item render");
   // only state change

   return (
      <>
         <div ref={videoFrame} className={cx("video-frame", end ? "preview" : "")}>
            <div className={cx("video-item")}>
               <img
                  ref={tempImage}
                  className={cx("temp-image")}
                  src={data.popular_video.thumb_url}
                  alt=""
                  style={visible}
               />
               <video
                  className={cx("video")}
                  loop
                  ref={videoRef}
                  src={data.popular_video.file_url}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  style={{ ...hidden, width: "0" }}
                  index = {index}
               />
            </div>

            {videoControl}
         </div>
         {end && !!(window.innerWidth > 549) && (
            <div className={cy("volume-slider-wrapper")}>
               <VolumeControl videoRef={videoRef} />
            </div>
         )}
      </>
   );
}

export default VideoItem;
