import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import Header from "~/layouts/components/Header";
import Sidebar from "~/layouts/components/Sidebar";

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
   return (
      <div className={cx("wrapper")}>
         <Header />
         <div className={cx("Container")}>
            <Sidebar />
            <div className={cx("Content")}>{children}</div>
         </div>
      </div>
   );
}

export default DefaultLayout;
