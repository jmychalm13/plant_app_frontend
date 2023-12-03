import React from "react";
import { Toast } from "bootstrap";

export function ToastNotification({ message }) {
  const toastRef = React.useRef(null);

  React.useEffect(() => {
    if (toastRef.current) {
      const bsToast = new Toast(toastRef.current);
      bsToast.show();
    }
  }, [message]);

  return (
    <div
      className="toast align-items-center text-white bg-success"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      ref={toastRef}
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
}
