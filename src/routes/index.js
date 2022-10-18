//import layout
import { HeaderOnly } from "~/layouts";
// import pages
import Home from "~/pages/Home/";
import Following from "~/pages/Following";
import Upload from "~/pages/Upload";
import Search from "~/pages/Search";
import Profile from "~/pages/Profile";
import Live from "~/pages/Live";

import config from "~/config";
// import routes config

const publicRoutes = [
   { path: config.routes.home, component: Home },
   { path: config.routes.following, component: Following },
   { path: config.routes.upload, component: Upload, layout: HeaderOnly },
   { path: config.routes.search, component: Search },
   { path: config.routes.nickname, component: Profile },
   { path: config.routes.live, component: Live },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
