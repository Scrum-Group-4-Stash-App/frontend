import "./SuccessAlert.css";
import type { SuccessAlertProps } from "./SuccessAlert.types";

const SuccessAlert = ({ message }: SuccessAlertProps) => {
  return (
    <div className="success-alert">
      <p>{message}</p>
    </div>
  );
};

export default SuccessAlert;
