import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import image from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faCircleXmark,
   faMagnifyingGlass,
   faSpinner,
} from "@fortawesome/free-solid-svg-icons";
// console.log(image);
const cx = classNames.bind(styles);

function Header() {
   return (
      <header className={cx("wrapper")}>
         <div className={cx("inner")}>
            <img src={image.logo} alt="logo" />
            <div className={cx("search")}>
               <input
                  className={cx("input")}
                  placeholder="Search accounts and videos"
               />
               <button className={cx("clear")}>
                  <FontAwesomeIcon icon={faCircleXmark} />
               </button>
               <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
               <div className={cx("search-btn")}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
               </div>
            </div>
            <div className={cx("cta")}>
               <div>
                  <span></span>
                  Upload
               </div>
               <button>Log in</button>
            </div>
         </div>
      </header>
   );
}

export default Header;
