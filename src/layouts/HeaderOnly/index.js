import Header from "~/components/Header";

function HeaderOnly({ children }) {
   return (
      <>
         <Header />
         <div className="Container">
            <div className="Content">{children}</div>
         </div>
      </>
   );
}

export default HeaderOnly;
