import { faCircleXmark, faMagnifyingGlass, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Menu from "../Menu";
import { Wrapper as PopperWrapper } from "../Popper";
import AccountItem from "../AccountsItem";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { useRef, useState } from "react";

const cx = classNames.bind(styles);

function Search() {
   const searchRef = useRef();
   const [searchValue, setSearchValue] = useState("");
   const [showResult, setShowResult] = useState(true);

   function submit(e) {
      e.preventDefault();
   }
   function handleClear() {
      setSearchValue("");
      searchRef.current.focus();
   }
   function handleHide() {
      setShowResult(false);
   }
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
         option={{
            visible: showResult && searchValue.length > 3,
            onClickOutside: () => handleHide(),
         }}>
         <div className={cx("search")} onSubmit={submit}>
            <input
               ref={searchRef}
               value={searchValue}
               className={cx("input")}
               placeholder="Search accounts and videos"
               onChange={(e) => setSearchValue(e.target.value)}
               onFocus={() => setShowResult(true)}
            />

            {!!searchValue && (
               <button className={cx("clear")} onClick={() => handleClear()}>
                  <FontAwesomeIcon icon={faCircleXmark} />
               </button>
            )}

            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
            <button className={cx("search-btn")} type="submit">
               <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
         </div>
      </Menu>
   );
}

export default Search;
