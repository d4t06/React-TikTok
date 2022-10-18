import Header from "~/layouts/components/Header";

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
