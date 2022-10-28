import { icon } from "@fortawesome/fontawesome-svg-core";
import {
   faEmber,
   faFacebook,
   faFacebookF,
   faPinterestP,
   faTelegram,
   faTwitter,
   faUbuntu,
   faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faClosedCaptioning, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
   faUser,
   faCamera,
   faDollarSign,
   faEarthAsia,
   faGear,
   faKeyboard,
   faQuestion,
   faRightFromBracket,
   faCopy,
   faCodeCommit,
   faCodeBranch,
   faPaperPlane,
   faCode,
   faChevronCircleDown,
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
const SHARE_ITEMS = [
   { icon: <FontAwesomeIcon icon={faCode} />, title: "Embed", name: "embed-icon" },
   { icon: <FontAwesomeIcon icon={faPaperPlane} />, title: "Send to Friend", name: "send-icon" },
   { icon: <FontAwesomeIcon icon={faFacebookF} />, title: "Share to Facebook", name: "facebook-icon" },
   { icon: <FontAwesomeIcon icon={faWhatsapp} />, title: "Share to WhatsApp", name: "whatsapp-icon" },
   { icon: <FontAwesomeIcon icon={faCopy} />, title: "Copy Link", name: "copy-icon" },
];
const SHARE_ITEMS_EXPAND = [
   { icon: <FontAwesomeIcon icon={faTwitter} />, title: "Share to Twitter", name: "twitter-icon" },
   { icon: <FontAwesomeIcon icon={faEnvelope} />, title: "Share to Email", name: "email-icon" },
   { icon: <FontAwesomeIcon icon={faPinterestP} />, title: "Share to Pinterest", name: "pinterest-icon" },
   { icon: <FontAwesomeIcon icon={faTelegram} />, title: "Share to Telegram", name: "telegram-icon" },
];

export { MENU_ITEMS, USER_ITEMS, SHARE_ITEMS, SHARE_ITEMS_EXPAND };
