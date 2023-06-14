import "./Modal.scss";
import ReactDom from "react-dom";

function Modal({ children, setIsOpenModal }) {
   return ReactDom.createPortal(
      <>
         <div className="modal">
            <div
               className="overlay"
               onClick={() => setIsOpenModal(false)}
            ></div>
            <div className="body">{children}</div>
         </div>
      </>,
      document.getElementById("portal")
   );
}

export default Modal;
