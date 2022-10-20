import classNames from "classnames/bind";
import AccountsItem from "~/components/AccountsItem";
import NavItem from "~/layouts/components/Sidebar/components/NavItem";
import styles from "./ContentItem.module.scss";
const cx = classNames.bind(styles);

function ContentItem() {
   return (
      <div className={cx("main-container")}>
         <AccountsItem imgOnly />
         <div className={cx("content-container")}>
            <div className={cx("content-header")}>
               <h3 className={cx("user-name")}>Nguyenhuudat</h3>
               <p className={cx("content-desc")}>Nguyen huu dat</p>
               <NavItem>Nhạc nền - Steal My Girls</NavItem>
            </div>
         </div>
      </div>
   );
}

export default ContentItem;
