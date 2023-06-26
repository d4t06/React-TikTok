import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import PostItemHeader from "~/components/PostItem/section/PostItemHeader";
import ShareControl from "~/components/PostItem/section/ShareControl";

import styles from "../VideoPreview.module.scss"
const cx = classNames.bind(styles)

function Text({data}) {
   const videoDesc = (
      <p className={cx("content-desc")}>
         {data.popular_video.description}
         <span>#monquayeuthuong</span>
         <span>#ngaycuame</span>
         <span>#20/10</span>
      </p>
   );

   const musicDesc = (
      <a className={cx("music-info")} href="/home">
         <span>
            <FontAwesomeIcon icon={faMusic} />
         </span>
         Music - Steal My Girls
      </a>
   );


   return (
      <>
         <div className={cx("top")}>
            <PostItemHeader data={data} hasAvatar />
            {videoDesc}
            {musicDesc}

            <ShareControl end />
         </div>

         <div className={cx("bottom")}>
            <PostItemHeader data={data} comment hasAvatar />
            <PostItemHeader data={data} comment hasAvatar />
         </div>
      </>
   );
}

export default Text;
