import {
   faCircleXmark,
   faEllipsisVertical,
   faMagnifyingGlass,
   faPlus,
   faSpinner,
   faChevronLeft,
   faCloudArrowUp,
   faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import TippyHeadless from "@tippyjs/react/headless";
import { useEffect, useState } from "react";

import Image from "~/assets/images";
import { Wrapper as PopperWrapper } from "../Popper";
import PopupItem from "../PopupItem";
import AccountItem from "../AccountsItem";
import Button from "../Button";
import MENU_ITEMS from "~/assets/items/menuItem";

import styles from "./Header.module.scss";
import stylesx from "../AccountsItem/AccountItem.module.scss";
import classNames from "classnames/bind";
import { render } from "@testing-library/react";
const cx = classNames.bind(styles);
const cy = classNames.bind(stylesx);

function Header() {
   const [searchResult, setSearchResult] = useState([]);
   const [history, setHistory] = useState([{ data: MENU_ITEMS }]);

   const currentUser = true;
   const current = history[history.length - 1];
   const handleItem = (item) => {
      console.log(item);
   };
   const renderItem = () => {
      return current.data.map((item, index) => {
         const isParent = !!item.children;
         return (
            <PopupItem
               key={index}
               data={item}
               onClick={() => {
                  if (isParent) {
                     setHistory((prev) => [...prev, item.children]);
                  } else handleItem(item);
               }}
            />
         );
      });
   };
   function test(arr) {
      return arr.slice(0, arr.length - 1);
   }
   function backMenu() {
      setHistory((prev) => prev.slice(0, history.length - 1));
      // lấy phần tử bị remove
      // setHistory(history.splice(0, history.length - 1));
      // lấy mảng bị thay đổi
      // setHistory(() => history.splice(history.length - 1, 1));
   }

   useEffect(() => {
      setTimeout(() => {
         setSearchResult([1, 2, 3]);
      }, 100);
   });
   return (
      <header className={cx("wrapper")}>
         <div className={cx("inner")}>
            <img src={Image.logo} alt="logo" />

            <TippyHeadless
               trigger="mouseenter"
               interactive
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
               )}
            >
               <div className={cx("search")}>
                  <input className={cx("input")} placeholder="Search accounts and videos" />
                  <button className={cx("clear")}>
                     <FontAwesomeIcon icon={faCircleXmark} />
                  </button>
                  <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
                  <div className={cx("search-btn")}>
                     <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </div>
               </div>
            </TippyHeadless>

            <div className={currentUser ? cx("cta", "cta-user") : cx("cta")}>
               {currentUser ? (
                  <>
                     <Tippy content="Upload Video">
                        <Button
                           tippy={{
                              content: "Upload video",
                              option: [
                                 {
                                    trigger: "click",
                                 },
                              ],
                           }}
                           text
                        >
                           <FontAwesomeIcon icon={faCloudArrowUp} />
                        </Button>
                     </Tippy>
                     <Tippy content="Upload Video">
                        <Button
                           tippy={{
                              content: "Message",
                              option: [
                                 {
                                    trigger: "click",
                                 },
                              ],
                           }}
                           text
                        >
                           <FontAwesomeIcon icon={faMessage} />
                        </Button>
                     </Tippy>

                     <TippyHeadless
                        interactive
                        placement="bottom"
                        render={(attrs) => (
                           <div tabIndex="-1" {...attrs}>
                              <PopperWrapper className={cx("sort")}>{renderItem()}</PopperWrapper>
                           </div>
                        )}
                     >
                        {/* <AccountItem imgOnly />
                         */}
                        <div className={cy("avatar-frame", "img-only")}>
                           <img src={require("~/assets/images/avatar.jpg")} />
                        </div>
                     </TippyHeadless>
                  </>
               ) : (
                  <>
                     <Button
                        normal
                        long
                        leftIcon={<FontAwesomeIcon className={cx("plus-icon")} icon={faPlus} />}
                     >
                        Upload
                     </Button>
                     <Button normal primary>
                        Log in
                     </Button>
                     <TippyHeadless
                        trigger="mouseenter"
                        interactive
                        delay={[0, 300]}
                        placement="bottom-end"
                        // animation="scale"
                        render={(attrs) => (
                           <div tabIndex="-1" {...attrs}>
                              <PopperWrapper className={cx("sort")}>
                                 {/* Header */}
                                 {history.length > 1 && (
                                    <div className={cx("menu-header")}>
                                       <span
                                          className={cx("header-icon")}
                                          onClick={() => backMenu()}
                                       >
                                          <FontAwesomeIcon icon={faChevronLeft} />
                                       </span>

                                       <h4 className={cx("header-title")}>Language</h4>
                                    </div>
                                 )}
                                 {/* Menu item */}
                                 {renderItem()}
                              </PopperWrapper>
                           </div>
                        )}
                        onHide={() => setHistory((prev) => prev.slice(0, 1))}
                     >
                        <button className={cx("more-icon")}>
                           <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                     </TippyHeadless>
                  </>
               )}
            </div>
         </div>
      </header>
   );
}

export default Header;
