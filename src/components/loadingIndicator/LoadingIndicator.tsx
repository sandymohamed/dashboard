import styles from "./loadingIndicator.module.css";

const { rings } = styles;

const LoadingIndicator = () => {
  return (
    <div className={rings}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingIndicator;
