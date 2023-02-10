import React, { createContext, useState } from "react";
import {
  BsExclamationTriangle,
  BsXCircle,
  BsCheckCircle,
} from "react-icons/bs";

export const NotificationContext = createContext();

let timeoutId;

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState("");
  const [classes, setClasses] = useState({
    class: "",
    icon: "",
  });

  const updateNotification = (type, value) => {
    if (timeoutId) clearTimeout(timeoutId);
    switch (type) {
      case "success":
        setClasses({ class: "bg-green-500", icon: BsCheckCircle });
        break;
      case "error":
        setClasses({ class: "bg-red-500", icon: BsXCircle });
        break;
      case "warning":
        setClasses({
          class: "bg-orange-500",
          icon: BsExclamationTriangle,
        });
        break;
      default:
        setClasses({ class: "bg-red-500", icon: BsXCircle });
    }
    setNotification(value);
    timeoutId = setTimeout(() => {
      setNotification("");
    }, 3000);
  };
  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {notification && (
        <div
          className={` z-[100] fixed left-1/2 -translate-x-1/2 top-20  flex items-center rounded-md text-white font-regular px-4 py-3 drop-shadow ${classes.class} transition-transform duration-300 ease-in-out w-fit`}
          role="alert"
        >
          <div className="flex ">
            <div className="py-1">
              <classes.icon size={20} className="mr-4 text-white" />
            </div>
            <div className="pt-0.5">{notification}</div>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
