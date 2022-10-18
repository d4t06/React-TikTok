import TippyHeadless from "@tippyjs/react/headless";
import Tippy from "@tippyjs/react";

function Menu({ option, type, content, children, onHide }) {
   return (
      // using a wrapper <> tag around the reference element solves
      // Tippy waring
      <>
         {type ? (
            <Tippy interactive content={content} {...option}>
               {children}
            </Tippy>
         ) : (
            <TippyHeadless
               {...option}
               interactive
               placement="bottom-end"
               render={(attrs) => (
                  <div tabIndex="-1" {...attrs}>
                     {content}
                  </div>
               )}
               onHide={onHide}
            >
               {children}
            </TippyHeadless>
         )}
      </>
   );
}

export default Menu;
