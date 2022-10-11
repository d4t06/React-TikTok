import classNames from "classnames/bind";
import styles from "./PopupItem.module.scss";
import { forwardRef } from "react";

const cx = classNames.bind(styles);

function PopupItem({ item = {}, type, icon, children, primary, onClick }, ref) {
   const classes = cx("item", {
      [type]: type,
      primary,
      seperate: item.seperate,
   });

   return (
      <li ref={ref} className={classes} onClick={onClick}>
         <a>
            {icon && <span className={cx("popup-icon")}>{icon}</span>}
            {children}

            {item && <span className={cx("popup-icon")}>{item.icon}</span>}
            {item && item.title}
         </a>
      </li>
   );
}

export default forwardRef(PopupItem);
