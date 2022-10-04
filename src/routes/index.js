//import layout
import { HeaderOnly } from "~/components/Layout";
// import pages
import Home from "~/pages/Home/";
import Following from "~/pages/Following";
import Upload from "~/pages/Upload";
import Search from "~/pages/Search";

const publicRoutes = [
   { path: "/", component: Home },
   { path: "/Following", component: Following },
   { path: "/Upload", component: Upload, layout: HeaderOnly },
   { path: "/Search", component: Search, layout: null },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
