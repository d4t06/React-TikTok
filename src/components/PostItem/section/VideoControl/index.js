import { faShare, faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import classNames from "classnames/bind";

import ShareContainer from "~/components/ShareContainer";

import styles from "./VideoControll.module.scss";

const cx = classNames.bind(styles);
function VideoControl() {
   const [isLike, setIsLike] = useState(false);
   const [likeCount, setLikeCount] = useState(827);

   const handleLike = () => {
      if (!isLike) {
         // handleLike
         setIsLike(true);
         setLikeCount(likeCount + 1);
      } else {
         // handleLike
         setIsLike(false);
         setLikeCount(likeCount - 1);
      }
   };

   return (
      <div className={cx("video-action")}>
         <button
            className={cx(isLike ? "liked" : "")}
            onClick={() => handleLike()}
         >
            <FontAwesomeIcon icon={faHeart} />
         </button>
         <span className={cx("share-number")}>{likeCount}</span>

         <button>
            <FontAwesomeIcon icon={faMessage} />
         </button>
         <span className={cx("share-number")}>212</span>

         <ShareContainer>
            <button>
               <FontAwesomeIcon icon={faShare} />
            </button>
         </ShareContainer>
         <span className={cx("share-number")}>547</span>
      </div>
   );
}
export default VideoControl;
