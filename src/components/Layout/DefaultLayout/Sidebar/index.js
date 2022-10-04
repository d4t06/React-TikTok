import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Sidebar() {
   return <aside className={cx("sidebar")}>Sidebar</aside>;
}

export default Sidebar;
