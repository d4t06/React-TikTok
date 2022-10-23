import styles from "../Sidebar.module.scss";
import stylesFromAccountItem from "~/components/AccountsItem/AccountItem.module.scss";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import AccountItem from "~/components/AccountsItem";
import Menu from "~/components/Menu";
import Image from "~/components/Image";
import Button from "~/components/Button";
import UserPreview from "~/components/UserPreview";

const cx = classNames.bind(styles);
const cx_AccountItem = classNames.bind(stylesFromAccountItem);

function SuggestedUser({ data }) {
   return (
      <>
         {data &&
            data.map((item) => {
               return (
                  <Menu
                     key={item.id}
                     content={<UserPreview data={item} />}
                     option={{
                        placement: "bottom",
                        offset: [-10, 0],
                        delay: [500, 0],
                        hideOnClick: false,
                        appendTo: () => document.body,
                     }}
                  >
                     <AccountItem data={item} />
                  </Menu>
               );
            })}
      </>
   );
}

export default SuggestedUser;
