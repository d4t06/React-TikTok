import "./Skeleton.scss";

function Skeleton({ className, ...passProp }) {
   const classes = `skeleton ${className} animation-pulse`;

   return <div className={classes}></div>;
}

export default Skeleton;
