import { forwardRef } from "react";
const Image = forwardRef(({ src, alt, ...props }, ref) => {
   const fallbackImg = require("~/assets/images/noimage.png");
   //    console.log(fallbackImg);

   // const [fallback, setFallback] = useState(fallbackImg);

   return <img ref={ref} src={src || fallbackImg} {...props} />;
});

export default Image;
