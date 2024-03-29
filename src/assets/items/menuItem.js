import {
   faFacebookF,
   faPinterestP,
   faTelegram,
   faTwitter,
   faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
   faUser,
   faDollarSign,
   faEarthAsia,
   faGear,
   faKeyboard,
   faQuestion,
   faRightFromBracket,
   faCopy,
   faPaperPlane,
   faCode,
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
               code: "vi",
               title: "Tiếng Diệt",
            },
            {
               code: "en",
               title: "Tiếng Ziệt",
            },
            {
               code: "en",
               title: "Vietnamese",
            },
            {
               code: "vi",
               title: "Tiếng Kinh",
            },
            {
               code: "en",
               title: "Tieng Mẹ Đẻ",
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
      icon: <FontAwesomeIcon icon={faGear} />,
      title: "Dark theme",
      action: "SET_THEME",
      status: JSON.parse(localStorage.getItem("darkTheme")) ? "On" : "Off",
   },
   {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "View profile",
      action: "",
   },
   {
      icon: <FontAwesomeIcon icon={faDollarSign} />,
      title: "Get coins",
      action: "",
   },
   {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: "Settings",
      action: "",
   },
   ...MENU_ITEMS,

   {
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      title: "Log out",
      action: "",
      seperate: true,
   },
];
const SHARE_ITEMS = [
   {
      icon: <FontAwesomeIcon icon={faCode} />,
      title: "Embed",
      name: "embed-icon",
   },
   {
      icon: <FontAwesomeIcon icon={faPaperPlane} />,
      title: "Send to Friend",
      name: "send-icon",
   },
   {
      icon: <FontAwesomeIcon icon={faFacebookF} />,
      title: "Share to Facebook",
      name: "facebook-icon",
   },
   {
      icon: <FontAwesomeIcon icon={faWhatsapp} />,
      title: "Share to WhatsApp",
      name: "whatsapp-icon",
   },
   {
      icon: <FontAwesomeIcon icon={faCopy} />,
      title: "Copy Link",
      name: "copy-icon",
   },
];
const SHARE_ITEMS_EXPAND = [
   {
      icon: <FontAwesomeIcon icon={faTwitter} />,
      title: "Share to Twitter",
      name: "twitter-icon",
   },
   {
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      title: "Share to Email",
      name: "email-icon",
   },
   {
      icon: <FontAwesomeIcon icon={faPinterestP} />,
      title: "Share to Pinterest",
      name: "pinterest-icon",
   },
   {
      icon: <FontAwesomeIcon icon={faTelegram} />,
      title: "Share to Telegram",
      name: "telegram-icon",
   },
];

export { MENU_ITEMS, USER_ITEMS, SHARE_ITEMS, SHARE_ITEMS_EXPAND };
