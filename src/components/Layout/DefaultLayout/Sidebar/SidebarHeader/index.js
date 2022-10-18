import classNames from "classnames/bind";
import PopupItem from "~/components/Layout/components/PopupItem";
import styles from "./SidebarHeader.module.scss";
import { faCamera, faHome, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Layout/components/Button";
import { CameraIcon } from "~/assets/icons";

const cx = classNames.bind(styles);

function SidebarHeader() {
   return (
      <>
         <div className={cx("cta")}>
            <PopupItem primary type={"sidebar"} large icon={<FontAwesomeIcon icon={faHome} />}>
               For You
            </PopupItem>
            <PopupItem type={"sidebar"} large icon={<FontAwesomeIcon icon={faUserGroup} />}>
               Following
            </PopupItem>
            <PopupItem type={"sidebar"} large icon={<CameraIcon />}>
               LIVE
            </PopupItem>
         </div>

         <div className={cx("login-frame")}>
            <p className={cx("login-hint")}>
               Log in to follow creators, like videos, and view comments.
            </p>
            <Button full outline nopos>
               Log in
            </Button>
         </div>
      </>
   );
}

export default SidebarHeader;
