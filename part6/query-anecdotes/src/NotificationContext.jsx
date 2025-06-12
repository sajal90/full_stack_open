import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return action.payload.content;
    case "REMOVE":
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    "",
  );

  return (
    <NotificationContext.Provider
      value={[notification, notificationDispatch]}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  const dispatch = notificationAndDispatch[1];
  return (payload) => {
    dispatch({ type: "ADD", payload });
    setTimeout(() => {
      dispatch({ type: "REMOVE", payload });
    }, 5000);
  };
};

export default NotificationContext;
