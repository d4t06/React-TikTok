import { createContext, useState } from "react";
import useLocalStorage from "~/hook/useLocalStorage";
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
   const [darkTheme, setDarkTheme] = useLocalStorage("darkTheme", false);

   return (
      <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
         {children}
      </ThemeContext.Provider>
   );
};

export default ThemeProvider;
export { ThemeContext };
