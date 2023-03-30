import classNames from "classnames/bind";
import styles from "./PopupItem.module.scss";
import { forwardRef } from "react";

const cx = classNames.bind(styles);

function PopupItem(
   { item = false, type, icon, children, primary, onClick, className },
   ref
) {
   const classes = cx("item", {
      [type]: type,
      [className]: className,
      // [item.name]: item.name,
      primary,
      seperate: item.seperate,
   });

   return (
      <li ref={ref} className={classes} onClick={onClick}>
         <a>
            {icon && <span>{icon}</span>}
            {!item && <p>{children}</p>}

            {item && (
               <span
                  className={cx("popup-icon", {
                     [item.name]: item.name,
                  })}
               >
                  {item.icon}
               </span>
            )}
            {item && item.title}
         </a>
         {item.status && <a className={cx("status")}>{item.status}</a>}
      </li>
   );
}

export default forwardRef(PopupItem);
