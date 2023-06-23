import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import Header from "~/layouts/components/Header";
import Sidebar from "~/layouts/components/Sidebar";
import useTheme from "~/hook/useTheme";
import { useSelector } from "react-redux";
import { SelectAllModalStore } from "~/store/modalSlice";
import { useEffect } from "react";

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
   const { darkTheme } = useTheme();
   const modalStore = useSelector(SelectAllModalStore)

   const {isOpenModal} = modalStore

   // useEffect(() => {
   //    return () => {

   //    }
   // }, [isOpenModal])


   return (
      <div className={cx("wrapper", darkTheme ? "dark" : "")}>
         <Header />
         <div className={cx("Container")}>
            <Sidebar />
            <div className={cx("Content", isOpenModal ? "ovf-hidden" : "")}>{children}</div>
         </div>
      </div>
   );
}

export default DefaultLayout;
