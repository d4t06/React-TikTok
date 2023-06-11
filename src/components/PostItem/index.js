import { faMusic, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";

import UserPreview from "../UserPreview";
import Menu from "../Menu";
import Button from "../Button";
import ShareControl from "./section/ShareControl";
import VideoItem from "./section/VideoItem";

import styles from "./PostItem.module.scss";

const cx = classNames.bind(styles);

function PostItem({ data }) {
   return (
      <>
         <div className={cx("content-header")}>
            <div className={cx("content-text")}>
               <p className={cx("user-info")}>
                  <Menu
                     content={
                        <UserPreview
                           data={data}
                           button={{ outline: true }}
                        ></UserPreview>
                     }
                     option={{
                        placement: "bottom",
                        offset: [60, 45],
                        delay: [500, 0],
                        hideOnClick: false,
                        appendTo: () => document.body,
                     }}
                  >
                     <span className={cx("nick-name")}>
                        {data.nickname}
                        {data.tick && (
                           <span className={cx("check-icon")}>
                              <FontAwesomeIcon icon={faCircleCheck} />
                           </span>
                        )}
                     </span>
                  </Menu>
                  <span
                     className={cx("full-name")}
                  >{`${data.first_name} ${data.last_name}`}</span>
               </p>
               <p className={cx("content-desc")}>
                  {data.popular_video.description}
                  <span>#monquayeuthuong</span>
                  <span>#ngaycuame</span>
                  <span>#20/10</span>
               </p>
               <a className={cx("music-info")} href="/home">
                  <span>
                     <FontAwesomeIcon icon={faMusic} />
                  </span>
                  Music - Steal My Girls
               </a>
            </div>
            <Button outline className={cx("follow-btn", "hide-for-small")}>
               Follow
            </Button>
         </div>
         <div className={cx("video-wrapper")}>
            <VideoItem src={data.popular_video.file_url} />
            <ShareControl />
         </div>
      </>
   );
}

export default PostItem;
