import classNames from "classnames/bind";
import styles from "./PopupItem.module.scss";

const cx = classNames.bind(styles);

function PopupItem({ type, icon, children, primary = false }) {
   let classes = cx("item", {
      [type]: type,
      primary,
   });
   return (
      <li className={classes}>
         <a>
            {icon && <span className={cx("popup-icon")}>{icon}</span>}
            {children}
         </a>
      </li>
   );
}

export default PopupItem;
