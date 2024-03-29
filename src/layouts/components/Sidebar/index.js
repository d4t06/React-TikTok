import styles from "./Sidebar.module.scss";
import stylesFromAccountItem from "~/components/AccountsItem/AccountItem.module.scss";
import classNames from "classnames/bind";

import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faHashtag,
   faMusic,
   faHome,
   faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { CameraIcon } from "~/assets/icons";

import Button from "../../../components/Button";
import AccountItem from "../../../components/AccountsItem";
import config from "~/config";
import * as userService from "~/services/userService";
import SuggestedUser from "./components/SuggestedUser";
import NavItem from "./components/NavItem";

const cx = classNames.bind(styles);

function Sidebar() {
   const [suggestedUser, setSuggestedUser] = useState([]);

   useEffect((_) => {
      const fecthApi = async () => {
         const result = await userService.getSuggested(1, 5);

         // console.log(result);
         setSuggestedUser(result);
      };
      if (window.innerWidth > 1023) {
         fecthApi();
      } 
   }, []);

   return (
      <div className={cx("sidebar-container", "hide-for-small")}>
         <nav className={cx("cta")}>
            {/* <PopupItem primary type={"sidebar"} large icon={<FontAwesomeIcon icon={faHome} />}>
               For You
            </PopupItem> */}
            <NavItem
               to={config.routes.home}
               icon={<FontAwesomeIcon icon={faHome} />}
            >
               <p className={cx("hide-for-medium")}>For You</p>
            </NavItem>
            <NavItem
               to={config.routes.following}
               icon={<FontAwesomeIcon icon={faUserGroup} />}
            >
               <p className={cx("hide-for-medium")}>Following</p>
            </NavItem>
            <NavItem to={config.routes.live} icon={<CameraIcon />}>
               <p className={cx("hide-for-medium")}>LIVE</p>
            </NavItem>
         </nav>

         {!config.isUser && (
            <div className={cx("login-frame")}>
               <p className={cx("login-hint")}>
                  Log in to follow creators, like videos, and view comments.
               </p>
               <Button full outline nopos className={cx("login-btn")}>
                  Log in
               </Button>
            </div>
         )}

         <div
            className={cx("suggested-account", "seperate", "hide-for-medium")}
         >
            <label>Suggested accounts</label>

            <SuggestedUser data={suggestedUser} />

            <button className={cx("see-all")}>See all</button>
         </div>

         <div
            className={cx("suggested-account", "seperate", "hide-for-medium")}
         >
            <label>Following accounts</label>

            {suggestedUser &&
               suggestedUser.map((item) => {
                  return <AccountItem key={item.id} data={item} />;
               })}
            <button className={cx("see-all")}>See all</button>
         </div>

         <div
            className={cx("discover-container", "seperate", "hide-for-medium")}
         >
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

         <div className={cx("sidebar-footer", "seperate", "hide-for-medium")}>
            <div className={cx("link-container")}>
               <a>About</a>
               <a>Newsroom</a>
               <a>Contact</a>
               <a>Careers</a>
               <a>ByteDance</a>
            </div>
            <div className={cx("link-container")}>
               <a>TickTok for Good</a>
               <a>Advertise</a>
               <a>Developers</a>
               <a>Transperancy</a>
            </div>
            <div className={cx("link-container")}>
               <a>Help</a>
               <a>Safety</a>
               <a>Terms</a>
               <a>Privacy</a>
               <a>Creator</a>
               <a>Portal</a>
            </div>
            <span className={cx("span-copyrihgt")}>© 2022 Nguyenhuudat</span>
         </div>
      </div>
   );
}

export default Sidebar;
