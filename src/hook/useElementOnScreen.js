import { useEffect, useMemo, useRef, useState } from "react";
const useElementOnScreen = (options) => {
   const targetRef = useRef(null);
   const [isVisibile, setIsVisible] = useState();
   const callbackFunction = (entries) => {
      const [entry] = entries; //const entry = entries[0]
      setIsVisible(entry.isIntersecting);
   };
   const optionsMemo = useMemo(() => {
      return options;
   }, [options]);

   useEffect(() => {
      const observer = new IntersectionObserver(callbackFunction, optionsMemo);
      const currentTarget = targetRef.current;
      if (currentTarget) observer.observe(currentTarget);

      return () => {
         if (currentTarget) observer.unobserve(currentTarget);
      };
   }, [targetRef, optionsMemo]);

   return isVisibile;
};
export default useElementOnScreen;
