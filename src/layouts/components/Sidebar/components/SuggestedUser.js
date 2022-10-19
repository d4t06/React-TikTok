import styles from "../Sidebar.module.scss";
import stylesFromAccountItem from "~/components/AccountsItem/AccountItem.module.scss";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import AccountItem from "~/components/AccountsItem";
import Menu from "~/components/Menu";
import Image from "~/components/Image";
import Button from "~/components/Button";

const cx = classNames.bind(styles);
const cx_AccountItem = classNames.bind(stylesFromAccountItem);

function SuggestedUser({ data }) {
   return (
      <>
         {data &&
            data.map((item) => {
               return (
                  <Menu
                     key={item.id}
                     content={
                        <div className={cx("account-preview")}>
                           <div className={cx("account-preview-header")}>
                              <div className={cx_AccountItem("avatar-frame") + " " + cx("avatar-frame-preview")}>
                                 {(item.avatar && item.avatar.includes(".jpg")) || item.avatar.includes(".jpeg") ? (
                                    <Image src={item.avatar} />
                                 ) : (
                                    <Image />
                                 )}
                              </div>
                              <Button primary>Follow</Button>
                           </div>
                           <h3 className={cx("user-name", "user-name-preview")}>
                              {`${item.first_name} ${item.last_name}`}
                              <FontAwesomeIcon
                                 className={cx_AccountItem("check-icon", "img-only")}
                                 icon={faCircleCheck}
                              />
                           </h3>
                           <h4 className={cx("user-desc", "user-desc-preview")}>{item.nickname}</h4>
                           <p className={cx("user-counting")}>
                              <span className={cx("count", "follow-count")}>{item.followers_count}</span>
                              <span className={cx("count-desc")}>Follower</span>
                              <span className={cx("count", "like-count")}>{item.likes_count}</span>
                              <span className={cx("count-desc")}>Likes</span>
                           </p>
                        </div>
                     }
                     option={{
                        placement: "bottom",
                        offset: [-10, 0],
                        delay: [500, 0],
                        hideOnClick: false,
                        appendTo: () => document.body,
                     }}
                  >
                     <AccountItem data={item} />
                  </Menu>
               );
            })}
      </>
   );
}

export default SuggestedUser;
