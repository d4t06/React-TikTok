import { ThemeContext } from "~/store/ThemeContext";
import { useContext } from "react";

function useTheme() {
   const { darkTheme, setDarkTheme } = useContext(ThemeContext);
   return { darkTheme, setDarkTheme };
}

export default useTheme;
