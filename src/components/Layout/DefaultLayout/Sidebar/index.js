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
import AccountItem from "../../components/AccountsItem";

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
   return (
      <div className={cx("sidebar-container")}>
         <SidebarHeader />

         <div className={cx("suggested-account")}>
            <label>Suggested accounts</label>
            {suggestedAcc.map((item) => {
               return <AccountItem key={item.id} data={item} />;
            })}
            <button className={cx("see-all")}>See all</button>
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

         <div className={cx("sidebar-footer")}></div>
      </div>
   );
}

export default Sidebar;
