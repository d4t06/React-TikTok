import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faMusic, faHome, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { CameraIcon } from "~/assets/icons";

import Button from "../../../components/Button";
import AccountItem from "../../../components/AccountsItem";
// import PopupItem from "~/components/PopupItem";
import config from "~/config";
import { useState } from "react";

const cx = classNames.bind(styles);
const suggestedAcc = [
   {
      id: 1,
      full_name: "theanh28entertainment",
      tick: true,
      nickname: "Theanh 28 Entertainment",
   },
   {
      id: 2,
      full_name: "theanh28entertainment",
      tick: true,
      nickname: "Theanh 28 Entertainment",
   },
   {
      id: 3,
      full_name: "theanh28entertainment",
      tick: true,
      nickname: "Theanh 28 Entertainment",
   },
   {
      id: 4,
      full_name: "theanh28entertainment",
      tick: true,
      nickname: "Theanh 28 Entertainment",
   },
   {
      id: 5,
      full_name: "theanh28entertainment",
      tick: true,
      nickname: "Theanh 28 Entertainment",
   },
];

function Sidebar() {
   const [activeNav, setActiveNav] = useState(1);
   return (
      <div className={cx("sidebar-container")}>
         <nav className={cx("cta")}>
            {/* <PopupItem primary type={"sidebar"} large icon={<FontAwesomeIcon icon={faHome} />}>
               For You
            </PopupItem>
            <PopupItem type={"sidebar"} large icon={<FontAwesomeIcon icon={faUserGroup} />}>
               Following
            </PopupItem>
            <PopupItem type={"sidebar"} large icon={<CameraIcon />}>
               LIVE
            </PopupItem> */}
            <Button
               to={config.routes.home}
               className={cx("sidebar-cta-btn")}
               nopos
               full
               leftIcon={<FontAwesomeIcon icon={faHome} />}
            >
               For You
            </Button>
            <Button
               to={config.routes.following}
               className={cx("sidebar-cta-btn")}
               nopos
               full
               leftIcon={<FontAwesomeIcon icon={faUserGroup} />}
            >
               Following
            </Button>
            <Button
               className={cx("sidebar-cta-btn")}
               full
               nopos
               to={config.routes.live}
               leftIcon={<CameraIcon />}
            >
               LIVE
            </Button>
         </nav>

         {config.isUser && (
            <div className={cx("login-frame")}>
               <p className={cx("login-hint")}>
                  Log in to follow creators, like videos, and view comments.
               </p>
               <Button full outline nopos className={cx("login-btn")}>
                  Log in
               </Button>
            </div>
         )}

         <div className={cx("suggested-account")}>
            <label>Suggested accounts</label>

            {suggestedAcc &&
               suggestedAcc.map((item) => {
                  return <AccountItem key={item.id} data={item} />;
               })}
            <button className={cx("see-all")}>See all</button>
         </div>

         <div className={cx("discover-container")}>
            <label>Discover</label>
            <Button tag round leftIcon={<FontAwesomeIcon icon={faHashtag} />}>
               suthatla
            </Button>
            <Button tag round leftIcon={<FontAwesomeIcon icon={faHashtag} />}>
               toikhongbit
            </Button>
            <Button tag round leftIcon={<FontAwesomeIcon icon={faMusic} />}>
               Yeu Don Phuong La Gi
            </Button>
            <Button tag round leftIcon={<FontAwesomeIcon icon={faMusic} />}>
               Steal My Girl
            </Button>
            <Button tag round leftIcon={<FontAwesomeIcon icon={faMusic} />}>
               Có Hẹn Với Thanh Xuấn
            </Button>
         </div>

         <div className={cx("sidebar-footer")}></div>
      </div>
   );
}

export default Sidebar;
