import classNames from "classnames/bind";
import styles from "./Wrapper.module.scss";

const cx = classNames.bind(styles);

function Wrapper({ className, children }) {
    const classes = cx("wrapper", {
        [className]: className,
    });
    return <div className={classes}>{children}</div>;
}

export default Wrapper;
