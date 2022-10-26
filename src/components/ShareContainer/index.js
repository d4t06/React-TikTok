import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "./ShareContainer.module.scss";

import PopupItem from "../PopupItem";
import { Wrapper as PopperWrapper } from "~/components/Popper";

import { SHARE_ITEMS } from "~/assets/items/menuItem";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ShareContainer() {
   const [items, setItems] = useState(SHARE_ITEMS);
   //    rnederItem = () => {};

   {
      console.log(items);
   }
   return (
      <PopperWrapper styles={{ width: "230px" }}>
         {!!items &&
            items.map((item, index) => {
               return <PopupItem className={cx("share-item")} key={index} item={item} />;
            })}
         <button className={cx("more-share-btn")} onClick={() => setItems((item) => [...items, ...items])}>
            <FontAwesomeIcon icon={faChevronDown} />
         </button>
      </PopperWrapper>
   );
}

export default ShareContainer;
