import React from "react";

interface PopupAlertProps {
  title: string;
  message: string;
  cancelText?: string;
  customText: string;
  onCancel: () => void;
  onCustomAction: () => void;
}

const PopupAlert: React.FC<PopupAlertProps> = ({
  title,
  message,
  cancelText = "Cancel",
  customText,
  onCancel,
  onCustomAction,
}) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="button-container">
          <button onClick={onCancel} className="cancel-button">
            {cancelText}
          </button>
          <button onClick={onCustomAction} className="custom-button">
            {customText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupAlert;
