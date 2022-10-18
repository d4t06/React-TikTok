import {
   faUser,
   faCamera,
   faDollarSign,
   faEarthAsia,
   faGear,
   faKeyboard,
   faQuestion,
   faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MENU_ITEMS = [
   {
      icon: <FontAwesomeIcon icon={faEarthAsia} />,
      title: "English",
      children: {
         title: "Language",
         data: [
            {
               code: "en",
               title: "English",
            },
            {
               code: "vi",
               title: "Tiếng Việt",
            },
            {
               code: "en",
               title: "English",
            },
            {
               code: "vi",
               title: "Tiếng Việt",
            },
            {
               code: "en",
               title: "English",
            },
            {
               code: "vi",
               title: "Tiếng Việt",
            },
            {
               code: "en",
               title: "English",
            },
            {
               code: "vi",
               title: "Tiếng Việt",
            },
            {
               code: "en",
               title: "English",
            },
            {
               code: "vi",
               title: "Tiếng Việt",
            },
            {
               code: "en",
               title: "English",
            },
            {
               code: "vi",
               title: "Tiếng Việt",
            },
         ],
      },
   },
   {
      icon: <FontAwesomeIcon icon={faQuestion} />,
      title: "Feeback and help",
      to: "/feeback",
   },
   {
      icon: <FontAwesomeIcon icon={faKeyboard} />,
      title: "Keyboard shortcuts",
   },
];

const USER_ITEMS = [
   {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "View profile",
   },
   {
      icon: <FontAwesomeIcon icon={faDollarSign} />,
      title: "Get coins",
   },
   {
      icon: <FontAwesomeIcon icon={faCamera} />,
      title: "LIVE studio",
   },
   {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: "Settings",
   },
   ...MENU_ITEMS,
   {
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      title: "Log out",
      seperate: true,
   },
];
export { MENU_ITEMS, USER_ITEMS };
