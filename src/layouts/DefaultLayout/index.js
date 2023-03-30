import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import Header from "~/layouts/components/Header";
import Sidebar from "~/layouts/components/Sidebar";
import useTheme from "~/hook/useTheme";

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
   const { darkTheme } = useTheme();
   return (
      <div className={cx("wrapper", darkTheme ? "dark" : "")}>
         <Header />
         <div className={cx("Container")}>
            <Sidebar />
            <div className={cx("Content")}>{children}</div>
         </div>
      </div>
   );
}

export default DefaultLayout;
