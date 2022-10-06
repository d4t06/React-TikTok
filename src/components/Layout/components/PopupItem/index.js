import classNames from "classnames/bind";
import styles from "./PopupItem.module.scss";

const cx = classNames.bind(styles);

function PopupItem({ icon, children }) {
   return (
      <li className={cx("item")}>
         <a>
            {icon && <span className={cx("popup-icon")}>{icon}</span>}
            {children}
         </a>
      </li>
   );
}

export default PopupItem;
