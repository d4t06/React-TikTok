import { forwardRef } from "react";

import classNames from "classnames/bind";

import AccountsItem from "~/components/AccountsItem";
import PostItem from "~/components/PostItem";
import ContentItemSkeleton from "~/components/Skeleton/ContentItemSkeleton";

import styles from "./ContentItem.module.scss";
const cx = classNames.bind(styles);

function ContentItem({ data, skeleton, index }, ref) {
   let body;

   if (skeleton) body = <ContentItemSkeleton />;
   else
      body = (
         <>
            <AccountsItem
               className={cx("avatarframe-main-container")}
               imgOnly
               src={data.avatar}
            />
            <div className={cx("main-container")}>
               <PostItem index={index} data={data} />
            </div>
         </>
      );

   const content = ref ? (
      <div ref={ref} className={cx("item-container", "seperate")}>
         {body}
      </div>
   ) : (
      <div className={cx("item-container", "seperate")}>{body}</div>
   );

   return content;
}

export default forwardRef(ContentItem);
