import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { forwardRef } from "react";
import classNames from "classnames/bind";

import Image from "../Image";
import Menu from "../Menu";

import styles from "./AccountItem.module.scss";

const cx = classNames.bind(styles);

function AccountItem({ className, data, imgOnly, tippy, src, end }, ref) {
   let Comp = Link;

   if (tippy) Comp = Menu;

   return (
      <>
         {imgOnly ? (
            <div ref={ref} className={cx("avatar-frame", end ? "end" : "", { [className]: className })}>
               {/* {src.includes('.jpg') && <Image src />} */}
               <Image src={src.includes(".jpg") ? src : require("~/assets/images/avatar.jpg")} />
            </div>
         ) : (
            //account preview

            <Comp ref={ref} to={"/home"} key={data.id} className={cx("account-item")}>
               {/* cách làm anh vuông
               cách 1: div -> img rồi dùng objectfit
               cách 2: div -> div.backgroundimage='' rồi dùng paddingtop 100%
            */}

               <div className={cx("avatar-frame")}>
                  {/* {data && data.avatar => error}
            {data.avatar && data.avatar => ok}
            */}

                  {data.avatar && (
                     <Image
                        src={
                           data.avatar.includes(".jpg") || data.avatar.includes(".jpeg")
                              ? data.avatar
                              : require("~/assets/images/avatar.jpg")
                        }
                     />
                  )}
               </div>
               <div>
                  <h3 className={cx("user-name")}>
                     {/* {console.log(data.full_name)} */}
                     {data.full_name || data.first_name + " " + data.last_name}
                     {data.tick && <FontAwesomeIcon className={cx("check-icon", "img-only")} icon={faCircleCheck} />}
                  </h3>
                  <h4 className={cx("user-desc")}>{data.nickname}</h4>
               </div>
            </Comp>
         )}
      </>
   );
}

export default forwardRef(AccountItem);
