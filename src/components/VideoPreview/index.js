import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import { useDispatch, useSelector } from "react-redux";
import { SelectAllVideoStore, nextPage } from "~/store/videoSlice";

import styles from "./VideoPreview.module.scss";
import { SelectAllModalStore, setOpenModal } from "~/store/modalSlice";
import Video from "./section/Video";
import Text from "./section/Text";

const cx = classNames.bind(styles);

function VideoPreview() {
   // use store
   const dispath = useDispatch();
   const videoStore = useSelector(SelectAllVideoStore);
   const modalStore = useSelector(SelectAllModalStore);

   const { index, isOpenModal } = modalStore;
   const { videos, hasNextPage } = videoStore;

   const [currentIndex, SetCurrentIndex] = useState(index);

   const triggerElement = useRef();
   const newTriggerElement = useRef();
   const distance = useRef(0);

   // handle functions
   const handlePrevious = () => {
      newTriggerElement.current = newTriggerElement.current.previousSibling;
      SetCurrentIndex((prev) => prev - 1);
   };

   const handleNext = () => {
      newTriggerElement.current = newTriggerElement.current.nextSibling;
      SetCurrentIndex((prev) => prev + 1);
   };

   const handleCloseModal = (time) => {
      const currentElement = newTriggerElement.current;
      const videoElement = currentElement.querySelector("video");

      // cập nhật current time ở màn hình chính
      console.log("time =", time);
      videoElement.currentTime = time;
      videoElement.play();

      // tắt modal
      dispath(setOpenModal({ isOpenModal: false }));
   };

   // fetch thêm video
   useEffect(() => {
      if (currentIndex == videos.length - 1) {
         if (hasNextPage) {
            dispath(nextPage());
         }
      }
   }, [currentIndex]);

   // lấy trigger element
   useEffect(() => {
      const trigger = document.querySelector(".trigger");
      triggerElement.current = trigger;
      newTriggerElement.current = trigger;
   }, []);

   // scroll tới video hiện tại ở màn hình chính
   useEffect(() => {
      return () => {
         triggerElement.current.classList.remove("trigger");

         newTriggerElement.current.scrollIntoView({
            behavior: "instant",
            block: "center",
         });
      };
   }, [isOpenModal]);

   // xử lí lăn chuột next video
   useEffect(() => {
      const handleScroll = (e) => {
         e.deltaY > 0 ? (distance.current += 1) : (distance.current -= 1);

         if (currentIndex == videos.length - 1) return;

         console.log("handle scroll", distance.current);

         if (distance.current >= 2) {
            distance.current = 0;
            setTimeout(() => {
               handleNext();
            }, 300);

            window.removeEventListener("wheel", handleScroll);
         } else if (distance.current <= -2) {
            if (currentIndex == 0) return;

            distance.current = 0;
            setTimeout(() => {
               handlePrevious();
            }, 300);

            window.removeEventListener("wheel", handleScroll);
         }
      };

      window.addEventListener("wheel", handleScroll);
      return () => {
         distance.current = 0;
         window.removeEventListener("wheel", handleScroll);
      };
   }, [isOpenModal, videos, currentIndex]);

   // console.log("video preview render");
   // many

   return (
      <>
         <div className={cx("container")}>
            <div className={cx("left")}>
               <Video
                  data={videos[currentIndex - 1]}
                  isUpdateTime = {currentIndex == index}
                  currentIndex={currentIndex - 1}
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
                  handleCloseModal={(time) => handleCloseModal(time)}
               />
            </div>

            <div className={cx("right", "hide-for-medium")}>
               {<Text data={videos[currentIndex - 1]} />}
            </div>
         </div>
      </>
   );
}

export default VideoPreview;
