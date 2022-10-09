import { faA, faKeyboard, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MENU_ITEMS = [
   {
      icon: <FontAwesomeIcon icon={faA} />,
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
               children: {
                  title: "Language",
                  data: [
                     {
                        code: "en",
                        title: "English1",
                     },
                     {
                        code: "vi",
                        title: "Tiếng Việt1",
                     },
                  ],
               },
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

export default MENU_ITEMS;
