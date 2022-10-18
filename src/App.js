import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "~/routes/index";
import DefaultLayout from "~/layouts";

function App() {
   return (
      <Router>
         <div className="App">
            <Routes>
               {publicRoutes.map((route, index) => {
                  // NGU: let Layout chứ không phải const layout
                  let Layout = DefaultLayout;

                  if (route.layout === null) {
                     Layout = Fragment;
                  } else if (route.layout) {
                     Layout = route.layout;
                  }

                  const Page = route.component;
                  return (
                     <Route
                        key={index}
                        path={route.path}
                        element={
                           <Layout>
                              <Page />
                           </Layout>
                        }
                     />
                  );
               })}
            </Routes>
         </div>
      </Router>
   );
}

export default App;
