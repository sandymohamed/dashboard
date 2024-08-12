import styles from "./success.module.css";
import SuccessIcon from "@/assets/success.svg?react";

const { success } = styles;

const Success = ({text}: {text: string}) => {
  return (
    <div className={success}>
      <SuccessIcon />
      <p>{text}</p>
    </div>
  );
};

export default Success;