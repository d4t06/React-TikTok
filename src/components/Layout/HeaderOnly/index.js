import Header from "~/components/Layout/components/Header";

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
