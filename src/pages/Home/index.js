import { useState, useEffect } from "react";
import * as userService from "~/services/userService";

import classNames from "classnames/bind";
import AccountsItem from "~/components/AccountsItem";
import ContentItem from "./ContentItem";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);
function Home() {
   const [content, setContent] = useState([]);

   useEffect((_) => {
      const fecthApi = async () => {
         const result = await userService.getSuggested(1, 1);

         // console.log(result[1]);
         setContent(result);
      };
      fecthApi();
   }, []);
   return <ContentItem data={content} />;
}

export default Home;
