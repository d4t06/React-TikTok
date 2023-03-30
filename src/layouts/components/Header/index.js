import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import classNames from "classnames/bind";

import {
   faEllipsisVertical,
   faPlus,
   faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { MessageIcon, InboxIcon } from "~/assets/icons";

import { Wrapper as PopperWrapper } from "~/components//Popper";
import { MENU_ITEMS, USER_ITEMS } from "~/assets/items/menuItem";

import Image from "~/components/Image";
import PopupItem from "~/components//PopupItem";
import Button from "~/components/Button";
import config from "~/config";
import Menu from "~/components//Menu";
import routesConfig from "~/config/routes";
import Search from "../Search";

import styles from "./Header.module.scss";
import stylesx from "~/components//AccountsItem/AccountItem.module.scss";
import useTheme from "~/hook/useTheme";
const cx = classNames.bind(styles);
const cy = classNames.bind(stylesx);

function Header() {
   const { darkTheme, setDarkTheme } = useTheme();

   // const currentUser = true;

   const [history, setHistory] = useState(
      config.isUser ? [{ data: USER_ITEMS }] : [{ data: MENU_ITEMS }]
   );

   const current = history[history.length - 1];
   const handleItem = (item) => {
      // console.log(item);
      if (item.action === "SET_THEME") {
         setDarkTheme(!darkTheme);
         item.status = darkTheme ? "Off" : "On";
      }
   };

   const renderItem = (data) => {
      return current.data.map((item, index) => {
         const isParent = !!item.children;

         return (
            <PopupItem
               key={index}
               item={item}
               onClick={() => {
                  if (isParent) {
                     setHistory((prev) => [...prev, item.children]);
                  } else handleItem(item);
               }}
            />
         );
      });
   };

   function backMenu() {
      setHistory((prev) => prev.slice(0, history.length - 1));
      // setHistory(history.splice(0, history.length - 1)); lấy phần tử bị remove
      // setHistory(() => history.splice(history.length - 1, 1)); lấy mảng bị thay đổi
   }

   return (
      <header className={cx("wrapper", darkTheme ? "dark" : "")}>
         <div className={cx("inner")}>
            {/* logo */}
            <Button to={routesConfig.home} className={cx("logo")}>
               <Image
                  src={require("~/assets/images/logo.svg").default}
                  alt="logo"
               />
            </Button>

            {/* Search */}
            <Search />

            {/* cta */}
            <div className={config.isUser ? cx("cta", "cta-user") : cx("cta")}>
               {config.isUser ? (
                  <>
                     <Button
                        normal
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

                     <Menu
                        type
                        content="Message"
                        option={{
                           appendTo: () => document.body,
                        }}
                     >
                        <Button pd-t icon>
                           <InboxIcon />
                        </Button>
                     </Menu>

                     <Menu
                        type
                        content="Inbox"
                        option={{
                           appendTo: () => document.body,
                        }}
                     >
                        <Button icon pseudo>
                           <MessageIcon />
                        </Button>
                     </Menu>

                     <Menu
                        content={
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
                              {renderItem(USER_ITEMS)}
                           </PopperWrapper>
                        }
                        option={{
                           offset: [12, 8],
                           trigger: "mouseenter",
                           hideOnClick: false,
                        }}
                        onHide={() =>
                           setHistory(
                              config.isUser
                                 ? [{ data: USER_ITEMS }]
                                 : [{ data: MENU_ITEMS }]
                           )
                        }
                     >
                        <div className={cy("avatar-frame", "img-only")}>
                           <Image src={require("~/assets/images/avatar.jpg")} />
                        </div>
                     </Menu>
                  </>
               ) : (
                  <>
                     <Button
                        normal
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
                     <Button normal primary>
                        Log in
                     </Button>

                     <Menu
                        content={
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

                                    <h4 className={cx("header-title")}>
                                       Language
                                    </h4>
                                 </div>
                              )}

                              {/* Menu item */}
                              {renderItem(MENU_ITEMS)}
                           </PopperWrapper>
                        }
                        onHide={() => setHistory((prev) => prev.slice(0, 1))}
                     >
                        <button className={cx("more-icon")}>
                           <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                     </Menu>
                  </>
               )}
            </div>
         </div>
      </header>
   );
}

export default Header;
