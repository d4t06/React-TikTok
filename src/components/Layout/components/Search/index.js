import {
   faCircleXmark,
   faHeartPulse,
   faMagnifyingGlass,
   faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import Menu from "../Menu";
import { Wrapper as PopperWrapper } from "../Popper";
import AccountItem from "../AccountsItem";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "~/hook";

const cx = classNames.bind(styles);

function Search() {
   const searchRef = useRef();
   const loadingRef = useRef();
   const clearRef = useRef();

   const [searchValue, setSearchValue] = useState("");
   const [searchResult, setSearchResult] = useState([]);
   const [showResult, setShowResult] = useState(true);
   // const [loading, setLoading] = useState(false);

   const debounce = useDebounce(searchValue, 600);

   useEffect(() => {
      // setLoading(true);
      if (!debounce.trim()) {
         setSearchResult("");
         return;
      }

      // setLoading(true);
      clearRef.current.style.display = "none";
      loadingRef.current.style.display = "block";
      loadingRef.current.style.animationPlayState = "running";

      axios(
         `https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(
            debounce
         )}&type=less`
      )
         .then((res) => {
            setSearchResult(res.data.data);
            loadingRef.current.style.display = "none";
            loadingRef.current.style.animationPlayState = "paused";
            clearRef.current.style.display = "block";
         })
         .catch(() => {
            loadingRef.current.style.display = "none";
            loadingRef.current.style.animationPlayState = "paused";
         });
   }, [debounce]);

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

   // console.log("render");
   return (
      <Menu
         content={
            searchResult ? (
               <PopperWrapper>
                  <label className={cx("lable-text")}>Accounts</label>
                  {searchResult.map((data) => (
                     <AccountItem data={data} />
                  ))}
               </PopperWrapper>
            ) : (
               false
            )
         }
         option={{
            visible: showResult && searchValue.length > 0,
            onClickOutside: () => handleHide(),
         }}
      >
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
               <button ref={clearRef} className={cx("clear")} onClick={() => handleClear()}>
                  <FontAwesomeIcon icon={faCircleXmark} />
               </button>
            )}

            {
               <button ref={loadingRef} className={cx("loading")}>
                  <FontAwesomeIcon icon={faSpinner} />
               </button>
            }
            <button className={cx("search-btn")} type="submit">
               <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
         </div>
      </Menu>
   );
}

export default Search;
