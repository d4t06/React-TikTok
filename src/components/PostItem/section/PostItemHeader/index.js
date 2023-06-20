import { Menu, UserPreview, AccountsItem } from "~/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faMusic } from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button";

import styles from "../../PostItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function PostItemHeader({ data, hasAvatar, comment }) {
  return (
    <>
      <div className={cx("content-header", comment ? "comment" : "")}>
        <div className={cx("container")}>
          <div className="left">
            {hasAvatar && (
              <AccountsItem
                className={cx("avatarframe-main-container",)}
                imgOnly
                end
                src={data.avatar}
              />
            )}
          </div>
          <div className={cx("right")}>
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
            {comment ? (
              <>
                <p className={cx("comment-text")}>
                  Hình như bé kia hỏi thăm má của con mèo{" "}
                </p>
                <div className={cx("comment-cta")}>
                  <span className={cx("comment-time")}>20-6</span>
                  <button className={cx("reply-btn")}>Trả lời</button>
                </div>
              </>
            ) : (
              <p
                className={cx("full-name")}
              >{`${data.first_name} ${data.last_name}`}</p>
            )}
          </div>
        </div>
        {!comment && (
          <Button outline className={cx("follow-btn", "hide-for-small")}>
            Follow
          </Button>
        )}
      </div>
    </>
  );
}

export default PostItemHeader;
