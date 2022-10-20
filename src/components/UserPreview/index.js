import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Button from "../Button";
import Image from "../Image";
import styles from "./UserPreview.module.scss";
import styles_from_accountItem from "../AccountsItem/AccountItem.module.scss";

const cx_accountItem = classNames.bind(styles_from_accountItem);

const cx = classNames.bind(styles);

function UserPreview({ data, button = { primary: true } }) {
   return (
      <div className={cx("account-preview")}>
         <div className={cx("account-preview-header")}>
            <div className={cx_accountItem("avatar-frame") + " " + cx("avatar-frame-preview")}>
               {(data.avatar && data.avatar.includes(".jpg")) || data.avatar.includes(".jpeg") ? (
                  <Image src={data.avatar} />
               ) : (
                  <Image />
               )}
            </div>
            <Button {...button}>Follow</Button>
         </div>
         <h3 className={cx("user-name", "user-name-preview")}>
            {`${data.first_name} ${data.last_name}`}
            <FontAwesomeIcon className={cx_accountItem("check-icon", "img-only")} icon={faCircleCheck} />
         </h3>
         <h4 className={cx("user-desc", "user-desc-preview")}>{data.nickname}</h4>
         <p className={cx("user-counting")}>
            <span className={cx("count", "follow-count")}>{data.followers_count}</span>
            <span className={cx("count-desc")}>Follower</span>
            <span className={cx("count", "like-count")}>{data.likes_count}</span>
            <span className={cx("count-desc")}>Likes</span>
         </p>
      </div>
   );
}

export default UserPreview;
