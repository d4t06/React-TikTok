import { faShare, faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import classNames from "classnames/bind";

import ShareContainer from "~/components/ShareContainer";

import styles from "./ShareControl.module.scss";

const cx = classNames.bind(styles);
function ShareControl({end}) {
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
    <div className={cx("video-action", end ? "end" : "")}>
      <button
        className={cx(isLike ? "liked" : "")}
        onClick={() => handleLike()}
      >
        <span className={cx("icon")}>
          <FontAwesomeIcon icon={faHeart} />
        </span>
      <span className={cx("number")}>547</span>

      </button>

      <button>
        <span className={cx("icon")}>
          <FontAwesomeIcon icon={faMessage} />
        </span>
        <span className={cx("number")}>{likeCount}</span>
      </button>

      <ShareContainer>
        <button>
          <span className={cx("icon")}>
            <FontAwesomeIcon icon={faShare} />
          </span>
          <span className={cx("number")}>212</span>
        </button>
      </ShareContainer>
    </div>
  );
}
export default ShareControl;
