import {
   faCircleXmark,
   faEllipsisVertical,
   faMagnifyingGlass,
   faPlus,
   faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";

import styles from "./Header.module.scss";
import Image from "~/assets/images";
import { Wrapper as PopperWrapper } from "../Popper";
import AccountItem from "../AccountsItem";

const cx = classNames.bind(styles);
function Header() {
   const [searchResult, setSearchResult] = useState([]);

   useEffect(() => {
      setTimeout(() => {
         setSearchResult([1, 2, 3]);
      }, 100);
   });
   return (
      <header className={cx("wrapper")}>
         <div className={cx("inner")}>
            <img src={Image.logo} alt="logo" />

            <Tippy
               allowHTML
               visible={searchResult.length > 1}
               render={(attrs) => (
                  <div className={cx("search-result")} tabIndex="-1" {...attrs}>
                     <PopperWrapper>
                        <AccountItem />
                        <label className={cx("lable-text")}>Accounts</label>
                        <AccountItem />
                        <AccountItem />
                        <AccountItem />
                        <AccountItem />
                     </PopperWrapper>
                  </div>
               )}>
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
            </Tippy>

            <div className={cx("cta")}>
               <button className={cx("btn")}>
                  <div className={cx("div-upload")}>
                     <FontAwesomeIcon
                        className={cx("plus-icon")}
                        icon={faPlus}
                     />
                     <span className={cx("upload-text")}>Upload</span>
                  </div>
               </button>
               <button className={cx("btn", cx("primary"))}>Log in</button>
               <button className={cx("seemore-icon")}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
               </button>
            </div>
         </div>
      </header>
   );
}

export default Header;
