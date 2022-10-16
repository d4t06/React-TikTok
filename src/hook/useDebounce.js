import { useState, useEffect } from "react";

function useDebounce(value, deplay) {
   const [debounceValue, setDebounceValue] = useState(value);

   useEffect(
      (_) => {
         const handler = setTimeout(() => setDebounceValue(value), deplay);
         return () => clearTimeout(handler);
      },
      [value]
   );

   return debounceValue;
}

export default useDebounce;
