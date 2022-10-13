import { faCircleXmark, faMagnifyingGlass, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Menu from "../Menu";
import { Wrapper as PopperWrapper } from "../Popper";
import AccountItem from "../AccountsItem";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

function Search() {
   return (
      <Menu
         content={
            <PopperWrapper>
               <AccountItem />
               <label className={cx("lable-text")}>Accounts</label>
               <AccountItem />
               <AccountItem />
               <AccountItem />
               <AccountItem />
            </PopperWrapper>
         }
         option={{ trigger: "click" }}>
         <div className={cx("search")}>
            <input className={cx("input")} placeholder="Search accounts and videos" />
            <button className={cx("clear")}>
               <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
            <div className={cx("search-btn")}>
               <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
         </div>
      </Menu>
   );
}

export default Search;
