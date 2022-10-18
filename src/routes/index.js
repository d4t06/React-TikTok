//import layout
import { HeaderOnly } from "~/components/Layout";
// import pages
import Home from "~/pages/Home/";
import Following from "~/pages/Following";
import Upload from "~/pages/Upload";
import Search from "~/pages/Search";
import Profile from "~/pages/Profile";
// import routes config
import routesConfig from "~/ocnfig/routes";

const publicRoutes = [
   { path: routesConfig.home, component: Home },
   { path: routesConfig.following, component: Following,layout: null },
   { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
   { path: routesConfig.search, component: Search, layout: null },
   { path: routesConfig.nickname, component: Profile, layout: HeaderOnly },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
