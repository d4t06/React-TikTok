import {
   faPause,
   faPlay,
   faVolumeHigh,
   faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";
import { forwardRef } from "react";
import styles from "./PlayerItem.module.scss";
import Menu from "~/components/Menu";

const cx = classNames.bind(styles);

function PlayerItem(
   { isPlaying, isMute, handlePlayPause, handleMute, handleSeek, handleVolume },
   ref
) {
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
                  <div
                     className={cx("volume-duration")}
                     onClick={(e) => handleVolume(e)}
                  >
                     <div
                        className={cx("volume-current")}
                        ref={ref.currentVolume}
                     ></div>
                  </div>
               </div>
            }
            option={{
               placement: "top",
               // delay: [200, 0],
               hideOnClick: false,
               appendTo: () => document.body,
            }}
         >
            <button
               onClick={() => handleMute()}
               className={cx("btn", "volume-icon")}
            >
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
            <div
               className={cx("video-duration")}
               onClick={(e) => handleSeek(e)}
               ref={ref.durationLine}
            >
               <div
                  className={cx("time-current")}
                  ref={ref.currentTimeLine}
               ></div>
            </div>
            <div className={cx("time-text-wrapper")}>
               <div className={cx("time-text")}>
                  <div className="time-current-wrapper">
                     <span className={cx("current")} ref={ref.currentTimeText}>
                        00:00
                     </span>
                  </div>
                  <span className={cx("duration")} ref={ref.durationText}>
                     00:00
                  </span>
               </div>
            </div>
         </div>
      </>
   );
}

export default forwardRef(PlayerItem);
