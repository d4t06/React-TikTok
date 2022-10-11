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
import SidebarHeader from "./SidebarHeader";

const cx = classNames.bind(styles);

function Sidebar() {
   return (
      <div className={cx("sidebar-container")}>
         <SidebarHeader />

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
