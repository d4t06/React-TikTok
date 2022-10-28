import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Children, useState } from "react";
import styles from "./ShareContainer.module.scss";

import PopupItem from "../PopupItem";
import { Wrapper as PopperWrapper } from "~/components/Popper";

import { SHARE_ITEMS, SHARE_ITEMS_EXPAND } from "~/assets/items/menuItem";
import classNames from "classnames/bind";
import Menu from "../Menu";

const cx = classNames.bind(styles);

function ShareContainer({ children }) {
   const [items, setItems] = useState(SHARE_ITEMS);
   //    rnederItem = () => {};

   return (
      <Menu
         content={
            <PopperWrapper styles={{ width: "230px", maxHeight: "50vh" }}>
               {!!items &&
                  items.map((item, index) => {
                     return <PopupItem className={cx("share-item")} key={index} item={item} />;
                  })}
               {items.length <= 5 && (
                  <button
                     button
                     className={cx("more-share-btn")}
                     onClick={() => setItems((item) => [...item, ...SHARE_ITEMS_EXPAND])}
                  >
                     <FontAwesomeIcon icon={faChevronDown} />
                  </button>
               )}
            </PopperWrapper>
         }
         option={{
            placement: "top-start",
            offset: [-5, 10],
            delay: [50, 500],
            hideOnClick: false,
            appendTo: () => document.body,
         }}
         onHide={() => setItems(SHARE_ITEMS)}
      >
         {children}
      </Menu>
   );
}

export default ShareContainer;
