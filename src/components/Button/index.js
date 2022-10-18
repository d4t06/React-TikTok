import { Link } from "react-router-dom";
import { forwardRef } from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

import { faEllipsisVertical, faL, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
const cx = classNames.bind(styles);

function Button(
   {
      wrap,
      logo,
      to,
      href,
      normal,
      text,
      outline = false,
      primary = false,
      primarytext,
      round = false,
      disable = false,
      full = false,
      tag = false,
      children,
      small,
      long,
      onClick,
      className,
      leftIcon,
      rihgtIcon,
      icon,
      tippy,
      pseudo,
      nopos,
      ...passprops
   },
   ref
) {
   let Comp = "button";

   const props = {
      onClick,
   };

   if (to) {
      props.to = to;
      Comp = Link;
   }
   if (href) {
      props.href = href;
      Comp = "a";
   }

   const classes = cx("btn", {
      [className]: className, //làm việc với object
      // wrap,
      logo,
      normal,
      text,
      primary,
      primarytext,
      outline,
      small,
      disable,
      round,
      long,
      full,
      tag,
      icon,
      tippy,
      nopos,
      ...passprops,
   });
   if (disable) {
      Object.keys(props).forEach((key) => {
         if (key.startsWith("on") && typeof props[key] === "function") {
            delete props[key];
         }
      });
   }

   return (
      <>
         {tippy ? (
            <Tippy content={tippy.content} delay={[0, 0]}>
               <Comp ref={ref} className={classes} {...props}>
                  {leftIcon && <span className={cx("left-icon")}>{leftIcon}</span>}
                  {children}
                  {rihgtIcon && <span className={cx("right-icon")}>{rihgtIcon}</span>}
               </Comp>
            </Tippy>
         ) : (
            <Comp ref={ref} className={classes} {...props}>
               {leftIcon && <span className={cx("left-icon")}>{leftIcon}</span>}
               {/* {wrap && <h4>{children}</h4>} */}
               {children}
               {pseudo && <span className={cx("inbox-quantity")}>2</span>}
               {rihgtIcon && <span className={cx("right-icon")}>{rihgtIcon}</span>}
            </Comp>
         )}
      </>
   );
}

export default forwardRef(Button);
