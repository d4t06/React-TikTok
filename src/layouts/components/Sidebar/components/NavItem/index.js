import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import styles from "./NavItem.module.scss";

const cx = classNames.bind(styles);
function NavItem({ children, icon, to, className }) {
   return (
      <NavLink to={to} className={cx("sidebar-nav", { [className]: className })}>
         {icon && <span>{icon}</span>}
         {children}
      </NavLink>
   );
}

export default NavItem;
