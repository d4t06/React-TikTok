import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import PopupItem from "../../components/PopupItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faCamera,
   faHashtag,
   faHome,
   faMusic,
   faUserGroup,
   faVideo,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";

const cx = classNames.bind(styles);

function Sidebar() {
   return (
      <div className={cx("sidebar-container")}>
         <div className={cx("cta")}>
            <PopupItem primary type={"sidebar"} large icon={<FontAwesomeIcon icon={faHome} />}>
               For You
            </PopupItem>
            <PopupItem type={"sidebar"} large icon={<FontAwesomeIcon icon={faUserGroup} />}>
               Following
            </PopupItem>
            <PopupItem type={"sidebar"} large icon={<FontAwesomeIcon icon={faCamera} />}>
               Live
            </PopupItem>
         </div>
         <div className={cx("login-frame")}>
            <p className={cx("login-hint")}>
               Log in to follow creators, like videos, and view comments.
            </p>
            <Button full outline>
               Log in
            </Button>
         </div>
         <div className={cx("discover-container")}>
            <label>Discover</label>
            <div className={cx("list-container")}>
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
         </div>
      </div>
   );
}

export default Sidebar;
