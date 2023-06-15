import { Menu, UserPreview, AccountsItem } from "~/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faMusic } from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button";

import styles from "../../PostItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function PostItemHeader({ data, hasAvatar }) {
  const videoDesc = (
    <p className={cx("content-desc")}>
      {data.popular_video.description}
      <span>#monquayeuthuong</span>
      <span>#ngaycuame</span>
      <span>#20/10</span>
    </p>
  );

  return (
    <>
      <div className={cx("content-header")}>
        <div className={cx("container")}>
          <div className="left">
            {hasAvatar && (
              <AccountsItem
                className={cx("avatarframe-main-container")}
                imgOnly
                src={data.avatar}
              />
            )}
          </div>
          <div className="righ">
            <p className={cx("user-info")}>
              <Menu
                content={
                  <UserPreview
                    data={data}
                    button={{ outline: true }}
                  ></UserPreview>
                }
                option={{
                  placement: "bottom",
                  offset: [60, 45],
                  delay: [500, 0],
                  hideOnClick: false,
                  appendTo: () => document.body,
                }}
              >
                <span className={cx("nick-name")}>
                  {data.nickname}
                  {data.tick && (
                    <span className={cx("check-icon")}>
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </span>
                  )}
                </span>
              </Menu>
              {!hasAvatar && (
                <span
                  className={cx("full-name")}
                >{`${data.first_name} ${data.last_name}`}</span>
              )}
            </p>
            {hasAvatar ? (
              <p
                className={cx("full-name")}
              >{`${data.first_name} ${data.last_name}`}</p>
            ) : (
              videoDesc
            )}

          </div>
        </div>
        <Button outline className={cx("follow-btn", "hide-for-small")}>
          Follow
        </Button>
      </div>
      {hasAvatar && videoDesc}
      <a className={cx("music-info")} href="/home">
        <span>
          <FontAwesomeIcon icon={faMusic} />
        </span>
        Music - Steal My Girls
      </a>
    </>
  );
}

export default PostItemHeader;
