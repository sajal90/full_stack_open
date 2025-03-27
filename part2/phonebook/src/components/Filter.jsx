const Filter = ({ filter, handle }) => {
  return (
    <p>
      filter shown with <input value={filter} onChange={handle} />
    </p>
  );
};

export default Filter;
