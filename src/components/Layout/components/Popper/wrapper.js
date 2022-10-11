import classNames from "classnames/bind";
import styles from "./Wrapper.module.scss";
import { forwardRef } from "react";

const cx = classNames.bind(styles);

function Wrapper({ className, children }, ref) {
   const classes = cx("wrapper", {
      [className]: className,
   });
   return (
      <ul ref={ref} className={classes}>
         {children}
      </ul>
   );
}

export default forwardRef(Wrapper);
