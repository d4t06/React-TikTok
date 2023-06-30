import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

import Menu from "~/components/Menu";

import classNames from "classnames/bind";
import styles from "../PlayerItem.module.scss";

const cx = classNames.bind(styles);

function VolumeControl({ videoEl }) {
   const [isMute, setIsMute] = useState(false);
   const currentVolumeLine = useRef();

   const handleVolume = (e) => {
      const rect = e.target.getBoundingClientRect();
      const volume = (rect.bottom.toFixed(0) - e.clientY) / e.target.offsetHeight;

      videoEl.volume = volume.toFixed(1);
      currentVolumeLine.current.style.height = volume.toFixed(2) * 100 + "%";
   };

   const handleMute = () => {
      setIsMute(!isMute);

      !isMute ? (videoEl.muted = true) : (videoEl.muted = false);
   };

   const content = (
      <button
         onClick={(e) => {
            e.stopPropagation();
            handleMute();
         }}
         className={cx("volume-btn")}
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
   );

   const toolTip = (
      <div className={cx("volume-slider")}>
         <div
            className={cx("volume-duration")}
            onClick={(e) => {
               e.stopPropagation();
               handleVolume(e);
            }}
         >
            <div className={cx("volume-current")} ref={currentVolumeLine}></div>
         </div>
      </div>
   );

   return (
      <>
         <Menu
            content={toolTip}
            option={{
               placement: "top",
               // delay: [200, 0],
               hideOnClick: false,
               appendTo: () => document.body,
            }}
         >
            {content}
         </Menu>
      </>
   );
}

export default VolumeControl;
