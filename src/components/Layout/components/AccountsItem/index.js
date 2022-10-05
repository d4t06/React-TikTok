import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";

const cx = classNames.bind(styles);
function AccountItem() {
   return (
      <div className={cx("account-item")}>
         {/* cách làm anh vuông
            cách 1: div -> img rồi dùng objectfit
            cách 2: div -> div.backgroundimage='' rồi dùng paddingtop 100%
        */}
         <div className={cx("avatar-frame")}>
            <img src={require("~/assets/images/avatar.jpg")} />
         </div>
         <div>
            <h3 className={cx("user-name")}>
               dat.nguyenhuu
               <FontAwesomeIcon
                  className={cx("check-icon")}
                  icon={faCircleCheck}
               />
            </h3>
            <h4 className={cx("user-desc")}>huudatit06</h4>
         </div>
      </div>
   );
}

export default AccountItem;
