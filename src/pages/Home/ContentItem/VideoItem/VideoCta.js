import { faShare, faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./VideoCta.module.scss";
import classNames from "classnames/bind";
import ShareContainer from "~/components/ShareContainer";
import { useState } from "react";

const cx = classNames.bind(styles);
function VideoCta() {
   const [isLike, setIsLike] = useState(false);
   return (
      <div className={cx("video-action")}>
         <button>
            <FontAwesomeIcon icon={faHeart} />
         </button>
         <span className={cx("share-number")}>827</span>

         <button>
            <FontAwesomeIcon icon={faMessage} />
         </button>
         <span className={cx("share-number")}>212</span>

         {/* <ShareContainer>
         </ShareContainer> */}
         <button>
            <FontAwesomeIcon icon={faShare} />
         </button>

         <span className={cx("share-number")}>547</span>
      </div>
   );
}
export default VideoCta;
