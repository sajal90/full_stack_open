import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification;
  });

  const style = {
    color: "green",
    backgroundColor: "lightgrey",
    fontSize: 20,
    padding: 10,
    borderStyle: "solid",
    borderRadius: 5,
    marginBottom: 10,
  };

  if (notification === "") {
    return;
  }
  return (
    <div style={style}>
      {notification}
    </div>
  );
};

export default Notification;
