// import { faA, faKeyboard, faQuestion } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Wrapper as PopperWrapper } from "../Popper";
// import styles from "./Menu.module.scss";
// import classNames from "classnames/bind";
// const cx = classNames.bind(styles);

import TippyHeadless from "@tippyjs/react/headless";
import Tippy from "@tippyjs/react";
function Menu({ type, content, children, onHide }) {
   return (
      <>
         {type ? (
            <>
               <Tippy content={content}>{children}</Tippy>
            </>
         ) : (
            <>
               <TippyHeadless
                  interactive
                  trigger="click"
                  placement="bottom-end"
                  render={(attrs) => (
                     <div tabIndex="-1" {...attrs}>
                        {content}
                     </div>
                  )}
                  onHide={onHide}>
                  {children}
               </TippyHeadless>
            </>
         )}
      </>
   );
}

export default Menu;
