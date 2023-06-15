import { faMusic, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";

import UserPreview from "../UserPreview";
import Menu from "../Menu";
import Button from "../Button";
import ShareControl from "./section/ShareControl";
import VideoItem from "./section/VideoItem";

import styles from "./PostItem.module.scss";
import PostItemHeader from "./section/PostItemHeader";

const cx = classNames.bind(styles);

function PostItem({ data, index }) {
   return (
      <>
        <PostItemHeader data={data} />
         <div className={cx("video-wrapper")}>
            <VideoItem index={index} src={data.popular_video.file_url} data={data} />
            <ShareControl />
         </div>
      </>
   );
}

export default PostItem;
