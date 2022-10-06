import { faA, faKeyboard, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Wrapper as PopperWrapper } from "../Popper";
import Tippy from "@tippyjs/react";
import styles from "./Menu.module.scss";
import classNames from "classnames/bind";
import PopupItem from "../PopupItem";

const cx = classNames.bind(styles);
function Menu({ children }) {
   return (
      <Tippy
         trigger="mouseenter"
         interactive
         placement="bottom-end"
         render={(attrs) => (
            <div tabIndex="-1" {...attrs}>
               <PopperWrapper className={cx("wrapper", "sort")}>
                  <PopupItem icon={<FontAwesomeIcon icon={faA} />}>English</PopupItem>
                  <PopupItem icon={<FontAwesomeIcon icon={faQuestion} />}>
                     Feeback and help
                  </PopupItem>
                  <PopupItem icon={<FontAwesomeIcon icon={faKeyboard} />}>
                     Keyboard shortcuts
                  </PopupItem>
               </PopperWrapper>
            </div>
         )}
      >
         {children}
      </Tippy>
   );
}

export default Menu;
