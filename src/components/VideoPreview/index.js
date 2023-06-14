import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faClose,
   faFlag,
   faCircleCheck,
   faMusic,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import VideoItem from "../PostItem/section/VideoItem";
import Button from "../Button";
import UserPreview from "../UserPreview";
import Menu from "../Menu";
import AccountsItem from "../AccountsItem";

import styles from "./VideoPreview.module.scss";
import postItemStyles from "../PostItem/PostItem.module.scss";

const cx = classNames.bind(styles);
const cy = classNames.bind(postItemStyles);

function VideoPreview({ data, src, setIsOpenModal }) {
   console.log("data =", data);
   return (
      <>
         <div className={cx("container")}>
            <div className={cx("left")}>
               <div
                  className={cx("video-overlay")}
                  style={{
                     backgroundImage: `url(${data.popular_video.thumb_url})`,
                  }}
               ></div>
               <div className={cx("header")}>
                  <button
                     className={cx("close-btn", "btn")}
                     onClick={() => setIsOpenModal(false)}
                  >
                     <FontAwesomeIcon icon={faClose} />
                  </button>
                  <button className={cx("report-btn", "btn")}>
                     <FontAwesomeIcon icon={faFlag} />
                     Report
                  </button>
               </div>
               <div className={cx("video-container")}>
                  <VideoItem preview end src={src} />
               </div>
            </div>
            <div className={cx("right")}>
               <div className={cy("content-header")}>
                  <div className={cy("content-text")}>
                     <AccountsItem imgOnly src={data.avatar} />
                     <p className={cy("user-info")}>
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
                           <span className={cy("nick-name")}>
                              {data.nickname}
                              {data.tick && (
                                 <span className={cy("check-icon")}>
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                 </span>
                              )}
                           </span>
                        </Menu>
                        <span
                           className={cy("full-name")}
                        >{`${data.first_name} ${data.last_name}`}</span>
                     </p>
                  </div>
                  <Button
                     outline
                     className={cy("follow-btn", "hide-for-small")}
                  >
                     Follow
                  </Button>
               </div>

               <div className="video-desc">
                  <p className={cy("content-desc")}>
                     {data.popular_video.description}
                     <span>#monquayeuthuong</span>
                     <span>#ngaycuame</span>
                     <span>#20/10</span>
                  </p>
                  <a className={cy("music-info")} href="/home">
                     <span>
                        <FontAwesomeIcon icon={faMusic} />
                     </span>
                     Music - Steal My Girls
                  </a>
               </div>
            </div>
         </div>
      </>
   );
}

export default VideoPreview;
