import classNames from "classnames/bind";
import AccountsItem from "~/components/AccountsItem";
import ContentItem from "./ContentItem";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);
function Home() {
   return <ContentItem />;
}

export default Home;
