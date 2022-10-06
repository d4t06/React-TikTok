import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

function Button({
   to,
   href,
   outline = false,
   primary = false,
   round = false,
   disable = false,
   children,
   small,
   long,
   onClick,
   className,
   leftIcon,
   rihgtIcon,
   text,
   ...passprops
}) {
   let Comp = "button";
   const props = {
      onClick,
      ...passprops,
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
      primary,
      outline,
      small,
      disable,
      round,
      long,
      text,
   });
   if (disable) {
      Object.keys(props).forEach((key) => {
         if (key.startsWith("on") && typeof props[key] === "function") {
            delete props[key];
         }
      });
   }

   return (
      <Comp className={classes} {...props}>
         {leftIcon && <span className={cx("left-icon")}>{leftIcon}</span>}
         {children}
         {rihgtIcon && <span className={cx("right-icon")}>{rihgtIcon}</span>}
      </Comp>
   );
}

export default Button;
