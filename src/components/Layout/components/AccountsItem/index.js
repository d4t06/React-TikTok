import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Wrapper as PopperWrapper } from "../Popper";
import styles from "./AccountItem.module.scss";

const cx = classNames.bind(styles);
function AccountItem({ data, imgOnly }) {
   return (
      <>
         {imgOnly ? (
            <Tippy
               visible
               render={(attrs) => (
                  <div tabIndex="-1" {...attrs}>
                     <h4>nguyenhuudat</h4>
                     {/* {renderItem} */}
                  </div>
               )}
            >
               {/* <AccountItem imgOnly /> */}
               <div className={cx("avatar-frame")}>
                  <img src={require("~/assets/images/avatar.jpg")} />
               </div>
            </Tippy>
         ) : (
            <Link to={"/@dauwd"} key={data.id} className={cx("account-item")}>
               {/* cách làm anh vuông
                  cách 1: div -> img rồi dùng objectfit
                  cách 2: div -> div.backgroundimage='' rồi dùng paddingtop 100%
               */}
               <div className={cx("avatar-frame")}>
                  <img src={data.avatar} />
               </div>
               <div>
                  <h3 className={cx("user-name")}>
                     {data.full_name}
                     {data.tick && (
                        <FontAwesomeIcon
                           className={cx("check-icon", "img-only")}
                           icon={faCircleCheck}
                        />
                     )}
                  </h3>
                  <h4 className={cx("user-desc")}>{data.nickname}</h4>
               </div>
            </Link>
         )}
      </>
   );
}

export default AccountItem;
