import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
const { faChevronLeft } = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");

const cx = classNames.bind(styles);

function Header({ title, icon }) {
   return (
      <div>
         {/* <Button>{icon}</Button> */}
         {icon && <span className={cx("header-icon")}>{icon}</span>}
         <h4 className={cx("header-title")}>{title}</h4>
      </div>
   );
}

// export { Header };
