import {
   faCircleXmark,
   faEllipsisVertical,
   faMagnifyingGlass,
   faPlus,
   faSpinner,
   faA,
   faKeyboard,
   faQuestion,
   faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/animations/scale.css";

import styles from "./Header.module.scss";
import Image from "~/assets/images";
import { Wrapper as PopperWrapper } from "../Popper";
import PopupItem from "../PopupItem";
import AccountItem from "../AccountsItem";
import Button from "../Button";
import Menu from "../Menu/Header";

const MENU_ITEMS = [
   {
      icon: <FontAwesomeIcon icon={faA} />,
      title: "English",
      children: {
         title: "Language",
         data: [
            {
               code: "en",
               title: "English",
            },
            {
               code: "vi",
               title: "Tiếng Việt",
               children: {
                  title: "Language",
                  data: [
                     {
                        code: "en",
                        title: "English1",
                     },
                     {
                        code: "vi",
                        title: "Tiếng Việt1",
                     },
                  ],
               },
            },
         ],
      },
   },
   {
      icon: <FontAwesomeIcon icon={faQuestion} />,
      title: "Feeback and help",
      to: "/feeback",
   },
   {
      icon: <FontAwesomeIcon icon={faKeyboard} />,
      title: "Keyboard shortcuts",
   },
];

const cx = classNames.bind(styles);
function Header() {
   const [searchResult, setSearchResult] = useState([]);
   const [history, setHistory] = useState([{ data: MENU_ITEMS }]);
   let current = history[history.length - 1];
   // console.log(current);
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
                  }
               }}
            />
         );
      });
   };
   function test(arr) {
      return arr.slice(0, arr.length - 1);
   }
   function backMenu() {
      // lấy phần tử bị remove
      // setHistory((prev) => prev.splice(history.length - 1, 1));
      console.log("history", history);

      setHistory(history.splice(0, history.length - 1));

      // lấy mảng bị thay đổi
      // setHistory(() => history.splice(history.length - 1, 1));
      console.log(history);
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

            <Tippy
               // visible={true}
               trigger="mouseenter"
               interactive
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
               )}
            >
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
                  }
               >
                  Upload
               </Button>

               <Button primary>Log in</Button>

               <Tippy
                  visible
                  // trigger="mouseenter"
                  interactive
                  delay={[0, 500]}
                  placement="bottom-end"
                  // animation="scale"
                  render={(attrs) => (
                     <div tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx("sort")}>
                           {history.length > 1 && (
                              <div className={cx("menu-header")}>
                                 <span
                                    className={cx("header-icon")}
                                    onClick={() => backMenu()}
                                 >
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                 </span>

                                 <h4 className={cx("header-title")}>
                                    Language
                                 </h4>
                              </div>
                           )}
                           {renderItem()}
                        </PopperWrapper>
                     </div>
                  )}
               >
                  <button className={cx("more-icon")}>
                     <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>
               </Tippy>
               {/* <Menu>
                  <button className={cx("more-icon")}>
                     <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>
               </Menu> */}
            </div>
         </div>
      </header>
   );
}

export default Header;
