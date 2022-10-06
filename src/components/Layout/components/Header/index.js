import {
   faCircleXmark,
   faEllipsisVertical,
   faKeyboard,
   faLanguage,
   faMagnifyingGlass,
   faPlus,
   faPlusSquare,
   faQuestion,
   faSpinner,
   faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";

import styles from "./Header.module.scss";
import Image from "~/assets/images";
import { Wrapper as PopperWrapper } from "../Popper";
import AccountItem from "../AccountsItem";
import Button from "../Button";
import PopupItem from "../PopupItem";

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
               visible={true}
               interactive={true}
               // visible={searchResult.length > 1}
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
               <Button
                  long
                  leftIcon={
                     <FontAwesomeIcon
                        className={cx("plus-icon")}
                        icon={faPlus}
                     />
                  }>
                  Upload
               </Button>
               <Button primary>Log in</Button>

               <Tippy
                  visible
                  // trigger="mouseenter"
                  interactive
                  placement="bottom"
                  render={(attrs) => (
                     <div
                        className={cx("search-result")}
                        tabIndex="-1"
                        {...attrs}>
                        <PopperWrapper className={"sort"}>
                           <PopupItem
                              icon={<FontAwesomeIcon icon={faLanguage} />}>
                              English
                           </PopupItem>
                           <PopupItem
                              icon={<FontAwesomeIcon icon={faQuestion} />}>
                              Feeback and help
                           </PopupItem>
                           <PopupItem
                              icon={<FontAwesomeIcon icon={faKeyboard} />}>
                              Keyboard shortcuts
                           </PopupItem>
                        </PopperWrapper>
                     </div>
                  )}>
                  <button className={cx("more-icon")} text>
                     <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>
               </Tippy>
            </div>
         </div>
      </header>
   );
}

export default Header;
