import { faPause, faPlay, faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";
import { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./Player.module.scss";
import Menu from "~/components/Menu";

const cx = classNames.bind(styles);

function Player({ isPlaying, isMute, handleMute, handlePlayPause, handleSeek }, ref) {
   return (
      <>
         <button className={cx("play-btn")} onClick={() => handlePlayPause()}>
            {isPlaying ? (
               <span className={cx("play-icon", "btn")}>
                  <FontAwesomeIcon icon={faPause} />
               </span>
            ) : (
               <span className={cx("paused-icon", "btn")}>
                  <FontAwesomeIcon icon={faPlay} />
               </span>
            )}
         </button>
         <Menu
            content={
               <div className={cx("volume-slider")}>
                  <div className={cx("volume-duration")}>
                     <div className={cx("volume-current")}></div>
                  </div>
               </div>
            }
            option={{
               placement: "top",
            }}
         >
            <button onClick={() => handleMute()} className={cx("btn", "volume-icon")}>
               {!isMute && (
                  <span>
                     <FontAwesomeIcon icon={faVolumeHigh} />
                  </span>
               )}
               {isMute && (
                  <span>
                     <FontAwesomeIcon icon={faVolumeXmark} />
                  </span>
               )}
            </button>
         </Menu>

         <div className={cx("time-slider")}>
            <div className={cx("video-duration")} onClick={(e) => handleSeek(e)} ref={ref.timeDuration}>
               <div className={cx("time-current")} ref={ref.timeSlider}></div>
            </div>
            <div className={cx("time-text")}>
               <span className={cx("current")} ref={ref.currentTime}>
                  0:0
               </span>
               <span className={cx("duration")} ref={ref.duration}>
                  3:00
               </span>
            </div>
            {/* <span className={cx("duration")}>{getDuration && getDuration}</span> */}
         </div>
      </>
   );
}

export default forwardRef(Player);
