import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faMusic, faHome, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { CameraIcon } from "~/assets/icons";

import Button from "../../../components/Button";
import AccountItem from "../../../components/AccountsItem";
// import PopupItem from "~/components/PopupItem";
import config from "~/config";
import NavItem from "./components/NavItem";

const cx = classNames.bind(styles);
const suggestedAcc = [
   {
      id: 1,
      full_name: "theanh28entertainment",
      tick: true,
      nickname: "Theanh 28 Entertainment",
      avatar:
         "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/fac92301a36c2275c99f393061ef04ca~c5_100x100.jpeg?x-expires=1666321200&x-signature=p%2FQEcRjlxNc8olvEs3pvZu5Tr0k%3D",
   },
   {
      id: 2,
      full_name: "theanh28entertainment",
      tick: true,
      nickname: "Theanh 28 Entertainment",
      avatar:
         "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1666321200&x-signature=Zn2dGCMgpJx%2Bzq5vEdvRWMhL2uk%3D",
   },
   {
      id: 3,
      full_name: "theanh28entertainment",
      tick: true,
      nickname: "Theanh 28 Entertainment",
      avatar:
         "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1666321200&x-signature=Zn2dGCMgpJx%2Bzq5vEdvRWMhL2uk%3D",
   },
   {
      id: 4,
      full_name: "theanh28entertainment",
      tick: true,
      nickname: "Theanh 28 Entertainment",
      avatar:
         "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1666321200&x-signature=Zn2dGCMgpJx%2Bzq5vEdvRWMhL2uk%3D",
   },
   {
      id: 5,
      full_name: "60giay.com",
      tick: true,
      nickname: "60giay.com",
      avatar:
         "https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/a454aa795bdb1a9970cc2106321360e6.jpeg?x-expires=1666324800&x-signature=nH0xqKnEwlmmhsPkUh4j9XOtZcs%3D",
   },
];

function Sidebar() {
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
            <NavItem to={config.routes.home} icon={<FontAwesomeIcon icon={faHome} />}>
               For You
            </NavItem>
            <NavItem to={config.routes.following} icon={<FontAwesomeIcon icon={faUserGroup} />}>
               Following
            </NavItem>
            <NavItem to={config.routes.live} icon={<CameraIcon />}>
               LIVE
            </NavItem>
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
                  return <AccountItem tippy key={item.id} data={item} />;
               })}
            <button className={cx("see-all")}>See all</button>
         </div>

         <div className={cx("suggested-account")}>
            <label>Following accounts</label>

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
