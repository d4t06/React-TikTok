import { faMusic, faCircleCheck, faShare, faHeart, faMessage, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useEffect, useState } from "react";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import Menu from "~/components/Menu";
import AccountsItem from "~/components/AccountsItem";
import styles from "./ContentItem.module.scss";
import styles_from_cx_suggestedUser from "~/layouts/components/Sidebar/Sidebar.module.scss";
import styles_from_accountItem from "~/components/AccountsItem/AccountItem.module.scss";
import UserPreview from "~/components/UserPreview";
import Video from "./Video/Video";
import { SHARE_ITEMS } from "~/assets/items/menuItem";
import PopupItem from "~/components/PopupItem";
import { Wrapper as PopperWrapper } from "~/components//Popper";
import ShareContainer from "~/components/ShareContainer";

const cx = classNames.bind(styles);
const cx_suggestedUser = classNames.bind(styles_from_cx_suggestedUser);
const cx_accountItem = classNames.bind(styles_from_accountItem);

function Contentdata({ data }) {
   return (
      <>
         {console.log("render")}
         {data &&
            data.map((data) => {
               if (!data.popular_video) return;
               return (
                  <div key={data.id} className={cx("item-container", "seperate")}>
                     <AccountsItem className={cx("avatarframe-main-container")} imgOnly src={data.avatar} />
                     <div className={cx("main-container")}>
                        <div className={cx("content-header")}>
                           <div className={cx("content-text")}>
                              <p className={cx("user-info")}>
                                 <Menu
                                    content={<UserPreview data={data} button={{ outline: true }}></UserPreview>}
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
                                 <span className={cx("full-name")}>{`${data.first_name} ${data.last_name}`}</span>
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
                           <Button outline className={cx("follow-btn")}>
                              Follow
                           </Button>
                        </div>
                        <div className={cx("video-wrapper")}>
                           <Video src={data.popular_video.file_url} />
                           <div className={cx("video-action")}>
                              <button>
                                 <FontAwesomeIcon icon={faHeart} />
                              </button>
                              <span className={cx("share-number")}>827</span>

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
                        </div>
                     </div>
                  </div>
               );
            })}
      </>
   );
}

export default Contentdata;
