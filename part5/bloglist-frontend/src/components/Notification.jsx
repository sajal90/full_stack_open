const Notification = (props) => {
  if (props.message === "") {
    return;
  }
  const style = {
    color: "green",
    backgroundColor: "lightgrey",
    fontSize: 20,
    padding: 10,
    borderStyle: "solid",
    borderRadius: 5,
    marginBottom: 10,
  };
  if (props.isError) {
    style.color = "red";
  }
  return (
    <div>
      <p style={style}>
        {props.message}
      </p>
    </div>
  );
};

export default Notification;
