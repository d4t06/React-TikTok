import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";

import classNames from "classnames/bind";
import styles from "../PlayerItem.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { SelectAllModalStore, setVolume, setMute } from "~/store/modalSlice";
import useLocalStorage from "~/hook/useLocalStorage";

const cx = classNames.bind(styles);

function VolumeControl({ videoRef }) {
   const dispatch = useDispatch();
   const modalStore = useSelector(SelectAllModalStore);

   const { isOpenModal, volume, isMute } = modalStore;

   const [LCSvolume, setLCSVolume] = useLocalStorage("volume", 1);
   const [LCSMute, setLCSMute] = useLocalStorage("mute", false);

   const currentVolumeLine = useRef();

   const handleVolume = (e) => {
      const rect = e.target.getBoundingClientRect();
      const volume =
         (rect.bottom.toFixed(0) - e.clientY) / e.target.offsetHeight;

      dispatch(setVolume({ volume: +volume.toFixed(1) }));
      setLCSVolume(+volume.toFixed(1));
   };

   const handleMute = () => {
      dispatch(setMute({ isMute: !isMute }));
      setLCSMute(!isMute);
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

   useEffect(() => {
      // if (isOpenModal) return;

      const videoEl = videoRef.current;
      const currentVolumeLineEl = currentVolumeLine.current;

      if (!videoEl || !currentVolumeLineEl) {
         console.log("element not found volume control");
         return;
      }

      if (isMute) {
         console.log("muted");
         videoEl.volume = 0;
         currentVolumeLineEl.style.height = "0";
         return;
      }

      if (!currentVolumeLineEl) return;

      if (volume == 1) {
         currentVolumeLineEl.style.height = "100%";
      } else if (volume == 0) {
         videoEl.volume = 0;
         currentVolumeLineEl.style.height = "0";
      } else {
         videoEl.volume = volume;
         currentVolumeLineEl.style.height = volume.toFixed(2) * 100 + "%";
      }
   }, [volume, isMute]);

   // console.log("volume rerender");

   return (
      <>
         <div className={cx("frame")}>
            {content}
            {toolTip}
         </div>
         {/* <Menu
            content={toolTip}
            option={{
               placement: "top",
               // delay: [200, 0],
               hideOnClick: false,
               appendTo: () => document.body,
            }}
         >
            {content}
         </Menu> */}
      </>
   );
}

export default VolumeControl;
