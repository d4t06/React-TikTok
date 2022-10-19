import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Button from "../Button";
import Image from "../Image";
import Menu from "../Menu";
// import { Wrapper as PopperWrapper } from "../Popper";
import styles from "./AccountItem.module.scss";

const cx = classNames.bind(styles);
function AccountItem({ data, imgOnly, tippy }) {
   let Comp = Link;

   if (tippy) Comp = Menu;

   return (
      <>
         {imgOnly ? (
            <div className={cx("avatar-frame")}>
               <Image src={require("~/assets/images/avatar.jpg")} />
            </div>
         ) : (
            <Comp
               //account preview
               content={
                  <div className={cx("account-preview")}>
                     <div className={cx("account-preview-header")}>
                        <div className={cx("avatar-frame-preview")}>
                           {data.avatar && data.avatar.includes(".jpg" && ".jpeg") ? (
                              <Image src={data.avatar} />
                           ) : (
                              <Image />
                           )}
                        </div>
                        <Button primary>Follow</Button>
                     </div>
                     <h3 className={cx("user-name", "user-name-preview")}>
                        theanh28entertainment{" "}
                        <FontAwesomeIcon
                           className={cx("check-icon", "img-only")}
                           icon={faCircleCheck}
                        />
                     </h3>
                     <h4 className={cx("user-desc", "user-desc-preview")}>{data.nickname}</h4>{" "}
                     <p className={cx("user-counting")}>
                        <span className={cx("count", "follow-count")}>7.7M</span>
                        <span className={cx("count-desc")}>Follower</span>
                        <span className={cx("count", "like-count")}>537.5M</span>
                        <span className={cx("count-desc")}>Likes</span>
                     </p>
                  </div>
               }
               option={{
                  placement: "bottom",
                  offset: [-15, 0],
                  delay: [500, 0],
                  appendTo: () => document.body,
               }}
            >
               <Link to={"/home"} key={data.id} className={cx("account-item")}>
                  {/* cách làm anh vuông
                  cách 1: div -> img rồi dùng objectfit
                  cách 2: div -> div.backgroundimage='' rồi dùng paddingtop 100%
               */}
                  <div className={cx("avatar-frame")}>
                     {/* {data && data.avatar => error}
                      {data.avatar && data.avatar => ok}
                  */}
                     {data.avatar && data.avatar.includes(".jpg" && ".jpeg") ? (
                        <Image src={data.avatar} />
                     ) : (
                        <Image />
                     )}
                  </div>
                  <div>
                     <h3 className={cx("user-name")}>
                        {/* {console.log(data.full_name)} */}
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
            </Comp>
         )}
      </>
   );
}

export default AccountItem;
