import classNames from "classnames/bind";
import styles from "./PopupItem.module.scss";

const cx = classNames.bind(styles);

function PopupItem({ type, icon, children, primary = false, data, onClick }) {
   let classes = cx("item", {
      [type]: type,
      primary,
   });
   return (
      <li className={classes} onClick={onClick}>
         <a>
            {icon && <span className={cx("popup-icon")}>{icon}</span>}
            {children}

            {data && <span className={cx("popup-icon")}>{data.icon}</span>}
            {data && data.title}
         </a>
      </li>
   );
}

export default PopupItem;
