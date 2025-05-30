import { filterChange } from "../reducers/filterReducer.js";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    const val = event.target.value;
    dispatch(filterChange(val));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter
      <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
